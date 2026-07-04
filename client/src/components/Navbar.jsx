import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layers, ArrowUpRight, ShieldCheck, Home, Code2, Lock, Mail, X, Sparkles, MessageSquare, Menu } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Navbar = ({ onRequestClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // State Management for Modals, Menus, and Forms
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Track field inputs changes dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Intercept Admin Link Click
  const handleAdminClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setShowLoginModal(true);
  };

  // Reusable Smooth Scroll Handler for Anchor Links
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Execute Live API authentication pipeline
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful! Redirecting to Dashboard...");
      
      setShowLoginModal(false);
      setForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  // Structured Link Configuration Definitions
  const navigationLinks = [
    { label: "Home", type: "router", to: "/", icon: Home },
    { label: "Services", type: "anchor", target: "services", icon: Sparkles },
    { label: "Projects", type: "anchor", target: "projects", icon: Code2 },
    { label: "Testimonials", type: "anchor", target: "testimonials", icon: MessageSquare },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12 lg:px-24">
          
          {/* Brand Logo Container */}
          {/* Brand Logo Container */}
          <Link 
            to="/" 
            className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-3xl bg-slate-900/50 border border-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/30 overflow-hidden">
              <img 
                src="/logos.png" 
                alt="Nexora Solutions Logo" 
                className="h-full w-full object-contain p-0" 
              />
            </div>
            <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Nexora <span className="text-blue-400 font-medium text-sm tracking-wide">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation Elements */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-400">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              if (link.type === "router") {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`group relative flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors duration-300 hover:text-white ${
                      isActive(link.to) ? "text-white bg-slate-900/50" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={`#${link.target}`}
                  onClick={(e) => handleScrollToSection(e, link.target)}
                  className="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors duration-300 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}

            {/* Admin Link Layer */}
            <Link
              to="/admin"
              onClick={handleAdminClick}
              className={`group relative flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors duration-300 hover:text-white ${
                isActive("/admin") || showLoginModal ? "text-white bg-slate-900/50" : ""
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>

            {/* Separator Line & Action CTA */}
            <span className="mx-2 h-4 w-px bg-slate-800" />

            <button
              onClick={onRequestClick}
              className="group inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-400 uppercase backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-95 cursor-pointer"
            >
              Request Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Action Toggle Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 transition hover:text-white md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Interception Layer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-900 bg-slate-950/95 p-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-slate-400">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                if (link.type === "router") {
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl p-3 transition ${
                        isActive(link.to) ? "text-white bg-slate-900/60" : "hover:text-white hover:bg-slate-900/30"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={`#${link.target}`}
                    onClick={(e) => handleScrollToSection(e, link.target)}
                    className="flex items-center gap-2.5 rounded-xl p-3 transition hover:text-white hover:bg-slate-900/30"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}

              <Link
                to="/admin"
                onClick={handleAdminClick}
                className={`flex items-center gap-2.5 rounded-xl p-3 transition ${
                  showLoginModal ? "text-white bg-slate-900/60" : "hover:text-white hover:bg-slate-900/30"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Panel
              </Link>

              <div className="mt-2 h-px w-full bg-slate-900" />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestClick();
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-blue-600/10 cursor-pointer"
              >
                Request Project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MODAL POPUP CARD LOGIN SYSTEM */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-blue-600/10 blur-xl pointer-events-none" />

            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Admin Authentication</h3>
              <p className="mt-1 text-xs text-slate-400">Sign in to manage active services and requests.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@nexora.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-blue-500/50 focus:bg-slate-950 focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-blue-500/50 focus:bg-slate-950 focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-600/10 cursor-pointer"
              >
                {isLoading ? "Authenticating..." : "Access Control Dashboard"}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;