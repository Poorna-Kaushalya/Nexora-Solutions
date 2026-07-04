import { useEffect, useState } from "react";
import api from "../api/axios";
import * as LucideIcons from "lucide-react";
import { Sparkles, Layers, RefreshCw } from "lucide-react";

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
      const rawData = res.data.services || res.data || [];
      
      const activeServices = Array.isArray(rawData) 
        ? rawData.filter(s => s.active !== false) 
        : [];
        
      setServices(activeServices);
    } catch (err) {
      console.error("Failed to load services:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (colorTheme) => {
    const themes = {
      indigo: { text: "text-indigo-400", bg: "bg-indigo-500", border: "border-indigo-500/30", glow: "bg-indigo-600/10" },
      emerald: { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30", glow: "bg-emerald-600/10" },
      amber: { text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30", glow: "bg-amber-600/10" },
      rose: { text: "text-rose-400", bg: "bg-rose-500", border: "border-rose-500/30", glow: "bg-rose-600/10" },
      cyan: { text: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/30", glow: "bg-cyan-600/10" },
    };
    return themes[colorTheme] || themes.indigo;
  };

  const ServiceIcon = ({ iconName }) => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <Layers className="h-5 w-5" />;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="services" className="relative overflow-hidden bg-slate-950 py-24 px-6 text-slate-100 sm:px-12 lg:px-24">
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Capabilities
          </div>
          <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Tailored Expert Solutions
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-12 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* Dynamic State Engine */}
        {loading ? (
          /* Uniform Loading Skeleton Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-slate-900 bg-slate-900/30 p-8 h-[380px]">
                <div className="h-12 w-12 rounded-xl bg-slate-900" />
                <div className="mt-8 h-6 w-2/3 rounded bg-slate-900" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full rounded bg-slate-900" />
                  <div className="h-4 w-4/5 rounded bg-slate-900" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5 p-12 text-center backdrop-blur-md">
            <p className="text-sm font-medium text-red-400">Failed to sync framework services</p>
            <button
              onClick={fetchServices}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Sync Repositories
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-900 bg-slate-900/10 p-16 text-center backdrop-blur-md">
            <Layers className="h-10 w-10 text-slate-700 mb-4" />
            <p className="text-sm font-medium text-slate-400">No capabilities initialized at this timestamp.</p>
          </div>
        ) : (
          /* Locked Sizing Grid - Same Height & Width across all items */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {services.map((s, index) => {
              const colorPool = ["indigo", "emerald", "amber", "rose", "cyan"];
              const assignedColor = s.colorTheme || colorPool[index % colorPool.length];
              const theme = getColorClasses(assignedColor);

              return (
                <div
                  key={s._id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-slate-950/20 min-h-[270px]"
                >
                  {/* Subtle Vector Background Pattern Grid lines */}
                  <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

                  {/* Individual Soft Ambient Flare behind the icon container */}
                  <div className={`absolute -top-12 -left-12 -z-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none ${theme.glow}`} />

                  {/* Absolute Glowing Border Outline */}
                  <div className={`absolute inset-0 rounded-2xl border border-solid border-transparent transition-all duration-500 pointer-events-none group-hover:${theme.border}`} />

                  <div>
                    {/* Modern Framed Fluid Icon Block */}
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/60 ring-1 ring-slate-900 border border-slate-800/50 transition-all duration-500 group-hover:bg-slate-900 group-hover:scale-105 ${theme.text}`}>
                      <ServiceIcon iconName={s.icon} />
                    </div>

                    <h3 className="mt-8 text-lg font-bold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-white">
                      {s.title}
                    </h3>
                    
                    {/* Added text-justify class for alignment */}
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-400 text-justify transition-colors duration-300 group-hover:text-slate-300">
                      {s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;