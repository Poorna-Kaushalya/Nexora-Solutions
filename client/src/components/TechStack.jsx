import { Terminal } from "lucide-react";

const TechStack = () => {
  const stackCategories = [
    {
      title: "Frontend Engines",
      tools: [
        { name: "React", slug: "react", color: "61DAFB" },
        { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
        { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
        { name: "Kotlin", slug: "kotlin", color: "7F52FF" },
        { name: "Tailwind CSS", slug: "tailwindcss", color: "38BDF8" }
      ],
    },
    {
      title: "Backend & Storage",
      tools: [
        { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
        { name: "Python", slug: "python", color: "3776AB" },
        { name: "MongoDB", slug: "mongodb", color: "47A248" },
        { name: "PostgreSQL", slug: "postgresql" , color: "4169E1" },
        { name: "Firebase", slug: "firebase", color: "DD2C00" }
      ],
    },
    {
      title: "AI, ML & Hardware",
      tools: [
        { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
        { name: "ESP32 (IoT)", slug: "espressif", color: "E7352C" },
        { name: "Jupiter Notebook", slug: "jupyter", color: "F37626" },
        { 
          name: "Power BI", 
          slug: "power-bi", 
          color: "F2C811",
          // Precise local SVG path fallback to eliminate network dependencies completely
          customSvg: (
            <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="#F2C811">
              <path d="M11.25 0h3.375v24H11.25zM16.875 7.875H20.25V24h-3.375zM5.625 13.5H9V24H5.625z" />
            </svg>
          )
        }
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 py-20">
      {/* Header Section */}
      <div className="mb-16 flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5" /> Capabilities
        </div>
        <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          Engineered With Modern Stacks
        </h2>
        <div className="mt-3 h-[1px] w-12 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      {/* Categories Wrapper */}
      <div className="space-y-12">
        {stackCategories.map((cat, i) => (
          <div key={i} className="space-y-4">
            {/* Elegant Sub-Header */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold font-mono tracking-widest text-blue-500/80 uppercase">
                 {cat.title}
              </span>
              <div className="h-[2px] flex-1 bg-slate-900/80" />
            </div>
            
            {/* Elegant Responsive Grid */}
            <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {cat.tools.map((tool, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center justify-center rounded-xl border border-slate-900 bg-slate-950/40 p-4 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-1"
                  style={{
                    "--hover-border": `#${tool.color}35`
                  }}
                >
                  {/* Outer Ambient Aura Background */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10 pointer-events-none" 
                    style={{ backgroundColor: `#${tool.color}` }}
                  />

                  {/* Adaptive Custom Border Mask Fix */}
                  <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-500 group-hover:border-solid group-hover:border group-hover:border-[var(--hover-border)] pointer-events-none" />

                  {/* Icon Frame */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/30 border border-slate-900/80 p-3.5 transition-all duration-500 group-hover:bg-slate-900/10 group-hover:border-slate-800">
                    {tool.customSvg ? (
                      <div className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[2deg]">
                        {tool.customSvg}
                      </div>
                    ) : (
                      <img 
                        src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                        alt={`${tool.name} icon`}
                        className="h-8 w-8 shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[2deg]"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Typography Layer */}
                  <span className="mt-1 text-sm font-semibold tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-white">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;