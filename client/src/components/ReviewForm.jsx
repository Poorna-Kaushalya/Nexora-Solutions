import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Star, Send, Loader2 } from "lucide-react";

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: "",
    university: "",
    project: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingSelect = (ratingValue) => {
    setForm({ ...form, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Client-side Validation
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
    <div className="max-w-xl mx-auto border border-slate-900 bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-2xl p-6 md:p-8">
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Leave a Review
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Share your experience with Nexora Solutions. Your submission will go live after verification.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />
        </div>

        {/* University & Project Two-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="university"
            placeholder="University (Optional)"
            value={form.university}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />

          <input
            type="text"
            name="project"
            required
            placeholder="Project Name"
            value={form.project}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />
        </div>

        {/* Interactive Star Picker Element */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/30 border border-slate-800/60 rounded-xl">
          <span className="text-sm font-medium text-slate-400">Your Rating</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRatingSelect(star)}
                className="transition-transform duration-100 hover:scale-110 group focus:outline-none"
              >
                <Star
                  className={`h-5 w-5 stroke-1.5 transition-colors ${
                    star <= form.rating
                      ? "fill-amber-400 stroke-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                      : "stroke-slate-600 group-hover:stroke-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <textarea
            name="comment"
            required
            placeholder="Write an insightful description of your project experience..."
            value={form.comment}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
          />
        </div>

        {/* Submit Engine Button Element */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-medium py-3 rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.2)] transition duration-200 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying Request...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Review</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default ReviewForm;