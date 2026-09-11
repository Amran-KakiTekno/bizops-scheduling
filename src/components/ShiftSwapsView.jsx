import React from 'react';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';

export default function ShiftSwapsView({ swapRequests, onApproveSwap }) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Peer Shift Swap Marketplace</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Employees swap shifts directly on mobile. The system verifies certification matching, minimum 11-hour rest periods, and overtime risks before manager confirmation.
        </p>
      </div>

      <div className="space-y-4">
        {swapRequests.map(swap => (
          <div key={swap.id} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Swap Proposal #{swap.id}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 italic">"{swap.reason}"</span>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                swap.approved ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400'
              }`}>
                {swap.approved ? 'Approved & Locked' : 'Pending Manager Confirmation'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Giving Away:</span>
                <p className="font-semibold text-slate-900 dark:text-white">{swap.requester} ({swap.requesterRole})</p>
                <p className="font-mono text-cyan-600 dark:text-cyan-300">{swap.requesterShift}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Taking On:</span>
                <p className="font-semibold text-slate-900 dark:text-white">{swap.recipient} ({swap.recipientRole})</p>
                <p className="font-mono text-indigo-600 dark:text-indigo-300">{swap.recipientShift}</p>
              </div>
            </div>

            {/* Automated Compliance Guardrail Checks */}
            <div className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Role Skill Match</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{swap.compliance.restPeriod}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{swap.compliance.overtimeRisk}</span>
                </div>
              </div>

              {!swap.approved ? (
                <button
                  onClick={() => onApproveSwap(swap.id)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-lg shadow-cyan-600/20"
                >
                  1-Click Approve Swap
                </button>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Schedule Synchronized</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
