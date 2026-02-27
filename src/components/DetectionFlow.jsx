import React from 'react';
import { motion } from 'framer-motion';
import { Type, Hash, Layers, FileText, CheckCircle } from 'lucide-react';

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } })
};

const SmallBox = ({ children }) => (
  <div className="bg-secondary/10 p-3 rounded-md text-sm text-muted-foreground">{children}</div>
);

const DetectionFlow = () => {
  const sampleText = 'The quick brown fox jumps over the lazy dog. The quick brown fox...';

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-foreground mb-6">Detection Flow</motion.h2>

      <motion.div initial={{ opacity: 0, scale: 0.99 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass-card p-8 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <motion.div custom={0} variants={stepVariants} initial="hidden" whileInView="visible" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md text-primary"><Type size={18} /></div>
              <div>
                <div className="text-sm font-bold">Text Input</div>
                <div className="text-xs text-muted-foreground">Paste or upload documents</div>
              </div>
            </div>
            <SmallBox>{sampleText.slice(0, 60)}...</SmallBox>
          </motion.div>

          <motion.div custom={1} variants={stepVariants} initial="hidden" whileInView="visible" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md text-primary"><Hash size={18} /></div>
              <div>
                <div className="text-sm font-bold">Rabin-Karp Hashing</div>
                <div className="text-xs text-muted-foreground">Sliding window rolling hashes</div>
              </div>
            </div>
            <SmallBox>Rolling windows generate numeric fingerprints.</SmallBox>
          </motion.div>

          <motion.div custom={2} variants={stepVariants} initial="hidden" whileInView="visible" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md text-primary"><Layers size={18} /></div>
              <div>
                <div className="text-sm font-bold">Winnowing</div>
                <div className="text-xs text-muted-foreground">Select robust fingerprints</div>
              </div>
            </div>
            <SmallBox>Pick minimum hashes across windows to form fingerprints.</SmallBox>
          </motion.div>

          <motion.div custom={3} variants={stepVariants} initial="hidden" whileInView="visible" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md text-primary"><FileText size={18} /></div>
              <div>
                <div className="text-sm font-bold">Matching & Scoring</div>
                <div className="text-xs text-muted-foreground">Compare fingerprints, generate heatmap</div>
              </div>
            </div>
            <SmallBox>Matched phrases are highlighted with confidence scores.</SmallBox>
          </motion.div>
        </div>

        {/* Visual pipeline */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="p-4 bg-secondary/10 rounded-md">
                <div className="font-mono text-sm text-muted-foreground">Sample Text</div>
                <div className="mt-2 font-mono text-sm bg-background/5 p-3 rounded">{sampleText}</div>
              </motion.div>
            </div>

            <div className="w-2 h-24 bg-border hidden md:block" />

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="p-4 bg-secondary/10 rounded-md">
                <div className="font-mono text-sm text-muted-foreground">Fingerprints</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-10 h-6 bg-primary/10 text-primary rounded-md flex items-center justify-center text-xs">F{i + 1}</div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="w-2 h-24 bg-border hidden md:block" />

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="p-4 bg-secondary/10 rounded-md">
                <div className="font-mono text-sm text-muted-foreground">Matches</div>
                <div className="mt-2">
                  <div className="p-3 bg-background/5 rounded-md">
                    <div className="text-sm">...highlighted matched phrase example...</div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <CheckCircle className="text-primary" size={16} />
                      <span className="text-muted-foreground">Confidence: 92%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DetectionFlow;
