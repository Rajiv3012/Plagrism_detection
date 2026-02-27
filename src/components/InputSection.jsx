import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Scan } from 'lucide-react';

const InputSection = ({ label, icon, fileId, textId, value, onChange, placeholder, fileAccept, onFileUpload, wordCount }) => {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileUpload({ target: { files: e.dataTransfer.files } });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col gap-4 relative group overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex justify-between items-center pb-4 border-b border-border/50 relative z-10">
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <span className="text-primary">{icon}</span>
                    {label}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-mono border border-primary/20">.txt</span>
                </h2>

                <input
                    ref={fileInputRef}
                    type="file"
                    id={fileId}
                    hidden
                    accept={fileAccept}
                    onChange={onFileUpload}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary hover:text-background transition-all duration-300 border border-primary/20 hover:border-primary active:scale-95"
                >
                    <Upload size={14} /> Upload
                </button>
            </div>

            <div className="relative flex-1 min-h-[240px] z-10">
                <textarea
                    id={textId}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full h-full bg-transparent border-none resize-none outline-none font-mono text-sm leading-relaxed text-foreground placeholder-muted-foreground/60"
                ></textarea>

                {/* Empty State */}
                {!value && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl"></div>
                            <Scan size={48} className="text-primary/40 relative animate-pulse" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 font-medium">Type or drop file here</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">Drag & drop supported</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground pt-3 border-t border-border/50 relative z-10">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    Supported: .txt files
                </span>
                <span className="font-mono bg-secondary px-3 py-1 rounded-md border border-border">
                    {wordCount} <span className="text-primary">words</span>
                </span>
            </div>
        </motion.div>
    );
};

export default InputSection;
