import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SWEDISH_NAMES = [
  "Emma K.", "Lucas N.", "Sara L.", "Oscar F.", "Alma B.", "Viktor H.",
  "Ella M.", "Hugo W.", "Wilma S.", "Liam A.", "Maja D.", "Oliver T.",
  "Astrid R.", "Axel G.", "Saga P.", "Filip J.", "Ebba C.", "Isak E.",
  "Freja Ö.", "Nils Å.", "Klara V.", "Anton L.", "Elsa N.", "Gustav B.",
  "Hanna F.", "Erik S.", "Linnea H.", "Karl M.", "Ida W.", "Johan R.",
  "Agnes T.", "Albin D.", "Tilde G.", "Arvid P.", "Vera J.", "Hampus C.",
];

const randomAmount = () => Math.floor(Math.random() * 280 + 20);

interface Payout {
  id: number;
  name: string;
  amount: number;
  seconds: number;
}

let nextId = 0;
const pickName = (used: Set<string>) => {
  const available = SWEDISH_NAMES.filter((n) => !used.has(n));
  const pool = available.length > 0 ? available : SWEDISH_NAMES;
  return pool[Math.floor(Math.random() * pool.length)];
};

const formatTime = (s: number) => {
  if (s < 1) return "nyss";
  if (s < 60) return `${s} sek sedan`;
  return `${Math.floor(s / 60)} min sedan`;
};


const LivePayouts = () => {
  const createInitial = useCallback((): Payout[] => {
    const used = new Set<string>();
    return [0, 3, 9].map((sec) => {
      const name = pickName(used);
      used.add(name);
      return { id: nextId++, name, amount: randomAmount(), seconds: sec };
    });
  }, []);

  const [payouts, setPayouts] = useState<Payout[]>(createInitial);

  // Tick seconds every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPayouts((prev) => prev.map((p) => ({ ...p, seconds: p.seconds + 1 })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Add new payout every 4-8 seconds
  useEffect(() => {
    const schedule = () => {
      const delay = 4000 + Math.random() * 4000;
      return setTimeout(() => {
        setPayouts((prev) => {
          const used = new Set(prev.map((p) => p.name));
          const newPayout: Payout = {
            id: nextId++,
            name: pickName(used),
            amount: randomAmount(),
            seconds: 0,
          };
          return [newPayout, ...prev.slice(0, 2)];
        });
        timerId = schedule();
      }, delay);
    };
    let timerId = schedule();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {payouts.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-between items-center px-6 py-4 glass-card rounded-2xl"
          >
            <span className="font-medium">{p.name}</span>
            <div className="text-right">
              <span className="block font-bold text-primary">{p.amount} kr</span>
              <span className="block text-[10px] text-muted-foreground uppercase tracking-tight">
                {formatTime(p.seconds)}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LivePayouts;
