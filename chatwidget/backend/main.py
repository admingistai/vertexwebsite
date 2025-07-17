"""
FastAPI backend for ChatGPT Widget.
Proxies requests to OpenAI API while keeping the API key secure.
"""

import os
import logging
import time
import uuid
from typing import Optional, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from openai import OpenAI
from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure enhanced logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('widget_backend.log')
    ]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="ChatGPT Widget API", version="1.0.0")

# Configure CORS for widget access from any domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin for widget embedding
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests with timing and error handling."""
    request_id = str(uuid.uuid4())[:8]
    start_time = time.time()
    
    # Log incoming request
    logger.info(f"[{request_id}] {request.method} {request.url.path} - Request started")
    
    try:
        # Process request
        response = await call_next(request)
        
        # Calculate processing time
        process_time = time.time() - start_time
        
        # Log successful response
        logger.info(f"[{request_id}] {request.method} {request.url.path} - "
                   f"Status: {response.status_code} - Time: {process_time:.3f}s")
        
        return response
        
    except Exception as e:
        # Calculate processing time for failed requests
        process_time = time.time() - start_time
        
        # Log error
        logger.error(f"[{request_id}] {request.method} {request.url.path} - "
                    f"Error: {str(e)} - Time: {process_time:.3f}s")
        
        # Re-raise the exception
        raise

# Initialize OpenAI client
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY not found in environment variables")
    raise ValueError("OPENAI_API_KEY must be set")

# Initialize ElevenLabs client
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
if not ELEVENLABS_API_KEY:
    logger.error("ELEVENLABS_API_KEY not found in environment variables")
    raise ValueError("ELEVENLABS_API_KEY must be set")

openai_client = OpenAI(api_key=OPENAI_API_KEY)
elevenlabs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

# Helper function for OpenAI error handling
def handle_openai_error(e: Exception, endpoint: str, request_id: str = None) -> HTTPException:
    """Handle OpenAI API errors with detailed logging and appropriate HTTP responses."""
    error_str = str(e).lower()
    request_prefix = f"[{request_id}] " if request_id else ""
    
    logger.error(f"{request_prefix}OpenAI API error in {endpoint}: {str(e)}")
    
    if "api_key" in error_str or "authentication" in error_str:
        logger.error(f"{request_prefix}Authentication error - check API key configuration")
        return HTTPException(
            status_code=500,
            detail={
                "error": {
                    "message": "API configuration error",
                    "code": "AUTH_ERROR"
                }
            }
        )
    elif "rate" in error_str or "quota" in error_str:
        logger.warning(f"{request_prefix}Rate limit exceeded in {endpoint}")
        return HTTPException(
            status_code=429,
            detail={
                "error": {
                    "message": "Rate limit exceeded. Please try again later.",
                    "code": "RATE_LIMIT_ERROR"
                }
            }
        )
    elif "model" in error_str:
        logger.error(f"{request_prefix}Invalid model specified in {endpoint}")
        return HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Invalid model specified",
                    "code": "MODEL_ERROR"
                }
            }
        )
    elif "maximum context length" in error_str or "token" in error_str:
        logger.warning(f"{request_prefix}Token limit exceeded in {endpoint}")
        return HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content too long. Please try with shorter text.",
                    "code": "TOKEN_LIMIT_ERROR"
                }
            }
        )
    else:
        logger.error(f"{request_prefix}Unexpected OpenAI error in {endpoint}: {str(e)}")
        return HTTPException(
            status_code=500,
            detail={
                "error": {
                    "message": f"Failed to process {endpoint.replace('_', ' ')} request",
                    "code": f"{endpoint.upper()}_ERROR"
                }
            }
        )

# Request/Response models
class ChatRequest(BaseModel):
    """Chat request model."""
    message: str = Field(..., min_length=1, max_length=4000)
    context: Optional[str] = Field(None, max_length=4000)
    model: str = Field(default="gpt-3.5-turbo")

class ListenRequest(BaseModel):
    """Listen (TTS) request model."""
    message: str = Field(..., min_length=1, max_length=4000)
    voice_id: str = Field(default="JBFqnCBsd6RMkjVDRZzb")  # Default voice
    model_id: str = Field(default="eleven_multilingual_v2")

class ChatResponse(BaseModel):
    """Chat response model."""
    data: Optional[Dict[str, Any]] = None
    error: Optional[Dict[str, str]] = None

class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    logger.info("Health check requested")
    
    try:
        # Test OpenAI client configuration
        if not OPENAI_API_KEY:
            logger.error("Health check failed - OpenAI API key not configured")
            return HealthResponse(status="unhealthy", version="1.0.0")
        
        # Test ElevenLabs client configuration
        if not ELEVENLABS_API_KEY:
            logger.error("Health check failed - ElevenLabs API key not configured")
            return HealthResponse(status="unhealthy", version="1.0.0")
        
        logger.info("Health check passed - all systems operational")
        return HealthResponse(status="healthy", version="1.0.0")
        
    except Exception as e:
        logger.error(f"Health check failed with exception: {str(e)}")
        return HealthResponse(status="unhealthy", version="1.0.0")

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat requests and proxy to OpenAI API.
    
    Args:
        request: ChatRequest containing the message and optional context
    
    Returns:
        ChatResponse with the AI response or error
    """
    start_time = time.time()
    
    # Validation logging
    logger.info(f"Chat request - Model: {request.model}, Message length: {len(request.message)} chars, "
               f"Has context: {bool(request.context)}")
    
    # Validate request
    if not request.message.strip():
        logger.warning("Chat request rejected - empty message")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Message cannot be empty",
                    "code": "VALIDATION_ERROR"
                }
            }
        )
    
    try:
        # Prepare messages for OpenAI
        messages = []
        
        # Add context if provided
        if request.context:
            messages.append({
                "role": "system",
                "content": f"Context: {request.context}"
            })
            logger.debug(f"Context added - length: {len(request.context)} chars")
        
        # Add user message
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        logger.info(f"Sending request to OpenAI - Model: {request.model}, Messages: {len(messages)}")
        
        # Call OpenAI API
        response = openai_client.chat.completions.create(
            model=request.model,
            messages=messages,
            max_tokens=1000,
            temperature=0.7
        )
        
        # Extract response
        ai_message = response.choices[0].message.content
        processing_time = time.time() - start_time
        
        logger.info(f"Chat request successful - Processing time: {processing_time:.3f}s, "
                   f"Tokens used: {response.usage.total_tokens}, "
                   f"Response length: {len(ai_message)} chars")
        
        return ChatResponse(
            data={
                "message": ai_message,
                "model": request.model,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }
        )
        
    except Exception as e:
        processing_time = time.time() - start_time
        logger.error(f"Chat request failed after {processing_time:.3f}s: {str(e)}")
        raise handle_openai_error(e, "chat")

