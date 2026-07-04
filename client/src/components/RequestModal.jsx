import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { X, Calendar, Send, Loader2, Sparkles } from "lucide-react";

const RequestModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    projectTitle: "",
    deadline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Native Escape key overlay dismissal hook
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side execution guard
    if (!form.name.trim() || !form.email.trim() || !form.projectTitle.trim()) {
      return toast.error("Please fill in all core operational fields.");
    }

    setIsSubmitting(true);
    try {
      await api.post("/requests", form);
      toast.success("Project proposal routed successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        university: "",
        projectTitle: "",
        deadline: "",
        description: "",
      });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit proposal infrastructure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-900 bg-slate-950 p-6 shadow-2xl transition-all md:p-8"
        onClick={(e) => e.stopPropagation()} // Stop menu closure on form interaction clickthroughs
      >
        
        {/* Modal Window Header segment */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Request Architecture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Submit your specs to start development workflows.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-900 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Core Input Pipeline Form Engine */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            <input 
              name="name" 
              required
              placeholder="Your Name" 
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm" 
            />

            <input 
              type="email"
              name="email" 
              required
              placeholder="Email Address" 
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm" 
            />

            <input 
              type="tel"
              name="phone" 
              placeholder="Phone Number (Optional)" 
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm" 
            />

            <input 
              name="university" 
              placeholder="Institution / Affiliation" 
              value={form.university}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm" 
            />

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <input 
                name="projectTitle" 
                required
                placeholder="Project Definition Title" 
                value={form.projectTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm" 
              />
            </div>

            {/* Structured Date Interface Wrapper */}
            <div className="relative flex items-center">
              <Calendar className="absolute left-3.5 h-4 w-4 text-slate-600 pointer-events-none" />
              <input 
                type="date" 
                name="deadline" 
                value={form.deadline}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm scheme-dark cursor-pointer" 
              />
            </div>
          </div>

          <div>
            <textarea 
              name="description" 
              required
              placeholder="Describe your design parameters, technology dependencies, and functional targets..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none text-sm min-h-22.5" 
            />
          </div>

          {/* Action Trigger Row */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 px-4 py-2.5 border border-slate-800 hover:bg-slate-900 text-slate-400 font-medium rounded-xl transition text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.15)] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Configuring Route...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Transmit Proposal</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default RequestModal;