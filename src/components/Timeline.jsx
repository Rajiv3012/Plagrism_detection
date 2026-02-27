import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Upload Document',
  'Fingerprint Generation',
  'Window Mapping',
  'Source Matching',
  'Report Generation'
];

const Timeline = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-foreground mb-6">Detection Timeline</motion.h2>

      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="glass-card p-4 rounded-lg flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{i + 1}</div>
            <div>
              <div className="font-bold">{s}</div>
              <div className="text-sm text-muted-foreground">Step detail for {s.toLowerCase()}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
