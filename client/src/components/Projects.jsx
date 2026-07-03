import { useEffect, useState } from "react";
import api from "../api/axios";
import { FolderGit2, ArrowUpRight, RefreshCw, Layers } from "lucide-react"; // npm i lucide-react

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-6 text-slate-100 sm:px-12 lg:px-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[128px]" />

      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-sm">
            <FolderGit2 className="h-3.5 w-3.5" /> Showcase
          </div>
          <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            A curated collection of digital experiences, engineered platforms, and architectural proofs built to redefine modern scale.
          </p>
        </div>

        {/* Dynamic State Management */}
        {loading ? (
          /* Loading Grid Skeleton */
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/50">
                <div className="h-44 bg-slate-800" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-1/3 rounded bg-slate-800" />
                  <div className="h-5 w-3/4 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-full rounded bg-slate-800" />
                    <div className="h-3.5 w-5/6 rounded bg-slate-800" />
                  </div>
                  <div className="pt-2 h-4 w-1/2 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error Retry Prompt UI */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center backdrop-blur-sm">
            <p className="text-lg font-medium text-red-400">Failed to connect to showcase index</p>
            <button
              onClick={fetchProjects}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> Reload Workspace
            </button>
          </div>
        ) : projects.length === 0 ? (
          /* Empty Pipeline UI */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30 p-16 text-center backdrop-blur-sm">
            <Layers className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-lg font-medium text-slate-400">No active deployments visible</p>
            <p className="text-sm text-slate-500 mt-1">Check back later or initiate a new pipeline run.</p>
          </div>
        ) : (
          /* Modernized Interactive Cards Grid Layout */
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {projects.map((p) => (
              <div
                key={p._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/30 hover:bg-slate-900/60 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]"
              >
                {/* Image Wrap & Top Glass Overlays */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag Overlay */}
                  <span className="absolute top-3 left-3 z-20 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-300 uppercase backdrop-blur-md border border-slate-800">
                    {p.category}
                  </span>
                </div>

                {/* Content Box layout structure */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base tracking-tight text-white transition-colors duration-200 group-hover:text-blue-400">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-blue-400" />
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {p.description}
                    </p>
                  </div>

                  {/* Clean Technical Tooling Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <span className="inline-flex items-center rounded-md bg-blue-500/5 px-2 py-1 text-[11px] font-medium text-blue-400 ring-1 ring-inset ring-blue-500/10">
                      {p.technology}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;