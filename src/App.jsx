import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileSearch } from 'lucide-react';

import Navbar from './components/Navbar';
import InputSection from './components/InputSection';
import SettingsPanel from './components/SettingsPanel';
import ResultsSection from './components/ResultsSection';
import HistoryPanel from './components/HistoryPanel';
import ErrorBoundary from './components/ErrorBoundary';
import ParticleBackground from './components/ParticleBackground';
import StatusIndicator from './components/StatusIndicator';
import { useHistory } from './hooks/useHistory';
import { usePlagiarismWorker } from './hooks/usePlagiarismWorker';
import ExtraSections from './components/ExtraSections';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import DeepEngine from './components/DeepEngine';
import TrustPanel from './components/TrustPanel';
import PerformanceStats from './components/PerformanceStats';
import DetectionFlow from './components/DetectionFlow';
import Timeline from './components/Timeline';
import FeatureGrid from './components/FeatureGrid';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [theme, setTheme] = useState('dark');
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Input State
  const [sourceText, setSourceText] = useState('');
  const [suspectText, setSuspectText] = useState('');
  const [sourceCount, setSourceCount] = useState(0);
  const [suspectCount, setSuspectCount] = useState(0);

  // Settings State
  const [density, setDensity] = useState(5);
  const [matchLength, setMatchLength] = useState(3);

  // Hooks
  const { history, saveToHistory } = useHistory();
  const { checkPlagiarism, isAnalyzing, result } = usePlagiarismWorker();

  // Theme Logic
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Word Count Helper
  const getWordCount = (text) => text.trim() ? text.split(/\s+/).length : 0;

  useEffect(() => { setSourceCount(getWordCount(sourceText)); }, [sourceText]);
  useEffect(() => { setSuspectCount(getWordCount(suspectText)); }, [suspectText]);

  // File Upload Helper
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (e, setText) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const text = await readFile(file);
        setText(text);
      } catch (err) { console.error(err); }
    }
  };

  const handleCheck = () => {
    if (!sourceText.trim() || !suspectText.trim()) {
      alert('Please enter text in both fields.');
      return;
    }
    checkPlagiarism({
      source: sourceText,
      suspect: suspectText,
      windowSize: density,
      kValue: matchLength
    });
  };

  const handleClear = () => {
    setSourceText('');
    setSuspectText('');
    setDensity(5);
    setMatchLength(3);
    window.location.reload();
  };

  useEffect(() => {
    if (result) {
      saveToHistory({
        source: sourceText,
        suspect: suspectText,
        score: result.score,
        timeTaken: result.timeTaken,
        matchCount: result.matches.length
      });
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [result]);

  const loadHistoryItem = (rec) => {
    setSourceText(rec.source);
    setSuspectText(rec.suspect);
    setShowHistory(false);
  };

  return (
    <>
      <ScrollProgress />
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 bg-primary/30 blur-3xl animate-pulse"></div>
                <div className="relative w-20 h-20 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black text-gradient mb-2"
              >
                PlagDetect.ai
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground font-mono"
              >
                Initializing Security Protocols...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pb-20 relative overflow-x-hidden selection:bg-primary/30">
        {/* Animated Background */}
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-background"></div>
          <div className="absolute inset-0 cyber-grid opacity-50"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50"></div>
        </div>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        toggleHistory={() => setShowHistory(!showHistory)}
      />

      <StatusIndicator status={isAnalyzing ? 'analyzing' : result ? 'complete' : 'ready'} />

      <HistoryPanel isOpen={showHistory} history={history} onLoadItem={loadHistoryItem} />

      <main className="container mx-auto px-4 pt-12">

      {/* Hero */}
        <div className="text-center mb-16 space-y-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-sm font-mono text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                AI-Powered Detection System
              </span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-foreground relative"
          >
            <span className="relative inline-block">
              Advanced
              <div className="absolute -inset-1 bg-primary/20 blur-xl -z-10"></div>
            </span>
            {' '}
            <span className="text-gradient animate-float inline-block">Plagiarism</span>
            {' '}
            <br className="md:hidden" />
            Detection
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Military-grade text analysis powered by{' '}
            <span className="text-primary font-semibold">Rabin-Karp</span> &{' '}
            <span className="text-accent font-semibold">Winnowing</span> algorithms
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 pt-8"
          >
            {[
              { label: 'Accuracy', value: '99.9%' },
              { label: 'Speed', value: '<100ms' },
              { label: 'Privacy', value: '100%' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <InputSection
            label="Source Text"
            icon={<FileText size={20} className="text-primary" />}
            fileId="source-file"
            textId="source-text"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Paste original text here..."
            fileAccept=".txt"
            onFileUpload={(e) => handleFileUpload(e, setSourceText)}
            wordCount={sourceCount}
          />
          <InputSection
            label="Suspicious Text"
            icon={<FileSearch size={20} className="text-primary" />}
            fileId="suspect-file"
            textId="suspect-text"
            value={suspectText}
            onChange={(e) => setSuspectText(e.target.value)}
            placeholder="Paste text to check here..."
            fileAccept=".txt"
            onFileUpload={(e) => handleFileUpload(e, setSuspectText)}
            wordCount={suspectCount}
          />
        </div>

        {/* Settings & Actions */}
        <SettingsPanel
          density={density}
          setDensity={setDensity}
          matchLength={matchLength}
          setMatchLength={setMatchLength}
          onCheck={handleCheck}
          onClear={handleClear}
          isAnalyzing={isAnalyzing}
        />

        {/* Results */}
        <AnimatePresence>
          {result && (
            <ErrorBoundary>
              <ResultsSection result={{ ...result, suspectText }} />
            </ErrorBoundary>
          )}
        </AnimatePresence>

        {/* Extra animated sections */}
        <ExtraSections />

        <HowItWorks />
        <DashboardPreview />
        <DeepEngine />
        <TrustPanel />
        <PerformanceStats />
        <DetectionFlow />
        <Timeline />
        <FeatureGrid />
      </main>

      {/* Footer */}
      <footer className="relative mt-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="text-center py-12 text-muted-foreground text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <p className="font-mono">&copy; 2026 PlagDetect<span className="text-primary">.ai</span></p>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-xs text-muted-foreground/60">Powered by Advanced AI Algorithms</p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;
