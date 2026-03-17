import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface QuizCardProps {
  onYes: () => void;
}

const QuizCard = ({ onYes }: QuizCardProps) => {
  const [rejected, setRejected] = useState(false);

  return (
    <motion.div
      className="glass-card rounded-[2rem] p-8 text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        {!rejected ? (
          <motion.div key="quiz" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="text-primary/80 text-sm font-bold uppercase tracking-ultra-wide mb-2">
              Snabb kontroll
            </p>
            <h2 className="text-2xl font-semibold mb-3">Är du 21+?</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Vi behöver bara kontrollera att du är berättigad.
            </p>
            <div className="space-y-4">
              <button
                onClick={onYes}
                className="w-full py-6 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all active:scale-[0.98] glow-button text-lg flex items-center justify-center gap-2"
              >
                <Check size={20} strokeWidth={3} />
                Ja, jag är 21+
              </button>
              <button
                onClick={() => setRejected(true)}
                className="w-full py-4 px-8 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-2xl transition-all text-base"
              >
                Nej, jag är under 21
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rejected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-secondary-foreground"
          >
            <p className="text-lg">
              Tyvärr är detta erbjudande endast tillgängligt för personer som är 21 år eller äldre.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizCard;
