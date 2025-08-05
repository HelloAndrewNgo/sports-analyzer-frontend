import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const VideoUpload = ({ 
  onVideoUploaded, 
  onProcessingStart, 
  onProcessingComplete, 
  onProcessingError,
  isProcessing 
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [fps, setFps] = useState(1);
  const [testMode, setTestMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const videoUrl = URL.createObjectURL(file);
      onVideoUploaded(videoUrl);
    }
  }, [onVideoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    },
    multiple: false
  });

  const handleProcessVideo = async () => {
    if (!selectedFile) return;

    try {
      onProcessingStart();
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('prompt', prompt || 'Analyze this sports video and provide detailed feedback on performance, technique, and areas for improvement.');
      formData.append('fps', fps.toString());
      formData.append('testMode', testMode.toString());

      const response = await axios.post('http://localhost:3001/api/analyze-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      onProcessingComplete(response.data);
    } catch (error) {
      console.error('Error processing video:', error);
      onProcessingError(error.response?.data?.error || error.message || 'Failed to process video');
    }
  };

  const defaultPrompt = `This is me playing basketball slowed down.
Tell me how many shots I made tell me how many lay ups I made tell me how many three-pointers I made
tell me how many shots I missed and tell me from where I made shots as well and tell me the steps on
which made the shot and missed the shot
On every shot. Give me feedback like you're Michael Jordan.
go at 1 fps`;

  return (
    <div className="bg-dark-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-primary-300 flex items-center">
        <Video className="mr-2" size={24} />
        Upload Video
      </h3>

      {/* Drop Zone */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary-400 bg-primary-900/20' 
            : 'border-dark-600 hover:border-primary-400'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-dark-400" size={48} />
        {isDragActive ? (
          <p className="text-primary-400">Drop the video here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">Drag & drop a video file here</p>
            <p className="text-dark-400">or click to select</p>
            <p className="text-sm text-dark-500 mt-2">
              Supports: MP4, AVI, MOV, MKV, WebM
            </p>
          </div>
        )}
      </motion.div>

      {/* Selected File */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-dark-700 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Video className="mr-2 text-primary-400" size={20} />
              <span className="text-sm">{selectedFile.name}</span>
            </div>
            <span className="text-xs text-dark-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </motion.div>
      )}

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Analysis Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={defaultPrompt}
            className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:border-primary-400 focus:outline-none resize-none"
            rows={6}
          />
          <button
            onClick={() => setPrompt(defaultPrompt)}
            className="text-xs text-primary-400 hover:text-primary-300 mt-1"
          >
            Use example prompt
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Frames per Second (FPS)
          </label>
          <input
            type="number"
            min="0.1"
            max="10"
            step="0.1"
            value={fps}
            onChange={(e) => setFps(parseFloat(e.target.value))}
            className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-primary-400 focus:outline-none"
          />
          <p className="text-xs text-dark-400 mt-1">
            Lower FPS = faster processing, less detailed analysis
          </p>
        </div>

        {/* Test Mode Toggle */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-400 focus:ring-2"
            />
            <span className="text-sm font-medium text-dark-300">
              Test Mode (No AI Analysis)
            </span>
          </label>
          <p className="text-xs text-dark-400 mt-1">
            Process video without AI analysis to test clean video output
          </p>
        </div>

        {/* Process Button */}
        <motion.button
          onClick={handleProcessVideo}
          disabled={!selectedFile || isProcessing}
          className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
            !selectedFile || isProcessing
              ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
          whileHover={!selectedFile || isProcessing ? {} : { scale: 1.02 }}
          whileTap={!selectedFile || isProcessing ? {} : { scale: 0.98 }}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span>Analyze Video</span>
            </>
          )}
        </motion.button>

        {/* Progress Bar */}
        {isProcessing && uploadProgress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-dark-400 mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-primary-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VideoUpload; 