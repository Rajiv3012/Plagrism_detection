import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trash2, Sliders, Type, Activity } from 'lucide-react';

const SettingsPanel = ({
    density,
    setDensity,
    matchLength,
    setMatchLength,
    onCheck,
    onClear,
    isAnalyzing
}) => {

    const densityOptions = [
        { label: 'Fast', value: 8, desc: 'Quick scan' },
        { label: 'Balanced', value: 5, desc: 'Recommended' },
        { label: 'Deep', value: 3, desc: 'Thorough' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto w-full mb-12"
        >
            <div className="glass-card p-3 md:p-4 flex flex-col md:flex-row gap-4 items-center relative overflow-hidden">
                {/* Animated background accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                {/* Settings Area */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-4">

                    {/* Density Control */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <Activity size={14} className="text-primary" /> Scan Density
                        </label>
                        <div className="flex bg-secondary/80 p-2 rounded-xl border border-border/40">
                            {densityOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setDensity(opt.value)}
                                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all relative ${density === opt.value
                                            ? 'bg-primary text-background shadow-lg shadow-primary/30'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {opt.label}
                                    {density === opt.value && (
                                        <motion.div
                                            layoutId="density-indicator"
                                            className="absolute inset-0 bg-primary rounded-lg -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Match Length Control */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <Type size={14} className="text-accent" /> Match Sensitivity
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-secondary/80 p-2 rounded-xl flex border border-border/40">
                                {[3, 5].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setMatchLength(val)}
                                        className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-bold transition-all relative ${matchLength === val && parseInt(matchLength) === val
                                                ? 'bg-accent text-background shadow-lg shadow-accent/30'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                            }`}
                                    >
                                        {val === 3 ? 'Standard' : 'Strict'}
                                    </button>
                                ))}
                            </div>
                            <div className="w-[92px] h-[48px] bg-secondary border border-primary/20 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-foreground relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
                                <span className="relative z-10">{matchLength} <span className="text-[10px] font-sans text-primary ml-1">words</span></span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="p-4 flex gap-3 w-full md:w-auto md:border-l md:border-border/50">
                    <button
                        onClick={onClear}
                        className="px-5 py-3 rounded-xl border border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30 transition-all flex items-center justify-center gap-2 font-semibold active:scale-95"
                    >
                        <Trash2 size={18} /> Clear
                    </button>
                    <button
                        onClick={onCheck}
                        disabled={isAnalyzing}
                        className="flex-1 md:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-background hover:opacity-95 transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Zap size={18} fill="currentColor" /> 
                                Check Now
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsPanel;
