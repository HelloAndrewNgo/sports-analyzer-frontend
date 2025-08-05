import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);

  // Debug logging
  console.log('VideoPlayer received URL:', videoUrl);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(e.target.value));
    }
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration) => {
    console.log('Video duration set:', duration);
    setDuration(duration);
  };

  const handleError = (error) => {
    console.error('Video player error:', error);
    setError(error);
  };

  const handleReady = () => {
    console.log('Video player ready');
    setError(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const playerElement = playerRef.current.getInternalPlayer();
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (playerElement.webkitRequestFullscreen) {
        playerElement.webkitRequestFullscreen();
      } else if (playerElement.msRequestFullscreen) {
        playerElement.msRequestFullscreen();
      }
      
      // Add fullscreen change listener
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    }
  };

  return (
    <div className={`relative group ${isFullscreen ? 'fullscreen-video' : ''}`}>
      <div className="relative bg-black rounded-lg overflow-hidden">
        {/* Hide any browser UI elements that might appear at the top */}
        <style jsx>{`
          .video-container {
            position: relative;
            overflow: hidden;
          }
          .video-container video {
            /* Ensure video fills container without any browser UI */
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          /* Hide any elements that might appear at the top */
          .video-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: transparent;
            z-index: 1000;
            pointer-events: none;
          }
          /* Override any browser video player UI */
          .video-container video::-webkit-media-controls {
            display: none !important;
          }
          .video-container video::-webkit-media-controls-enclosure {
            display: none !important;
          }
          .video-container video::-webkit-media-controls-panel {
            display: none !important;
          }
        `}</style>
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
            <div className="text-center p-4">
              <p className="text-red-400 font-semibold">Video Error</p>
              <p className="text-red-300 text-sm">{error.toString()}</p>
            </div>
          </div>
        )}
        
        <div className="video-container">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onError={handleError}
            onReady={handleReady}
            width="100%"
            height="auto"
            style={{ aspectRatio: '16/9' }}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload nofullscreen noremoteplayback',
                  disablePictureInPicture: true,
                  disableRemotePlayback: true,
                }
              }
            }}
          />
        </div>
        
        {/* Custom Controls Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeek}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {/* Time Display */}
              <span className="text-white text-sm">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMute}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-primary-400 transition-colors"
                title="Enter fullscreen mode to avoid browser UI overlays"
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen hint */}
      {!isFullscreen && (
        <div className="mt-2 text-center">
          <p className="text-xs text-dark-400">
            💡 Tip: Use fullscreen mode to avoid browser UI overlays
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 