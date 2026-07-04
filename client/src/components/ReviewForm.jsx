import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Star, Send, Loader2, User, GraduationCap, Laptop, MessageSquare } from "lucide-react";

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: "",
    university: "",
    project: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingSelect = (ratingValue) => {
    setForm({ ...form, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.project.trim() || !form.comment.trim()) {
      return toast.error("Please fill out all required fields.");
    }

    setIsSubmitting(true);
    try {
      await api.post("/reviews", form);
      toast.success("Review submitted for approval!");

      setForm({
        name: "",
        university: "",
        project: "",
        rating: 5,
        comment: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-xl mx-auto border border-slate-900 bg-slate-950/40 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.4)] rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Decorative top-right accent ambient glow */}
      <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
          Leave a Review
        </h2>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Share your experience with Nexora Solutions. Your submission will go live after verification.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Field */}
        <div>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors" />
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-900 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-hidden transition duration-200 focus:border-blue-500/40 focus:bg-slate-950/90 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>
        </div>

        {/* University & Project Two-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <GraduationCap className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              name="university"
              placeholder="University (Optional)"
              value={form.university}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-900 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-hidden transition duration-200 focus:border-blue-500/40 focus:bg-slate-950/90 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <div className="relative">
            <Laptop className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              name="project"
              required
              placeholder="Project Name"
              value={form.project}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-900 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-hidden transition duration-200 focus:border-blue-500/40 focus:bg-slate-950/90 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>
        </div>

        {/* Interactive Star Picker Element */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/30 border border-slate-900 rounded-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Rating</span>
          <div className="flex items-center gap-1.5" onMouseLeave={() => setHoveredStar(null)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRatingSelect(star)}
                onMouseEnter={() => setHoveredStar(star)}
                className="transition-transform duration-150 hover:scale-110 focus:outline-hidden"
              >
                <Star
                  className={`h-4.5 w-4.5 stroke-1.5 transition-all duration-150 ${
                    star <= (hoveredStar ?? form.rating)
                      ? "fill-amber-400 stroke-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                      : "stroke-slate-700"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />
          <textarea
            name="comment"
            required
            placeholder="Write an insightful description of your project experience..."
            value={form.comment}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-900 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-hidden transition duration-200 focus:border-blue-500/40 focus:bg-slate-950/90 focus:ring-1 focus:ring-blue-500/30 resize-none"
          />
        </div>

        {/* Submit Button Element */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying Framework...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Submit Review</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default ReviewForm;