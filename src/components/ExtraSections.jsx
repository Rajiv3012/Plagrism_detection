import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Eye, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 rounded-2xl"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const ExtraSections = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-16 py-20">
      {/* Animated floating shapes */}
      <div className="relative pointer-events-none -mt-8">
        <div className="absolute -left-20 top-0 w-44 h-44 bg-primary/8 rounded-full blur-3xl animate-float" />
        <div className="absolute right-0 top-10 w-36 h-36 bg-accent/6 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Features */}
      <div>
        <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-2xl font-extrabold text-foreground mb-6">Why PlagDetect.ai</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={<Zap size={20} />} title="Blazing Fast" desc="Optimized algorithms to deliver near-instant results." delay={0.05} />
          <FeatureCard icon={<Shield size={20} />} title="Privacy First" desc="Local checks in your browser — data never leaves your device." delay={0.15} />
          <FeatureCard icon={<Eye size={20} />} title="Accurate Highlights" desc="Detects subtle overlaps with contextual highlighting." delay={0.25} />
        </div>
      </div>

      {/* Process / How it works */}
      <div>
        <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-2xl font-extrabold text-foreground mb-6">How it works</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
            <div className="font-mono text-xs text-muted-foreground mb-2">Step 1</div>
            <h4 className="font-bold">Ingest</h4>
            <p className="text-sm text-muted-foreground mt-2">Paste text or drop files; we parse and tokenize locally.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} className="glass-card p-6 rounded-2xl">
            <div className="font-mono text-xs text-muted-foreground mb-2">Step 2</div>
            <h4 className="font-bold">Analyze</h4>
            <p className="text-sm text-muted-foreground mt-2">Rabin-Karp & Winnowing extract matches and compute similarity scores.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="glass-card p-6 rounded-2xl">
            <div className="font-mono text-xs text-muted-foreground mb-2">Step 3</div>
            <h4 className="font-bold">Review</h4>
            <p className="text-sm text-muted-foreground mt-2">Interactive diff viewer highlights matched zones for quick review.</p>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12">
        <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="inline-block">
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-3xl font-extrabold mb-2">Ready to scan your content?</h3>
            <p className="text-muted-foreground mb-6">Try a free analysis — keep your content safe and original.</p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-primary text-background font-semibold flex items-center gap-2 hover:opacity-95">
                Try Now <ArrowRight size={16} />
              </button>
              <button className="px-6 py-3 rounded-xl border border-border text-muted-foreground hover:bg-secondary">Learn More</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraSections;
