import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, History, Shield } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, toggleHistory }) => {
    const isDark = theme === 'dark';

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-effect sticky top-5 z-50 flex items-center justify-between px-6 py-4 rounded-2xl mb-8 mx-4 scan-line"
        >
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-xl rounded-xl"></div>
                    <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl">
                        <Shield size={24} className="text-background" />
                    </div>
                </div>
                <div>
                    <span className="text-xl font-black tracking-tight text-foreground block">
                        PlagDetect<span className="text-gradient">.ai</span>
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Security Protocol v2.0</span>
                </div>
            </div>

            <div className="flex gap-2">
                <ControlButton
                    onClick={toggleTheme}
                    icon={isDark ? <Sun size={20} /> : <Moon size={20} />}
                    label="Toggle Theme"
                />
                <ControlButton
                    onClick={toggleHistory}
                    icon={<History size={20} />}
                    label="View History"
                />
            </div>
        </motion.nav>
    );
};

const ControlButton = ({ onClick, icon, label }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="p-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-primary transition-all duration-200 active:scale-95 border border-transparent hover:border-primary/20"
    >
        {icon}
    </button>
);

export default Navbar;
