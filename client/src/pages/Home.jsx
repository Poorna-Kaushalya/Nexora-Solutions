import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCounter from "../components/StatsCounter"; 
import Services from "../components/Services";
import TechStack from "../components/TechStack"; 
import Projects from "../components/Projects";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";
import FAQ from "../components/FAQ"; 
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import RequestModal from "../components/RequestModal";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const Home = () => {
  const [openRequest, setOpenRequest] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor screen window scroll depth to toggle visibility
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  // Smooth scroll handler targeting document root acceleration
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden scroll-smooth">
      
      <div className="absolute top-0 left-1/2 -z-10 h-150 w-250 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />

      <Navbar onRequestClick={() => setOpenRequest(true)} />

      <Hero />

      {/* Stats Counter Placement Row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
        <StatsCounter />
      </motion.div>

      <motion.div 
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-6 md:-my-16 scroll-mt-10" 
      >
        <Services />
      </motion.div>

      {/* Tech Stack Matrix Section Integration */}
      <motion.div
        id="technologies"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-0 scroll-mt-20"
      >
        <TechStack />
      </motion.div>

      <motion.div 
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-6 md:-my-30 relative scroll-mt-20"
      >
        <div className="absolute top-1/2 left-0 -z-10 h-100 w-100 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />
        <Projects />
      </motion.div>

      <motion.div 
        id="testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-6 md:py-10 scroll-mt-20" 
      >
        <Reviews />
        <div className="mt-6 px-6 max-w-3xl mx-auto"> 
          <ReviewForm />
        </div>
      </motion.div>

      {/* Structured FAQ Layout Block */}
      <motion.div
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="scroll-mt-20"
      >
        <FAQ />
      </motion.div>

      <WhatsAppButton />
      
      {/* Dynamic Animated Back To Top Button Layer */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-95 cursor-pointer"
            aria-label="Scroll to Top"
          >
            <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 blur-md transition-opacity duration-300 hover:opacity-100" />
            <ArrowUp className="h-5 w-5 relative z-10 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />

      <RequestModal
        open={openRequest}
        onClose={() => setOpenRequest(false)}
      />

    </div>
  );
};

export default Home;