@app.post("/api/summarize", response_model=ChatResponse)
async def summarize(request: ChatRequest):
    """
    Summarize the provided text.
    
    Args:
        request: ChatRequest containing the text to summarize
    
    Returns:
        ChatResponse with the summary or error
    """
    start_time = time.time()
    
    # Validation logging
    logger.info(f"Summarize request - Model: {request.model}, Content length: {len(request.message)} chars")
    
    # Validate request
    if not request.message.strip():
        logger.warning("Summarize request rejected - empty content")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content to summarize cannot be empty",
                    "code": "VALIDATION_ERROR"
                }
            }
        )
    
    if len(request.message) < 50:
        logger.warning(f"Summarize request - content too short: {len(request.message)} chars")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content too short to summarize effectively",
                    "code": "CONTENT_TOO_SHORT"
                }
            }
        )
    
    try:
        # Prepare summarization prompt
        prompt = f"""Please summarize the following text in exactly 3 bullet points. Each bullet point should be concise and capture a key aspect of the content. Format your response as:
• First key point
• Second key point  
• Third key point

Text to summarize:
{request.message}"""
        
        logger.info(f"Sending summarization request to OpenAI - Model: {request.model}")
        
        # Call OpenAI API
        response = openai_client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides clear, concise summaries in exactly 3 bullet points. Focus on the most important information."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        summary = response.choices[0].message.content
        processing_time = time.time() - start_time
        
        # Validate bullet points in response
        bullet_count = summary.count('•')
        logger.info(f"Summarize request successful - Processing time: {processing_time:.3f}s, "
                   f"Tokens used: {response.usage.total_tokens}, "
                   f"Bullet points found: {bullet_count}")
        
        if bullet_count != 3:
            logger.warning(f"Summary doesn't contain exactly 3 bullet points, found: {bullet_count}")
        
        return ChatResponse(
            data={
                "message": summary,
                "type": "summary"
            }
        )
        
    except Exception as e:
        processing_time = time.time() - start_time
        logger.error(f"Summarize request failed after {processing_time:.3f}s: {str(e)}")
        raise handle_openai_error(e, "summarize")

