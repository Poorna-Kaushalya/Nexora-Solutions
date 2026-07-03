import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ReviewForm from "../components/ReviewForm";
import RequestModal from "../components/RequestModal";

// Reusable scroll-fade animation preset
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

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-150 w-250 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />

      {/* Navigation Engine */}
      <Navbar onRequestClick={() => setOpenRequest(true)} />

      {/* Hero Showcase Block */}
      <Hero />

      {/* Services Section Framework */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="-py-10" 
      >
        <Services />
      </motion.div>

      {/* Projects Grid Display */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-0 "
      >
        {/* Secondary subtle background glow split between sections */}
        <div className="absolute top-1/2 left-0 -z-10 h-100 w-100 bg-indigo-500/05 blur-[120px] pointer-events-none rounded-full" />
        <Projects />
      </motion.div>

      {/* Social Proof & Feedback Engine */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="py-6 md:py-10" 
      >
        <Reviews />
        <div className="mt-2 px-6"> 
          <ReviewForm />
        </div>
      </motion.div>

      {/* Floating Utilities */}
      <WhatsAppButton />
      
      {/* Footer System Anchor */}
      <Footer />

      {/* Structural Interactive Request Flyout */}
      <RequestModal
        open={openRequest}
        onClose={() => setOpenRequest(false)}
      />

    </div>
  );
};

export default Home;