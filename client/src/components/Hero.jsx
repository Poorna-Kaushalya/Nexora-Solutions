import { useEffect } from "react";
import { Activity, Layers } from "lucide-react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const Hero = () => {
  // Mouse position tracking for a dynamic layout spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Config data for digital grid beams
  const laserBeams = [
    { left: "10%", delay: 0.2, duration: 3.5, height: "h-32" },
    { left: "25%", delay: 1.5, duration: 4.5, height: "h-56" },
    { left: "40%", delay: 0.8, duration: 3.0, height: "h-48" },
    { left: "60%", delay: 2.2, duration: 5.0, height: "h-64" },
    { left: "75%", delay: 0.4, duration: 4.0, height: "h-40" },
    { left: "90%", delay: 1.8, duration: 4.8, height: "h-60" },
  ];

  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-slate-950 px-6 pt-16 pb-20 text-white sm:px-12 lg:px-24">
      
      {/* 1. Hardware Spotlight Tracker Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              550px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Precision Technical Layout Grids */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] opacity-70" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:14rem_100%] [mask-image:linear-gradient(to_bottom,#000,transparent)] opacity-20" />
      
      {/* 3. Layered High-Frequency Specular Flares */}
      <div className="absolute top-[-10%] left-1/2 -z-10 h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-linear-to-tr from-blue-500/15 via-indigo-500/10 to-purple-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -z-10 h-[350px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[110px] pointer-events-none" />

      {/* 4. Cyber Matrix Beam Arrays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {laserBeams.map((beam, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 w-[1.5px] bg-linear-to-b from-transparent via-cyan-500/40 to-transparent ${beam.height}`}
            style={{ left: beam.left }}
            animate={{
              y: ["-100%", "250%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              delay: beam.delay,
              ease: "linear",
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-cyan-400 blur-[1px] rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          </motion.div>
        ))}
      </div>

      {/* 5. Isometric Frame Coordinates & Status Bars */}
      <div className="absolute top-24 left-12 hidden font-mono text-[9px] tracking-widest text-slate-600 lg:block select-none">
        PORTAL // LIVE <br />
        DEV_TRACKER // ACTIVE
      </div>
      <div className="absolute top-24 right-12 hidden font-mono text-[9px] tracking-widest text-slate-600 text-right lg:block select-none">
        ACTIVE_BUILDS // 14 <br />
        <span className="text-cyan-500/70">CLIENT_NODE // SECURE</span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        
        {/* Upper Micro-Badge Matrix */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/40 p-1.5 pr-4 text-[11px] font-mono tracking-wider backdrop-blur-xl cursor-default select-none group transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
        >
          <div className="flex h-5 items-center gap-1.5 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 px-2.5 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <Layers className="h-3 w-3" /> CUSTOM SOFTWARE
          </div>
          <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200 transition-colors">
            <Activity className="h-3 w-3 text-emerald-400 animate-pulse" /> Production Pipelines Live
          </span>
        </motion.div>

        {/* High-Fidelity Multi-Tone Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl select-none leading-[1.05]"
        >
          <span className="block bg-linear-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Concept to Code.
          </span>
          <span className="mt-1 block bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(56,189,248,0.15)] font-black">
            Nexora Solutions
          </span>
        </motion.h1>

        {/* Architectural Pillars Pill Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {["Request Custom Build", "Track Ongoing Projects", "On-Demand Scaling"].map((text, i) => (
            <span key={i} className="px-3 py-1 text-[11px] font-mono tracking-widest text-slate-400 bg-slate-900/30 border border-slate-900 rounded-md shadow-inner">
              {text}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 font-normal">
          Submit your product requirements directly through our deployment pipeline. Monitor our currently active software clusters, review codebase evolution, and scale your technical infrastructure seamlessly.
        </p>
      </div>
      
      {/* Precision Frame Accents */}
      <div className="absolute top-12 left-12 hidden h-8 w-px bg-slate-900 lg:block" />
      <div className="absolute top-12 left-12 hidden h-px w-8 bg-slate-900 lg:block" />
      <div className="absolute top-12 right-12 hidden h-8 w-px bg-slate-900 lg:block" />
      <div className="absolute top-12 right-12 hidden h-px w-8 bg-slate-900 lg:block" />
      
      {/* Modern bottom fade overlay & layout rule border split */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-900 via-50% to-transparent" />
    </section>
  );
};

export default Hero;