@app.post("/api/details", response_model=ChatResponse)
async def analyze_details(request: ChatRequest):
    """
    Provide a detailed analysis of the provided text.
    
    Args:
        request: ChatRequest containing the text to analyze
    
    Returns:
        ChatResponse with the detailed analysis or error
    """
    start_time = time.time()
    
    # Validation logging
    logger.info(f"Details request - Model: {request.model}, Content length: {len(request.message)} chars")
    
    # Validate request
    if not request.message.strip():
        logger.warning("Details request rejected - empty content")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content to analyze cannot be empty",
                    "code": "VALIDATION_ERROR"
                }
            }
        )
    
    if len(request.message) < 100:
        logger.warning(f"Details request - content too short for analysis: {len(request.message)} chars")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content too short for detailed analysis",
                    "code": "CONTENT_TOO_SHORT"
                }
            }
        )
    
    try:
        # Prepare detailed analysis prompt
        prompt = f"""Please provide a comprehensive analysis of the following text. Structure your analysis with these sections:

📋 **Overview**
Brief summary of what this content is about.

🎯 **Key Themes & Concepts**
Identify and explain the main themes and important concepts.

💡 **Main Arguments**
List the primary arguments or points being made.

📊 **Supporting Evidence**
Note any data, examples, or evidence used to support the arguments.

✍️ **Style & Tone**
Describe the writing style, tone, and approach.

👥 **Target Audience**
Who is this content intended for?

🔍 **Critical Analysis**
Provide insights about strengths, weaknesses, or notable aspects.

🎓 **Implications & Takeaways**
What are the key takeaways or implications of this content?

Text to analyze:
{request.message}"""
        
        logger.info(f"Sending detailed analysis request to OpenAI - Model: {request.model}")
        
        # Call OpenAI API with higher token limit for detailed response
        response = openai_client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "system", "content": "You are an expert analyst who provides thorough, insightful analyses of texts. Focus on being comprehensive yet clear and well-organized."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.4
        )
        
        analysis = response.choices[0].message.content
        processing_time = time.time() - start_time
        
        # Validate analysis sections
        section_count = analysis.count('**')
        logger.info(f"Details request successful - Processing time: {processing_time:.3f}s, "
                   f"Tokens used: {response.usage.total_tokens}, "
                   f"Analysis sections found: {section_count//2}, "
                   f"Response length: {len(analysis)} chars")
        
        if section_count < 16:  # 8 sections × 2 (opening and closing **)
            logger.warning(f"Analysis may be incomplete, expected 8 sections but found {section_count//2}")
        
        return ChatResponse(
            data={
                "message": analysis,
                "type": "detailed_analysis"
            }
        )
        
    except Exception as e:
        processing_time = time.time() - start_time
        logger.error(f"Details request failed after {processing_time:.3f}s: {str(e)}")
        raise handle_openai_error(e, "details")

