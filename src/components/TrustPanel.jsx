import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Server, Database } from 'lucide-react';

const TrustPanel = () => {
  const items = [
    { icon: <Lock size={20} />, title: '100% Privacy', desc: 'Local hashing in your browser, never uploaded.' },
    { icon: <Database size={20} />, title: 'No Data Storage', desc: 'We do not store your documents or phrases.' },
    { icon: <Server size={20} />, title: 'End-to-end Secured', desc: 'Secure hashing and local processing.' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-foreground mb-6">Trust & Security</motion.h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4 py-4">
          {items.map((it, i) => (
            <motion.div whileHover={{ scale: 1.03 }} key={i} className="glass-card min-w-[280px] p-6 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">{it.icon}</div>
                <div>
                  <h4 className="font-bold">{it.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPanel;
