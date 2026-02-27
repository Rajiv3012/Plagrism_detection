import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Hash, Target, Search, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';

const TimelineStep = ({
  step,
  title,
  description,
  icon: Icon,
  isActive,
  isCompleted,
  isLast,
  onClick
}) => {
  return (
    <motion.div
      className="relative flex items-start group cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center mr-8">
        <motion.div
          className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
            isCompleted
              ? 'bg-primary border-primary'
              : isActive
                ? 'bg-primary/20 border-primary animate-pulse'
                : 'bg-muted border-muted-foreground/30'
          }`}
          whileHover={{ scale: 1.2 }}
        />
        {!isLast && (
          <motion.div
            className={`w-0.5 h-24 mt-4 transition-colors duration-300 ${
              isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 pb-12 ${isActive ? 'opacity-100' : 'opacity-70'}`}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <motion.div
              className={`p-3 rounded-xl transition-all duration-300 ${
                isCompleted
                  ? 'bg-primary/10 text-primary'
                  : isActive
                    ? 'bg-primary/5 text-primary animate-pulse'
                    : 'bg-muted/50 text-muted-foreground'
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-primary font-bold">
                  STEP {step}
                </span>
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>

              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {title}
              </h3>

              <p className={`leading-relaxed transition-colors duration-300 ${
                isActive ? 'text-foreground/80' : 'text-muted-foreground'
              }`}>
                {description}
              </p>

              {/* Progress bar for active step */}
              {isActive && (
                <motion.div
                  className="mt-4 h-1 bg-primary/20 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [completedSteps, setCompletedSteps] = useState(new Set([1]));

  const steps = [
    {
      step: 1,
      title: "Document Upload & Preprocessing",
      description: "Upload your documents and watch as our advanced preprocessing engine normalizes text, removes formatting artifacts, and prepares content for analysis. Our system handles multiple file formats and encoding standards seamlessly.",
      icon: FileText,
      details: "Multi-format support, text normalization, encoding detection"
    },
    {
      step: 2,
      title: "Rolling Hash Algorithm",
      description: "Our optimized Rabin-Karp rolling hash algorithm scans through documents with lightning speed, creating unique fingerprints for every text segment. This mathematical approach ensures collision-resistant hashing.",
      icon: Hash,
      details: "Rolling hash windows, polynomial hashing, collision resistance"
    },
    {
      step: 3,
      title: "Fingerprint Selection",
      description: "Using the winnowing algorithm, we intelligently select the most representative fingerprints while minimizing computational overhead. This guarantees detection of plagiarism while maintaining efficiency.",
      icon: Target,
      details: "Winnowing algorithm, guaranteed detection, minimal fingerprints"
    },
    {
      step: 4,
      title: "Pattern Matching & Analysis",
      description: "Advanced multi-layered comparison algorithms identify exact matches, paraphrases, and structural similarities. Our AI-powered analysis provides contextual understanding beyond simple text matching.",
      icon: Search,
      details: "Semantic analysis, structural comparison, contextual matching"
    },
    {
      step: 5,
      title: "Results & Reporting",
      description: "Receive comprehensive reports with highlighted matches, similarity percentages, and actionable insights. Our real-time processing delivers results in milliseconds with industry-leading accuracy.",
      icon: CheckCircle,
      details: "Real-time results, detailed reports, actionable insights"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev >= steps.length ? 1 : prev + 1;
        setCompletedSteps(prevSet => new Set([...prevSet, next]));
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
    setCompletedSteps(prev => new Set([...prev, stepNumber]));
  };

  const resetProcess = () => {
    setActiveStep(1);
    setCompletedSteps(new Set([1]));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience our sophisticated 5-step process that combines cutting-edge algorithms with real-time analysis for unparalleled plagiarism detection
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative z-10 mb-12">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.step}
            {...step}
            isActive={activeStep === step.step}
            isCompleted={completedSteps.has(step.step)}
            isLast={index === steps.length - 1}
            onClick={() => handleStepClick(step.step)}
          />
        ))}
      </div>

      {/* Control Panel */}
      <motion.div
        className="flex justify-center items-center gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            isAutoPlaying
              ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
              : 'glass-card text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isAutoPlaying ? 'Pause Demo' : 'Resume Demo'}
        </motion.button>

        <motion.button
          onClick={resetProcess}
          className="flex items-center gap-3 px-6 py-3 glass-card rounded-full font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          Reset Process
        </motion.button>
      </motion.div>

      {/* Current Step Highlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {(() => {
                  const IconComponent = steps[activeStep - 1].icon;
                  return <IconComponent className="w-8 h-8 text-primary" />;
                })()}
              </motion.div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {steps[activeStep - 1].title}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {steps[activeStep - 1].details}
                </p>
              </div>
            </div>

            <motion.p
              className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {steps[activeStep - 1].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Performance Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[
          { label: 'Processing Speed', value: '< 100ms', icon: Hash },
          { label: 'Detection Accuracy', value: '99.9%', icon: Target },
          { label: 'Languages Supported', value: '50+', icon: FileText },
          { label: 'Success Rate', value: '99.8%', icon: CheckCircle }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
