import { motion } from "framer-motion";
import { Download, UserPlus, Gamepad2, ShieldCheck, BadgeCheck, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import appIcon from "@/assets/app-icon.png";
import LivePayouts from "@/components/LivePayouts";

const CTA_REDIRECT_LINK = "https://rainawards.com/r/eyJ0IjoiZnJlZWNhc2gtY3BpIiwidSI6IjY5YTVkZDcyYmU3NGI4MGNjYzE0MWNlNSIsInRzIjoxNzczNzQxMjg2MDEwfQ?s2=Sweden_New_Lander";

const steps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Download, title: "Ladda ner appen", desc: "Ladda ner appen och kom igång direkt" },
  { icon: UserPlus, title: "Skapa konto", desc: "Registrera dig med din e-postadress" },
  { icon: Gamepad2, title: "Spela och tjäna", desc: "Spela spel och titta på videos för att tjäna pengar" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const LandingContent = () => (
  <motion.div variants={container} initial="hidden" animate="show">
    {/* Header */}
    <motion.div variants={item} className="text-center mb-10">
      <img src={appIcon} alt="App icon" className="w-24 h-24 rounded-2xl mx-auto mb-6 shadow-[0_0_24px_rgba(16,185,129,0.3)]" />
      <h2 className="text-3xl font-bold mb-2">Nästan klart! 🎉</h2>
      <p className="text-muted-foreground">Följ dessa enkla steg för att få din belöning.</p>
    </motion.div>

    {/* Steps */}
    <div className="space-y-3 mb-8">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          variants={item}
          className="glass-card p-4 rounded-2xl flex items-center gap-4"
        >
          <div className="step-number-gradient w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-primary/30 text-primary">
            <s.icon size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight">{s.title}</h3>
            <p className="text-muted-foreground text-xs leading-snug">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <motion.a
      variants={item}
      href={CTA_REDIRECT_LINK}
      className="block w-full py-6 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-center text-xl font-bold rounded-2xl transition-all active:scale-[0.98] glow-button-lg mb-4"
    >
      Börja tjäna nu
    </motion.a>

    {/* Trust row */}
    <motion.div variants={item} className="flex items-center justify-center gap-6 mb-20 text-muted-foreground">
      <div className="flex items-center gap-1.5 text-xs">
        <ShieldCheck size={14} className="text-primary/70" />
        <span>256-Bit SSL</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <BadgeCheck size={14} className="text-primary/70" />
        <span>Säkra erbjudanden</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <Star size={14} className="text-primary/70 fill-primary/70" />
        <span>4,8★ (12k+)</span>
      </div>
    </motion.div>

    {/* Social Proof */}
    <motion.section variants={item} className="mb-20">
      <h3 className="text-primary/80 text-xs font-bold uppercase tracking-ultra-wide text-center mb-8">
        Senaste utbetalningar
      </h3>
      <LivePayouts />
    </motion.section>
  </motion.div>
);

export default LandingContent;
