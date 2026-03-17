import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";
import QuizCard from "@/components/QuizCard";
import LandingContent from "@/components/LandingContent";
import Footer from "@/components/Footer";
import appIcon from "@/assets/app-icon.png";

const Index = () => {
  const [passed, setPassed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AuroraBackground />

      <main className="relative z-10 max-w-xl mx-auto px-6 pt-16 pb-24 min-h-svh flex flex-col justify-center">
        {/* Hero Header - always visible until passed */}
        <AnimatePresence>
          {!passed && (
            <motion.header
              className="text-center mb-12"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <img src={appIcon} alt="App icon" className="w-24 h-24 rounded-2xl mx-auto mb-6 shadow-[0_0_24px_rgba(16,185,129,0.3)]" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight glow-text uppercase mb-4">
                Tjäna pengar på{" "}
                <span className="text-primary">spel & videos</span>
              </h1>
              <p className="text-secondary-foreground text-lg font-medium">
                Spela spel, titta på videos och tjäna pengar direkt från mobilen.
              </p>
            </motion.header>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!passed ? (
            <QuizCard key="quiz" onYes={() => setPassed(true)} />
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingContent />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
