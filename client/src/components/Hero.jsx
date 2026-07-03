import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  // Config data for digital grid beams
  const laserBeams = [
    { left: "15%", delay: 0.5, duration: 4, height: "h-40" },
    { left: "30%", delay: 2.2, duration: 5, height: "h-64" },
    { left: "45%", delay: 0.1, duration: 3.5, height: "h-32" },
    { left: "65%", delay: 1.8, duration: 6, height: "h-56" },
    { left: "78%", delay: 3.0, duration: 4.5, height: "h-48" },
    { left: "90%", delay: 1.2, duration: 5.5, height: "h-72" },
  ];

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-950 px-6 pt-24 pb-12 text-white sm:px-12 lg:px-24">
      
      {/* 1. Modern Subtle Background Mesh & Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* 2. Ambient Color Flare */}
      <div className="absolute top-0 left-1/2 -z-10 h-125 w-150 -translate-x-1/2 rounded-full bg-linear-to-r from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px]" />

      {/* 3. Cyber Matrix Beam System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {laserBeams.map((beam, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 w-px bg-linear-to-b from-transparent via-blue-500/40 to-transparent ${beam.height}`}
            style={{ left: beam.left }}
            animate={{
              y: ["-100%", "200%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              delay: beam.delay,
              ease: "easeInOut",
            }}
          >
            {/* Bright core pixel tail point */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.75 h-3 bg-cyan-400 blur-[1px] rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Main Core View Area Container */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        
        {/* Feature Tag with slight hover lift */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium tracking-wider text-blue-400 uppercase backdrop-blur-md cursor-default select-none"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> Introducing the Future
        </motion.div>

        {/* Cinematic Title with Smooth Entrance Reveal */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-6 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl lg:text-8xl select-none"
        >
          Nexora Solutions
        </motion.h1>

        {/* Minimalist Subtext / Motto Splitter */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-base font-medium tracking-wide text-slate-400 sm:text-lg md:text-xl">
          <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold text-transparent">Build</span>
          <span className="text-slate-600">•</span>
          <span className="bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text font-semibold text-transparent">Learn</span>
          <span className="text-slate-600">•</span>
          <span className="bg-linear-to-r from-pink-400 to-rose-400 bg-clip-text font-semibold text-transparent">Succeed</span>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Empowering next-generation builders with scalable architecture, interactive insight, and cutting-edge operational intelligence.
        </p>

        {/* High-Fidelity Call to Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/request"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 active:scale-95"
          >
            Get Started
            <ArrowRight className="h-4 w-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 px-8 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:text-white"
          >
            View Documentation
          </a>
        </div>
      </div>
      
      {/* Modern bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-slate-950 to-transparent" />
    </section>
  );
};

export default Hero;