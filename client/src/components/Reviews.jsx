import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { MessageSquareQuote, Star, RefreshCw, User2, ChevronLeft, ChevronRight } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Slider Carousel Track States
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    fetchReviews();
    return () => stopAutoPlay();
  }, []);

  // Restart auto-play timer whenever data changes or user interacts manually
  useEffect(() => {
    if (reviews.length > 3) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [currentIndex, reviews]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/reviews");
      const parsed = res.data.reviews || res.data || [];
      // Only display approved reviews to the public
      const approvedOnly = Array.isArray(parsed) ? parsed.filter(r => r.approved) : [];
      setReviews(approvedOnly);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // --- CAROUSEL TRACK CONTROLLERS ---
  const maxIndex = Math.max(0, reviews.length - 3);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Transitions automatically every 5 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handlePrev = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-6 text-slate-100 sm:px-12 lg:px-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-[128px]" />

      <div className="mx-auto max-w-7xl">
        
        {/* Header Section (Centered) */}
        <div className="mb-16 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-sm">
            <MessageSquareQuote className="h-3.5 w-3.5" /> Testimonials
          </div>
          <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Trusted By Innovators
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg max-w-2xl">
            See how scaling teams leverage our architectural frameworks to accelerate their velocity and delivery timelines.
          </p>

          {/* Action Trigger Arrows (Centered below text block if more than 3 reviews exist) */}
          {!loading && !error && reviews.length > 3 && (
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900 bg-slate-900/40 text-slate-400 transition-all hover:border-slate-700 hover:text-white hover:bg-slate-900 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900 bg-slate-900/40 text-slate-400 transition-all hover:border-slate-700 hover:text-white hover:bg-slate-900 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic State Management */}
        {loading ? (
          /* Loading Skeleton Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-slate-900 bg-slate-900/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-slate-800" />
                  <div className="h-4 w-16 rounded bg-slate-800" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3.5 w-full rounded bg-slate-800" />
                  <div className="h-3.5 w-5/6 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error UI */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center backdrop-blur-sm">
            <p className="text-lg font-medium text-red-400">Failed to stream feedback indexes</p>
            <button
              onClick={fetchReviews}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          /* Empty Pipeline UI */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30 p-16 text-center backdrop-blur-sm">
            <MessageSquareQuote className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-lg font-medium text-slate-400">No client ledger logs available</p>
          </div>
        ) : (
          /* Slider Container with Masking Viewport Frame */
          <div className="relative overflow-hidden w-full pb-4">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(calc(-${currentIndex * 33.3333}% - ${currentIndex * 16}px))`,
              }}
            >
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="w-full shrink-0 md:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)] group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/70 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.02)]"
                >
                  <div>
                    {/* Rating Stack & Accent Quote Mark */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-3.5 w-3.5 ${
                              index < (r.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-800 fill-slate-800"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <span className="text-2xl font-serif text-slate-800 select-none group-hover:text-blue-500/20 transition-colors duration-300">
                        “
                      </span>
                    </div>

                    {/* Comment Context */}
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 min-h-[4.5rem] line-clamp-4">
                      "{r.comment || r.reviewText || "No review statement recorded"}"
                    </p>
                  </div>

                  {/* User Identity Banner */}
                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-900/60">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700/50 text-slate-400">
                      <User2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold tracking-wide text-white">
                        {r.name || "Anonymous Client"}
                      </h3>
                      <p className="text-[11px] text-slate-500">Verified Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Navigation Dot Track indicators */}
            {reviews.length > 3 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {[...Array(maxIndex + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { stopAutoPlay(); setCurrentIndex(i); }}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      currentIndex === i ? "w-6 bg-blue-500" : "w-1.5 bg-slate-800 hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;