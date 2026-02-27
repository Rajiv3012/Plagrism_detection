import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AnimatedGauge = ({ value = 72 }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <g transform="translate(60,60)">
        <circle r={radius} fill="none" stroke="rgba(30,41,59,0.12)" strokeWidth="12" />
        <motion.circle
          r={radius}
          fill="none"
          stroke="url(#g)"
          strokeWidth="12"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2 }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="g" x1="0%" x2="100%">
            <stop offset="0%" stopColor="hsl(189 94% 55%)" />
            <stop offset="100%" stopColor="hsl(271 91% 65%)" />
          </linearGradient>
        </defs>
        <text x="0" y="6" textAnchor="middle" className="font-black" style={{ fontSize: 18, fill: 'var(--foreground)' }}>{value}%</text>
      </g>
    </svg>
  );
};

const ProgressBar = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs text-muted-foreground"><span>{label}</span><span>{value}%</span></div>
    <div className="w-full bg-secondary/40 rounded-full h-3 overflow-hidden">
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} transition={{ duration: 1 }} className="h-3 bg-gradient-to-r from-primary to-accent" />
    </div>
  </div>
);

const DashboardPreview = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-foreground mb-6">Live Detection Preview</motion.h2>

      <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="glass-card p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col items-center">
          <AnimatedGauge value={78} />
          <p className="text-sm text-muted-foreground mt-3">Similarity Score</p>
        </div>

        <div className="md:col-span-2 space-y-4">
          <ProgressBar label="Matched Phrases" value={72} />
          <ProgressBar label="Structural Similarity" value={46} />
          <ProgressBar label="AI Confidence" value={92} />
          <div className="bg-secondary/10 p-3 rounded-md mt-2 font-mono text-sm text-muted-foreground">"...highlighted matched phrase example..."</div>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardPreview;
