import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  theme: 'light' | 'dark';
  onError?: (error: string) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioUrl, 
  theme, 
  onError 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Initialize audio when URL changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      const audio = audioRef.current;
      
      // Reset state
      setIsLoading(true);
      setError(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      
      // Set up event listeners
      const handleLoadedData = () => {
        setIsLoading(false);
        setDuration(audio.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      
      const handleError = (_e: Event) => {
        setIsLoading(false);
        const errorMessage = 'Failed to load audio';
        setError(errorMessage);
        onError?.(errorMessage);
      };
      
      const handleCanPlay = () => {
        setIsLoading(false);
      };
      
      // Add event listeners
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('canplay', handleCanPlay);
      
      // Load the audio
      audio.src = audioUrl;
      audio.load();
      
      // Cleanup
      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [audioUrl, onError]);

  const togglePlayPause = async () => {
    if (!audioRef.current || isLoading) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      const errorMessage = 'Failed to play audio';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current || isLoading) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <div className={`audio-player error ${theme}`}>
        <div className="audio-error">
          <div className="error-icon"></div>
          <span className="error-message">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`audio-player ${theme}`}>
      <audio ref={audioRef} preload="auto" />
      
      <div className="audio-controls">
        {/* Play/Pause Button */}
        <button 
          className="play-pause-btn"
          onClick={togglePlayPause}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : isPlaying ? (
            <div className="pause-icon"></div>
          ) : (
            <div className="play-icon"></div>
          )}
        </button>

        {/* Progress Bar */}
        <div className="progress-container">
          <div 
            ref={progressRef}
            className="progress-bar"
            onClick={handleProgressClick}
          >
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span className="total-time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="volume-container">
          <div className="volume-icon"></div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;