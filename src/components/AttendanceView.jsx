import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCheck, 
  SlidersHorizontal,
  FileCheck,
  X
} from 'lucide-react';
import GeofenceRadarWidget from './GeofenceRadarWidget';

export default function AttendanceView({ 
  attendanceList, 
  onReconcileAll, 
  onReconcileSingle, 
  onSelectEmployee 
}) {
  const [filter, setFilter] = useState('all');
  const [showConfirmReconcile, setShowConfirmReconcile] = useState(false);

  useEffect(() => {
    if (!showConfirmReconcile) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowConfirmReconcile(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmReconcile]);

  const filteredList = attendanceList.filter(item => {
    if (filter === 'pending') return !item.reconciled;
    if (filter === 'reconciled') return item.reconciled;
    return true;
  });

  const activeOnShift = attendanceList.filter(a => a.status === 'On Shift').length;
  const pendingCount = attendanceList.filter(a => !a.reconciled).length;

  return (
    <div className="space-y-6">
      {/* Geofence Radar Widget & KPI Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <GeofenceRadarWidget />
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Currently On Floor</span>
            <div className="text-xl font-bold font-mono tabular-nums text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 motion-safe:animate-pulse"></span>
              {activeOnShift} Clocked In
            </div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">Live GPS ping verified</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Geofence Compliance</span>
            <div className="text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">100% Passed</div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">Zero offsite punches detected</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Pending Review</span>
            <div className="text-xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">{pendingCount} Records</div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">Scheduled vs actual comparison</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Punctuality Score</span>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-zinc-100">96.2%</div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">1 shift arrival &gt; 10m grace</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 dark:bg-black/40">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Timesheet Punch Audit & Reconciliation</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Verify mobile geofence punches against rostered hours before pushing to payroll.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Filter Pills */}
            <div className="flex bg-slate-100 dark:bg-black p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] text-[11px] shadow-sm">
              <button 
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer min-h-[44px] flex items-center ${filter === 'all' ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white font-medium border border-slate-200 dark:border-white/[0.08] shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                All ({attendanceList.length})
              </button>
              <button 
                onClick={() => setFilter('pending')}
                aria-pressed={filter === 'pending'}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer min-h-[44px] flex items-center ${filter === 'pending' ? 'bg-white dark:bg-zinc-900 text-amber-700 dark:text-amber-300 font-medium border border-slate-200 dark:border-white/[0.08] shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Pending ({pendingCount})
              </button>
              <button 
                onClick={() => setFilter('reconciled')}
                aria-pressed={filter === 'reconciled'}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer min-h-[44px] flex items-center ${filter === 'reconciled' ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-300 font-medium border border-slate-200 dark:border-white/[0.08] shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Approved
              </button>
            </div>

            {pendingCount > 0 && (
              <button
                onClick={() => setShowConfirmReconcile(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-md shadow-emerald-600/20 cursor-pointer min-h-[44px]"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Approve All</span>
              </button>
            )}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-200 dark:divide-white/[0.04] text-xs">
          {filteredList.map((item) => (
            <div 
              key={item.id} 
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors"
            >
              {/* Employee & Shift */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectEmployee({ id: item.empId, name: item.name, role: item.role })}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 dark:hover:bg-cyan-600/20 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-800 dark:text-white text-xs cursor-pointer"
                >
                  {item.name[0]}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <span className="text-[10px] font-mono text-slate-500">{item.shiftDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>

              {/* Hours Reconciliation Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Scheduled</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5">{item.scheduled}</p>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Clock Punch</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-slate-900 dark:text-white font-semibold">{item.actual}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Audit & Geofence</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-600 dark:text-slate-300 text-[10px]">{item.geofence}</span>
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800/60">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  item.isLate 
                    ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20' 
                    : item.variance.includes('OT')
                    ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}>
                  {item.variance}
                </span>

                {item.reconciled ? (
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approved for Payroll</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onReconcileSingle(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs transition-colors border border-slate-200 dark:border-slate-700 font-medium cursor-pointer"
                  >
                    Confirm & Lock
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredList.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <FileCheck className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p>No timesheets match the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Bulk Timesheet Reconciliation */}
      {showConfirmReconcile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirmReconcile(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reconcile-modal-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <CheckCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="reconcile-modal-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Confirm Bulk Timesheet Reconciliation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Batch approval for active pay period</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmReconcile(false)}
                aria-label="Close modal"
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-slate-900 dark:text-white font-medium mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                  Reconciling <strong className="text-cyan-700 dark:text-cyan-300 font-bold">{pendingCount}</strong> Pending Records
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Are you sure you want to approve and reconcile all <strong className="text-slate-900 dark:text-white">{pendingCount}</strong> pending timesheets in bulk?
                  Once approved, geofence punches, standard shift hours, and overtime variances will be locked and synchronized directly into active payroll.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-[11px] font-mono">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-sans">
                  <span>Batch Scope:</span>
                  <span className="text-slate-900 dark:text-white font-medium">All Unapproved Timesheets</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-sans">
                  <span>Pending Timesheets:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{pendingCount} Records</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-sans">
                  <span>Destination Ledger:</span>
                  <span className="text-cyan-600 dark:text-cyan-300">October Cycle 1 Payroll</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                You can also cancel and review individual employee timesheets before running bulk reconciliation.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmReconcile(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmReconcile(false);
                  onReconcileAll();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Confirm Reconciliation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
