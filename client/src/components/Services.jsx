import { useEffect, useState } from "react";
import api from "../api/axios";
import { Sparkles, Layers, ArrowRight, RefreshCw } from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/services");
      setServices(res.data.services || res.data);
    } catch (err) {
      console.error("Failed to load services:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-6 text-slate-100 sm:px-12 lg:px-24">
      {/* Subtle Background Ambient Glows */}

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-400 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> What We Do
          </div>
          <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Our Premium Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            Explore tailored solutions engineered to elevate your workflow, maximize efficiency, and scale your operations seamlessly.
          </p>
        </div>

        {/* Dynamic State Engine */}
        {loading ? (
          /* Loading Skeleton Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
                <div className="h-12 w-12 rounded-xl bg-slate-800" />
                <div className="mt-6 h-6 w-3/4 rounded bg-slate-800" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full rounded bg-slate-800" />
                  <div className="h-4 w-5/6 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center backdrop-blur-sm">
            <p className="text-lg font-medium text-red-400">Failed to connect to the server</p>
            <button
              onClick={fetchServices}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        ) : services.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30 p-16 text-center backdrop-blur-sm">
            <Layers className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-lg font-medium text-slate-400">No services available right now.</p>
            <p className="text-sm text-slate-500 mt-1">Check back later or contact support.</p>
          </div>
        ) : (
          /* Active Services Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:bg-slate-900/70 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]"
              >
                <div className="absolute -inset-px -z-10 bg-linear-to-br from-indigo-500/20 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-indigo-400 ring-1 ring-slate-700/50 transition-colors duration-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:ring-indigo-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-300">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {s.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase transition-all duration-300 group-hover:text-indigo-300 group-hover:gap-3">
                  Learn More 
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;