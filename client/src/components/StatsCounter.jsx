import { Layers, Cpu, Users, ShieldCheck } from "lucide-react";

const StatsCounter = () => {
  const stats = [
    { label: "Cluster Uptime Maintained", value: "99.9%", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Active Stacks Supported", value: "14+", icon: Cpu, color: "text-blue-400" },
    { label: "Production End-Users", value: "250k+", icon: Users, color: "text-indigo-400" },
    { label: "Codebase Health Score", value: "4.9/5", icon: Layers, color: "text-amber-400" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-2xl border border-slate-900 bg-slate-900/20 p-5 backdrop-blur-xs transition-colors duration-300 hover:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-2xl font-extrabold tracking-tight text-white font-mono sm:text-3xl">
                  {stat.value}
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-400 tracking-wide">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCounter;