### 1. Project Overview
- **Vision**: [I want to make a widget that can be implemented into any website with a single script tag. This widget will be an AI Chatbot that uses API calls to our backend to perform summaries of websites, TTS, and other cool features. I want to design the AI Chatbot in a very specific fashion which I will tell you when making this project.]
- **Key Architecture**: [Modern framework to make the widget UI, and API calls on the backend for the functionality.]

### 2. Project Structure
- I want you to come up with a good modularized file system for this project.

### 3. Coding Standards and AI Instructions
##### General Instructions:
- Your most important job is to manage your own context. Always read any relevant files BEFORE planning changes.
- When updating documentation, keep updates concise and on point to prevent bloat.- Write code following KISS (Keep It Simple, Stupid), YAGNI (You Ain't Gonna Need It), and DRY (Don't Repeat Yourself) principles.
- When in doubt, follow proven best practices for implementation.
- CRITICAL: Do not commit to git without user approval.
- CRITICAL: Do not run any servers, rather tell the user to run servers for testing.
- Always consider industry standard libraries/frameworks first over custom implementations.
- Never mock anything. Never use placeholders. Never omit code.
- Apply SOLID principles where relevant. Use modern framework features rather than reinventing solutions.
- Be brutally honest about whether an idea is good or bad. It is better for you to do the right thing than to have confirmation bias.
- Make side effects explicit and minimal.
- Design database schema to be evolution-friendly (avoid breaking changes).
##### File Organization and Modularity:
- Default to creating multiple small, focused files rather than large monolithic ones.
- Each file should have a single responsibility and clear purpose.
- Split larger files by extracting utilities, constants, types, or logical components into separate modules.
- Separate concerns: utilities, constants, types, components, and business logic into different files
- Follow existing project structure and conventions - place files in appropriate directories. Create new directories and move files if deemed appropriate.
- Use well defined sub-directories to keep things organized and scalable.
- Structure projects with clear folder hierarchies and consistent naming conventions.
- Import/export properly - design for reusability and maintainability.
##### Naming Conventions:
- **Classes**: PascalCase (e.g., `VoicePipeline`)
- **Functions/Methods**: snake_case (e.g., `process_audio`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_AUDIO_SIZE`)
- **Private methods**: Leading underscore (e.g., `_validate_input`)
- **Pydantic Models**: PascalCase with `Schema` suffix (e.g., `ChatRequestSchema`, `UserSchema`)
##### Documentation Requirements:
- Every module needs a docstring.
- Every public function needs a docstring.
- Use Google-style docstrings.
- Include type information in docstrings.
##### CRITICAL: Security Implementations:
- Never trust external inputs - validate everything at the boundaries.
- Keep secrets in environment variables, never in code.
- Log security events (login attempts, auth failures, rate limits, permission denials) but never log sensitive data (audio, conversation content, tokens, personal info).
- Authenticate users at the API gateway level - never trust client-side tokens.
- Use Row Level Security (RLS) to enforce data isolation between users.
- Design auth to work across all client types consistently.
- Use secure authentication patterns for your platform.
- Validate all authentication tokens server-side before creating sessions.
- Sanitize all user inputs before storing or processing.
##### Error Handing:
- Use specific exceptions over generic ones.
- Always log errors with context.
- Provide helpful error messages.
- CRITICAL: Fail securely - errors shouldn't reveal system internals.
- Configure proper debugging for all edge cases and error handles.
##### Observable Systems and Logging Standards:
- Every request needs a correlation ID for debugging.
- Make structure logs for machines, not humans - use JSON format with consistent fields (timestamp, level, correlation_id, event, context) for automated analysis.
- Make debugging possible across service boundaries.
##### API Design Principles:
- RESTful design with consistent URL patterns.
- Use HTTP status codes correctly.
- Version APIs from day one (/v1/, /v2/).
- Support pagination for list endpoints.
- Use consistent JSON response format:
	- Success: `{ "data": {...}, "error": null }`
	- Error: `{ "data": null, "error": {"message": "...", "code": "..."} }`

### 4. MCP Server Integrations:
##### Context7 Documentation Server:
**When to use**:
- Working with external libraries/frameworks (React, FastAPI, Next.js, etc.).
- Need current documentation beyond training cutoff.
- Implementing new integrations or features with third-party tools.
- Troubleshooting library-specific issues.

**Usage patterns:**

```python
# Resolve library name to Context7 ID
mcp__context7__resolve_library_id(libraryName="react")

# Fetch focused documentation
mcp__context7__get_library_docs(
    context7CompatibleLibraryID="/facebook/react",
    topic="hooks",
    tokens=8000
)
```

**Key capabilities:**
- Up-to-date library documentation access.
- Topic-focused documentation retrieval.
- Support for specific library versions.
- Integration with current development practices.

### 5. Type Safety and Quality Checks:
- Run appropriate linting/type checking tools.
- Ensure all type checks pass before considering the task complete.
- If type errors are found, fix them before marking the task as done.
