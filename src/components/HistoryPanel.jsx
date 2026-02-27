import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, ChevronRight, Database } from 'lucide-react';

const HistoryPanel = ({ isOpen, history, onLoadItem, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onClose && onClose()}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[380px] bg-card/95 backdrop-blur-2xl border-l border-primary/20 shadow-2xl z-50 p-6 flex flex-col"
                    >
                        {/* Animated border */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-50"></div>
                        
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-foreground flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Database className="text-primary" size={24} />
                                    </div>
                                    History
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 ml-14 font-mono">Analysis Archive</p>
                            </div>
                            {onClose && (
                                <button 
                                    onClick={onClose} 
                                    className="p-2.5 hover:bg-secondary rounded-xl transition-all border border-transparent hover:border-primary/20 text-muted-foreground hover:text-foreground active:scale-95"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <div className="text-center py-16 text-muted-foreground">
                                    <div className="relative inline-block mb-4">
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl"></div>
                                        <Clock size={48} className="relative opacity-30" />
                                    </div>
                                    <p className="font-medium">No history yet.</p>
                                    <p className="text-xs mt-2 opacity-60">Your analyses will appear here</p>
                                </div>
                            ) : (
                                history.map((rec, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => onLoadItem(rec)}
                                        className="group p-4 bg-secondary/40 border border-border/50 hover:border-primary/40 hover:bg-secondary/80 rounded-xl cursor-pointer transition-all relative overflow-hidden"
                                    >
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <span className="text-3xl font-black text-foreground">
                                                        {rec.score.toFixed(1)}<span className="text-lg text-primary">%</span>
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                                            rec.score > 50 ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'
                                                        }`}>
                                                            {rec.score > 50 ? 'High' : 'Low'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight 
                                                    size={20} 
                                                    className="text-muted-foreground group-hover:text-primary transition-all transform group-hover:translate-x-1" 
                                                />
                                            </div>
                                            <div className="text-xs text-muted-foreground flex justify-between font-mono">
                                                <span>{rec.timestamp}</span>
                                                <span className="text-accent">{rec.matches || 0} matches</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default HistoryPanel;