@app.post("/api/listen")
async def listen(request: ListenRequest):
    """
    Generate audio from text using text-to-speech.
    
    Flow:
    1. Generate a 3-bullet summary of the provided text
    2. Convert the summary to audio using ElevenLabs TTS
    3. Stream the audio back to the client
    
    Args:
        request: ListenRequest containing the text to convert to audio
        
    Returns:
        StreamingResponse with audio/mpeg content
    """
    start_time = time.time()
    
    # Validation logging
    logger.info(f"Listen request - Content length: {len(request.message)} chars, "
               f"Voice: {request.voice_id}, Model: {request.model_id}")
    
    # Validate request
    if not request.message.strip():
        logger.warning("Listen request rejected - empty content")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content for audio generation cannot be empty",
                    "code": "VALIDATION_ERROR"
                }
            }
        )
    
    if len(request.message) < 50:
        logger.warning(f"Listen request - content too short: {len(request.message)} chars")
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "message": "Content too short for audio generation",
                    "code": "CONTENT_TOO_SHORT"
                }
            }
        )
    
    try:
        # Step 1: Generate summary using the same logic as summarize endpoint
        summary_prompt = f"""Please summarize the following text in exactly 3 bullet points. Each bullet point should be concise and capture a key aspect of the content. Format your response as:
• First key point
• Second key point  
• Third key point

Text to summarize:
{request.message}"""
        
        logger.info(f"Generating summary for TTS - OpenAI model: gpt-3.5-turbo")
        
        # Call OpenAI API for summary
        summary_response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides clear, concise summaries in exactly 3 bullet points. Focus on the most important information."},
                {"role": "user", "content": summary_prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        summary_text = summary_response.choices[0].message.content
        summary_processing_time = time.time() - start_time
        
        logger.info(f"Summary generated - Processing time: {summary_processing_time:.3f}s, "
                   f"Tokens used: {summary_response.usage.total_tokens}, "
                   f"Summary length: {len(summary_text)} chars")
        
        # Step 2: Convert summary to audio using ElevenLabs
        logger.info(f"Converting summary to audio - ElevenLabs voice: {request.voice_id}")
        
        # Generate audio stream
        def generate_audio():
            try:
                audio_stream = elevenlabs_client.text_to_speech.convert_as_stream(
                    text=summary_text,
                    voice_id=request.voice_id,
                    model_id=request.model_id,
                    output_format="mp3_44100_128"
                )
                
                for chunk in audio_stream:
                    if isinstance(chunk, bytes):
                        yield chunk
                        
            except Exception as e:
                logger.error(f"Error during audio streaming: {str(e)}")
                raise
        
        total_processing_time = time.time() - start_time
        logger.info(f"Listen request successful - Total processing time: {total_processing_time:.3f}s")
        
        # Step 3: Stream audio response
        return StreamingResponse(
            generate_audio(),
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=summary_audio.mp3",
                "Cache-Control": "no-cache"
            }
        )
        
    except Exception as e:
        processing_time = time.time() - start_time
        logger.error(f"Listen request failed after {processing_time:.3f}s: {str(e)}")
        
        # Handle different types of errors
        error_str = str(e).lower()
        
        if "elevenlabs" in error_str or "voice" in error_str:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": {
                        "message": "Audio generation service unavailable",
                        "code": "TTS_ERROR"
                    }
                }
            )
        elif "openai" in error_str:
            raise handle_openai_error(e, "listen")
        else:
            raise HTTPException(
                status_code=500,
                detail={
                    "error": {
                        "message": "Failed to generate audio",
                        "code": "LISTEN_ERROR"
                    }
                }
            )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)