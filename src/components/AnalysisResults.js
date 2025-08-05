import React, { useState } from 'react';
import { BarChart3, Target, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalysisResults = ({ analysis }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);

  if (!analysis || !analysis.feedback) {
    return null;
  }

  const { feedback, analysis: frameAnalyses } = analysis;

  const stats = [
    {
      label: 'Total Frames',
      value: feedback.totalFrames,
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      label: 'Shots Attempted',
      value: feedback.shotCount,
      icon: Target,
      color: 'text-green-400'
    },
    {
      label: 'Shots Made',
      value: feedback.madeCount,
      icon: TrendingUp,
      color: 'text-yellow-400'
    },
    {
      label: 'Accuracy',
      value: feedback.accuracy,
      icon: BarChart3,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="bg-dark-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-primary-300">
        Analysis Results
      </h3>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-700 rounded-lg p-4 text-center"
          >
            <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-dark-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Frame-by-Frame Analysis */}
      {frameAnalyses && frameAnalyses.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-300">
            Frame-by-Frame Analysis
          </h4>
          
          <div className="max-h-96 overflow-y-auto space-y-3">
            {frameAnalyses.map((frame, index) => (
              <motion.div
                key={frame.frame}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedFrame === index
                    ? 'bg-primary-600/20 border border-primary-400'
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
                onClick={() => setSelectedFrame(selectedFrame === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-400">
                    Frame {index + 1}
                  </span>
                  <span className="text-xs text-dark-400">
                    {frame.timestamp}s
                  </span>
                </div>
                
                <div className="text-sm text-dark-300 line-clamp-2">
                  {frame.analysis}
                </div>
                
                {selectedFrame === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-dark-600"
                  >
                    <div className="text-sm text-white whitespace-pre-wrap">
                      {frame.analysis}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-dark-700 rounded-lg"
      >
        <h4 className="text-lg font-semibold text-primary-300 mb-2">
          Summary
        </h4>
        <div className="text-sm text-dark-300 space-y-2">
          <p>
            <span className="text-white font-medium">Total Analysis:</span> {feedback.totalFrames} frames processed
          </p>
          <p>
            <span className="text-white font-medium">Performance:</span> {feedback.shotCount} shots attempted, {feedback.madeCount} made ({feedback.accuracy} accuracy)
          </p>
          <p>
            <span className="text-white font-medium">Processing:</span> Frame-by-frame AI analysis completed with feedback overlay
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisResults; 