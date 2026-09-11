import React from 'react';
import { ShieldCheck, Sliders, AlertTriangle } from 'lucide-react';

export default function ComplianceRulesView({ rules }) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Configurable Labor Compliance Engine</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rules are actively audited during shift assignment, mobile clock-in, and peer swap approvals.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          5 Active Guardrails
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {rules.map((r) => (
          <div 
            key={r.id} 
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">{r.title}</span>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/20 px-1.5 py-0.2 rounded">
                  {r.id}
                </span>
              </div>
              <p className="text-slate-400 text-xs">{r.desc}</p>
            </div>
            <span className="px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono font-semibold whitespace-nowrap self-start sm:self-auto text-xs shadow-inner">
              {r.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
