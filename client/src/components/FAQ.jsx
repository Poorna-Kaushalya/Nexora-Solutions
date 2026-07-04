import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Who owns the intellectual property and code of the completed project?",
      a: "You retain 100% full ownership of the source code, research documents, and implementation assets. Everything we construct is handed over to you as a clean, production-ready system to support your final submission or presentation."
    },
    {
      q: "How fast will I receive a reply after submitting a project request?",
      a: "We understand deadlines are critical. Our core engineering and research teams review your project guidelines immediately, providing a comprehensive structural response, timeline evaluation, and feasibility breakdown within 12 to 24 hours."
    },
    {
      q: "Can you assist with complex research documentation and system architecture?",
      a: "Yes, absolutely. We bridge the gap between technical execution and detailed reporting. We assist in mapping out complex architectures, configuring deep learning networks, data analytics, and providing clean technical explanations for your methodology chapters."
    },
    {
      q: "Can your team step in to fix a broken project or incomplete code?",
      a: "Yes. If your project has failing test suites, unoptimized algorithms, or outdated libraries, our team can audit the existing repository, refactor the codebase, and align it with your project requirements perfectly."
    }
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-sm">
          <HelpCircle className="h-3.5 w-3.5" /> FAQ
        </div>
        <h2 className="mt-4 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
          Project & Research Support FAQ
        </h2>
        <div className="mt-3 h-[1px] w-12 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      {/* Accordion Wrapper */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="rounded-xl border border-slate-900 bg-slate-900/20 overflow-hidden transition-all duration-300 hover:border-slate-800/80"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-slate-200 cursor-pointer transition-colors duration-300 hover:text-white"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : ""}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-56 border-t border-slate-900/60" : "max-h-0"
                }`}
              >
                <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/40">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;