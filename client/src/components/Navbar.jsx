import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layers, ArrowUpRight, ShieldCheck, Home, Lock, Mail, X } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Navbar = ({ onRequestClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // State Management for Modal and Forms
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    setShowLoginModal(true);
  };

  // Execute Live API authentication pipeline
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      // Save Token payload
      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful! Redirecting to Dashboard...");
      
      // Reset conditions and route away to admin board
      setShowLoginModal(false);
      setForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12 lg:px-24">
          
          {/* Brand Logo Container */}
          <Link 
            to="/" 
            className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Layers className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Nexora <span className="text-blue-400 font-medium text-sm tracking-wide">Solutions</span>
            </span>
          </Link>

          {/* Navigation Elements */}
          <div className="flex items-center gap-1 text-sm font-medium text-slate-400">
            
            {/* Home Link */}
            <Link
              to="/"
              className={`group relative flex items-center gap-1.5 rounded-lg px-4 py-2 transition-colors duration-300 hover:text-white ${
                isActive("/") ? "text-white bg-slate-900/50" : ""
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {/* Admin Link (Intercepted for popup card) */}
            <Link
              to="/admin"
              onClick={handleAdminClick}
              className={`group relative flex items-center gap-1.5 rounded-lg px-4 py-2 transition-colors duration-300 hover:text-white ${
                isActive("/admin") || showLoginModal ? "text-white bg-slate-900/50" : ""
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>

            {/* Separator Line */}
            <span className="mx-2 h-4 w-px bg-slate-800" />

            {/* Action Call to Action Button */}
            <button
              onClick={onRequestClick}
              className="group inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-400 uppercase backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-95"
            >
              Request Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            
          </div>
        </div>
      </nav>

      {/* MODAL POPUP CARD LOGIN SYSTEM */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()} // Stop modal from auto-closing when clicking input boxes
          >
            {/* Ambient accent background flare */}
            <div className="absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full bg-blue-600/10 blur-xl pointer-events-none" />

            {/* Close Modal Button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Identity */}
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Admin Authentication</h3>
              <p className="mt-1 text-xs text-slate-400">Sign in to manage active services and requests.</p>
            </div>

            {/* Form Inputs Engine */}
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
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-hidden transition focus:border-blue-500/50 focus:bg-slate-950 focus:ring-1 focus:ring-blue-500/50"
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
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-hidden transition focus:border-blue-500/50 focus:bg-slate-950 focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              {/* Submit Engine Execution Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-600/10"
              >
                {isLoading ? "Authenticating Matrix..." : "Access Control Dashboard"}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;