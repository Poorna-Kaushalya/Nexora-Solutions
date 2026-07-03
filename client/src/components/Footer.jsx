import { Link } from "react-router-dom";
import { Layers, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Home", href: "/" },
      { name: "Services", href: "#services" },
      { name: "Projects", href: "#projects" },
    ],
    governance: [
      { name: "Admin Portal", href: "/admin" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="relative border-t border-slate-900 bg-slate-950 px-6 pt-16 pb-8 text-slate-400 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Segment */}
        <div className="grid gap-10 md:grid-cols-4 lg:gap-16">
          
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Nexora <span className="text-blue-400 font-medium text-xs tracking-wider uppercase">Solutions</span>
              </span>
            </Link>
            
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Architecting next-generation digital frameworks. Engineered for scale, speed, and absolute delivery velocity.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span>Build</span><span>•</span><span>Learn</span><span>•</span><span>Succeed</span>
            </div>
          </div>

          {/* Links Grid 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="transition-colors duration-200 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Grid 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">System</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.governance.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-white">
                    {link.name}
                    {link.href.startsWith("http") && <ArrowUpRight className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Structural Horizontal Divider */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Copyright String */}
          <p className="text-xs text-slate-600 order-2 sm:order-1">
            © {currentYear} Nexora Solutions. All rights reserved. Built with precision.
          </p>

          {/* Modern Social Vector Nodes */}
          <div className="flex items-center gap-4 order-1 sm:order-2">
            
            {/* Inline X / Twitter SVG */}
            <a href="#" className="rounded-lg border border-slate-900 bg-slate-900/40 p-2 text-slate-500 hover:border-slate-800 hover:text-white transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            
            {/* Inline GitHub SVG */}
            <a href="#" className="rounded-lg border border-slate-900 bg-slate-900/40 p-2 text-slate-500 hover:border-slate-800 hover:text-white transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Inline LinkedIn SVG */}
            <a href="#" className="rounded-lg border border-slate-900 bg-slate-900/40 p-2 text-slate-500 hover:border-slate-800 hover:text-white transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;