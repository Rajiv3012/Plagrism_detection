import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Zap, Target, Shield, TrendingUp, Activity, Database, Clock } from 'lucide-react';

const CountUp = ({ to, suffix = '', duration = 1200 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = null;
    const from = 0;
    const diff = to - from;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(from + diff * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);

  return <span ref={ref} className="font-extrabold text-2xl">{value}{suffix}</span>;
};

const CircularProgress = ({ value, maxValue, color, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / maxValue) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: strokeDasharray }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

const PerformanceStats = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      label: 'Documents Analyzed',
      value: 10000000,
      suffix: '+',
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Processed and analyzed',
      progressValue: 100,
      maxProgress: 100
    },
    {
      label: 'Avg Response',
      value: 100,
      suffix: 'ms',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      description: 'Lightning fast processing',
      progressValue: 95,
      maxProgress: 100
    },
    {
      label: 'Detection Accuracy',
      value: 99.9,
      suffix: '%',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Industry-leading precision',
      progressValue: 99.9,
      maxProgress: 100
    },
    {
      label: 'Hash Strength',
      value: 256,
      suffix: '-bit',
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Military-grade security',
      progressValue: 256,
      maxProgress: 512
    }
  ];

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Performance Metrics
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience unmatched speed, accuracy, and reliability in plagiarism detection
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                className="glass-card p-8 rounded-3xl text-center h-full flex flex-col items-center justify-center relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={false}
                  animate={hoveredIndex === index ? {
                    background: `radial-gradient(circle at center, ${stat.color.replace('text-', '')} 0%, transparent 70%)`
                  } : {}}
                />

                {/* Floating particles effect */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 ${stat.color.replace('text-', 'bg-')} rounded-full`}
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>

                {/* Progress Circle for applicable metrics */}
                {stat.label !== 'Documents Analyzed' && (
                  <div className="mb-4 relative z-10">
                    <CircularProgress
                      value={stat.progressValue}
                      maxValue={stat.maxProgress}
                      color={stat.color}
                      size={100}
                    />
                  </div>
                )}

                {/* Value */}
                <motion.div
                  className="mb-3 relative z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} duration={1500 + index * 200} />
                </motion.div>

                {/* Label */}
                <motion.div
                  className="text-sm font-semibold text-foreground mb-2 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {stat.label}
                </motion.div>

                {/* Description */}
                <motion.div
                  className="text-xs text-muted-foreground relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {stat.description}
                </motion.div>

                {/* Activity indicator */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Live activity indicator */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">Live System Active</span>
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default PerformanceStats;
