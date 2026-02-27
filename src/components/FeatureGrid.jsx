import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Layers, BarChart3, Brain, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    title: 'Real-time Detection',
    description: 'Instant plagiarism analysis with sub-second response times, powered by optimized algorithms that process text in real-time.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    title: 'Deep Phrase Matching',
    description: 'Advanced semantic analysis that goes beyond simple word matching to understand context and meaning.',
    icon: Target,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'Structural Similarity',
    description: 'Analyzes document structure, paragraph flow, and writing patterns to detect sophisticated plagiarism attempts.',
    icon: Layers,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Cross-document Comparison',
    description: 'Compares suspect text against multiple sources simultaneously, ensuring comprehensive coverage.',
    icon: BarChart3,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'AI Confidence Score',
    description: 'Machine learning-powered confidence scoring that provides probabilistic assessment of plagiarism likelihood.',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'Smart Report Generation',
    description: 'Automated generation of detailed reports with highlighted matches, similarity percentages, and actionable insights.',
    icon: FileText,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  }
];

const FeatureGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Feature Highlights
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the cutting-edge capabilities that make our plagiarism detection the most advanced in the industry
        </p>
      </motion.div>

      <div className="relative">
        {/* Main Feature Display */}
        <div className="relative h-96 md:h-80 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute inset-0"
            >
              <div className="glass-card p-8 md:p-12 rounded-3xl h-full flex flex-col md:flex-row items-center gap-8">
                {(() => {
                  const IconComponent = features[currentIndex].icon;
                  return (
                    <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 ${features[currentIndex].bgColor} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className={`w-10 h-10 md:w-12 md:h-12 ${features[currentIndex].color}`} />
                    </div>
                  );
                })()}

                <div className="flex-1 text-center md:text-left">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {features[currentIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {features[currentIndex].description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="p-3 glass-card rounded-full hover:bg-primary/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {features.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="p-3 glass-card rounded-full hover:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Feature Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                onClick={() => goToSlide(index)}
                className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-primary bg-primary/5 scale-105'
                    : 'hover:bg-muted/50'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                  <Icon className={`w-4 h-4 ${feature.color}`} />
                </div>
                <h4 className="text-xs font-semibold text-center text-foreground leading-tight">
                  {feature.title}
                </h4>
              </motion.div>
            );
          })}
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isAutoPlaying
                ? 'bg-primary text-primary-foreground'
                : 'glass-card text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
