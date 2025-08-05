import React, { useState } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoPlayer from './components/VideoPlayer';
import AnalysisResults from './components/AnalysisResults';
import { motion } from 'framer-motion';

function App() {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleVideoProcessed = (result) => {
    setProcessedVideo(result.processedVideo);
    setAnalysis(result.analysis);
    setIsProcessing(false);
    setError(null);
  };

  const handleProcessingError = (error) => {
    setError(error);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary-400 mb-2">
            Sport Analyzer
          </h1>
          <p className="text-dark-300 text-lg">
            AI-powered video analysis with feedback overlay
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Original Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <VideoUpload
              onVideoUploaded={setUploadedVideo}
              onProcessingStart={() => setIsProcessing(true)}
              onProcessingComplete={handleVideoProcessed}
              onProcessingError={handleProcessingError}
              isProcessing={isProcessing}
            />
            
            {uploadedVideo && (
              <div className="bg-dark-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-300">
                  Original Video
                </h3>
                <VideoPlayer videoUrl={uploadedVideo} />
              </div>
            )}
          </motion.div>

          {/* Right Column - Processed Video and Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {isProcessing && (
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
                  <span className="text-lg">Processing video...</span>
                </div>
                <p className="text-dark-400 text-center mt-2">
                  This may take a few minutes depending on video length
                </p>
              </div>
            )}

            {processedVideo && (
              <div className="bg-dark-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-300">
                  Processed Video with Feedback
                </h3>
                <VideoPlayer videoUrl={processedVideo} />
              </div>
            )}

            {analysis && (
              <AnalysisResults analysis={analysis} />
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">Error</h3>
                <p className="text-red-300">{error}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App; 