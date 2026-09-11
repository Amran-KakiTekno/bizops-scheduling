import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCheck, 
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

export default function AttendanceView({ 
  attendanceList, 
  onReconcileAll, 
  onReconcileSingle, 
  onSelectEmployee 
}) {
  const [filter, setFilter] = useState('all');

  const filteredList = attendanceList.filter(item => {
    if (filter === 'pending') return !item.reconciled;
    if (filter === 'reconciled') return item.reconciled;
    return true;
  });

  const activeOnShift = attendanceList.filter(a => a.status === 'On Shift').length;
  const pendingCount = attendanceList.filter(a => !a.reconciled).length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Currently On Floor</span>
          <div className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            {activeOnShift} Clocked In
          </div>
          <p className="text-[11px] text-slate-500">Live GPS ping verified</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Geofence Compliance</span>
          <div className="text-xl font-bold font-mono text-emerald-400">100% Passed</div>
          <p className="text-[11px] text-slate-500">Zero offsite punches detected</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Timesheets Pending Review</span>
          <div className="text-xl font-bold font-mono text-amber-400">{pendingCount} Records</div>
          <p className="text-[11px] text-slate-500">Scheduled vs actual comparison</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Punctuality Score</span>
          <div className="text-xl font-bold font-mono text-white">96.2%</div>
          <p className="text-[11px] text-slate-500">1 shift arrival &gt; 10m grace</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40">
          <div>
            <h3 className="text-sm font-semibold text-white">Timesheet Punch Audit & Reconciliation</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify mobile geofence punches against rostered hours before pushing to payroll.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Filter Pills */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button 
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
              >
                All ({attendanceList.length})
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'pending' ? 'bg-slate-800 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'}`}
              >
                Pending ({pendingCount})
              </button>
              <button 
                onClick={() => setFilter('reconciled')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'reconciled' ? 'bg-slate-800 text-emerald-300 font-medium' : 'text-slate-400 hover:text-white'}`}
              >
                Approved
              </button>
            </div>

            {pendingCount > 0 && (
              <button
                onClick={onReconcileAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-lg shadow-emerald-600/20"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Approve All</span>
              </button>
            )}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-800/70 text-xs">
          {filteredList.map((item) => (
            <div 
              key={item.id} 
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
            >
              {/* Employee & Shift */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectEmployee({ id: item.empId, name: item.name, role: item.role })}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-cyan-600/20 border border-slate-700 flex items-center justify-center font-bold text-white text-xs"
                >
                  {item.name[0]}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{item.name}</p>
                    <span className="text-[10px] font-mono text-slate-500">{item.shiftDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </div>

              {/* Hours Reconciliation Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Scheduled</span>
                  <p className="text-slate-200 mt-0.5">{item.scheduled}</p>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Clock Punch</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span className="text-white font-semibold">{item.actual}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Audit & Geofence</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="text-slate-300 text-[10px]">{item.geofence}</span>
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  item.isLate 
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                    : item.variance.includes('OT')
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {item.variance}
                </span>

                {item.reconciled ? (
                  <span className="text-emerald-400 text-xs flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approved for Payroll</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onReconcileSingle(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 hover:border-cyan-500 text-slate-200 text-xs transition-colors border border-slate-700 font-medium"
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
    </div>
  );
}
