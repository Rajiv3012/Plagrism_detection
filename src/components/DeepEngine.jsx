import React from 'react';
import { motion } from 'framer-motion';

const DeepEngine = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-foreground mb-6">Deep Detection Engine</motion.h2>

      <div className="relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/2 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="glass-card p-6 rounded-2xl">
            <h4 className="font-bold">Fingerprint Generation</h4>
            <p className="text-sm text-muted-foreground mt-2">Transform text windows into concise fingerprints for quick lookup.</p>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.06 }} className="glass-card p-6 rounded-2xl">
            <h4 className="font-bold">Hash Window Mapping</h4>
            <p className="text-sm text-muted-foreground mt-2">Efficient mapping of rolling hashes to their source positions.</p>
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="glass-card p-6 rounded-2xl">
            <h4 className="font-bold">Similarity Heatmaps</h4>
            <p className="text-sm text-muted-foreground mt-2">Generate heatmaps showing density of overlaps across documents.</p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-secondary/10 rounded-2xl">
          <h5 className="font-semibold mb-2">Why PlagAI — Confidence Breakdown</h5>
          <MultiDonut segments={[
            { label: 'Fingerprint', value: 42, color: '#7c3aed' },
            { label: 'Context', value: 28, color: '#06b6d4' },
            { label: 'Model', value: 18, color: '#f97316' },
            { label: 'Heuristics', value: 12, color: '#10b981' }
          ]} />
          <p className="text-xs text-muted-foreground mt-3">Aggregated confidence from fingerprint overlap, contextual similarity, model insight, and heuristics.</p>
        </div>

        <div className="p-6 bg-secondary/10 rounded-2xl">
          <h5 className="font-semibold mb-2">Model Signals</h5>
          <RadarChart values={[0.9, 0.7, 0.6, 0.8, 0.75]} labels={["Hash", "Winnow", "Chunk", "Context", "Heuristics"]} />
          <p className="text-xs text-muted-foreground mt-3">Multiple complementary signals contribute to the final detection score.</p>
        </div>
      </div>
    </section>
  );
};

export default DeepEngine;

function MultiDonut({ segments = [], size = 140, stroke = 16 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;

  // helper: convert polar coordinates to cartesian
  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const angleRad = (angleDeg - 90) * Math.PI / 180.0;
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
  };

  const describeArc = (x, y, r, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const total = segments.reduce((s, x) => s + x.value, 0) || 100;

  const arcs = segments.reduce((acc, s) => {
    const prevEnd = acc.length ? acc[acc.length - 1].end : 0;
    const start = prevEnd;
    const end = prevEnd + (s.value / total) * 360;
    acc.push({ ...s, start, end });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>
          {/* base circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef2f7" strokeWidth={stroke} />

          {arcs.map((s, i) => {
            const path = describeArc(cx, cy, r, s.start, s.end);
            return (
              <motion.path key={i} d={path} fill="none" stroke={s.color} strokeWidth={stroke - 2} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.9, delay: i * 0.08 }} />
            );
          })}

          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="16" fontWeight={700} fill="var(--foreground)">{Math.round((segments[0]?.value || 0) + (segments[1]?.value || 0))}%</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#64748b">Confidence</text>
        </g>
      </svg>

      <div className="flex flex-col text-sm gap-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span style={{ background: s.color }} className="w-3 h-3 rounded-sm inline-block" />
            <span className="font-medium">{s.label}</span>
            <span className="text-muted-foreground ml-2">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarChart({ values = [0.6, 0.8, 0.7, 0.5], labels = [] }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const rings = 4;
  const maxR = 62;

  const angleFor = (i, len) => (Math.PI * 2 * i) / len - Math.PI / 2;

  const points = values.map((v, i) => {
    const angle = angleFor(i, values.length);
    const r = v * maxR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>
          {/* concentric rings */}
          {[...Array(rings)].map((_, i) => {
            const rr = ((i + 1) / rings) * maxR;
            return <circle key={i} cx={cx} cy={cy} r={rr} fill="none" stroke="#eef2f7" strokeWidth={1} />;
          })}

          {/* axis lines + labels */}
          {values.map((_, i) => {
            const angle = angleFor(i, values.length);
            const lx = cx + Math.cos(angle) * (maxR + 12);
            const ly = cy + Math.sin(angle) * (maxR + 12);
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={cx + Math.cos(angle) * maxR} y2={cy + Math.sin(angle) * maxR} stroke="#e6e9ee" strokeWidth={1} />
                <text x={lx} y={ly} fontSize={10} textAnchor={Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle'} fill="#64748b">{labels[i] || `S${i+1}`}</text>
              </g>
            );
          })}

          {/* animated polygon */}
          <motion.polygon points={points} fill="#06b6d433" stroke="#06b6d4" strokeWidth={1.6} initial={{ opacity: 0, pathLength: 0 }} whileInView={{ opacity: 1, pathLength: 1 }} transition={{ duration: 0.9 }} />

          {/* dots */}
          {values.map((v, i) => {
            const angle = angleFor(i, values.length);
            const r = v * maxR;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            return <motion.circle key={i} cx={x} cy={y} r={3} fill="#06b6d4" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.06 }} />;
          })}
        </g>
      </svg>
    </div>
  );
}

function DonutChart({ percent = 74, label = 'Score' }) {
  const size = 120;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={r} fill="none" stroke="#e6e9ee" strokeWidth={stroke} />
          <motion.circle r={r} fill="none" stroke="#7c3aed" strokeWidth={stroke} strokeLinecap="round"
            initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - dash }} transition={{ duration: 1.2 }}
            strokeDasharray={`${c} ${c}`} transform={`rotate(-90)`} />
          <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">{percent}%</text>
          <text x="0" y="26" textAnchor="middle" fontSize="10" fill="#64748b">{label}</text>
        </g>
      </svg>
    </div>
  );
}

