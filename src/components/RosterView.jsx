import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Users, AlertCircle, Plus, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RosterView({ 
  rosterDays, 
  selectedDay, 
  setSelectedDay, 
  dayShifts, 
  onSelectEmployee,
  leaveRequests 
}) {
  const [showAddShiftModal, setShowAddShiftModal] = useState(false);

  // Check if any employee is on approved leave today
  const activeLeaveToday = leaveRequests.filter(
    l => l.status === 'Approved' || (l.status === 'Pending' && l.type.includes('MC'))
  );

  const currentShifts = dayShifts[selectedDay] || [];
  const totalDayHours = currentShifts.reduce((acc, s) => acc + s.hours, 0);
  const totalDayCost = currentShifts.reduce((acc, s) => {
    const num = parseFloat(s.wage.replace('$', '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Day Selector Row */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
        {rosterDays.map(d => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedDay === d.day 
                ? 'bg-cyan-600/15 border-cyan-500 text-white shadow-lg shadow-cyan-600/10 ring-1 ring-cyan-500/30' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">{d.day}</span>
              <span className="text-[10px] text-slate-500 font-mono">{d.date}</span>
            </div>
            <div className="mt-2.5 space-y-0.5 text-[11px]">
              <p className="text-cyan-400 font-mono font-medium">{d.hours} hrs</p>
              <p className="text-slate-500">${d.cost}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Leave Warning Banner if active on selected day */}
      {selectedDay === 'Fri' && activeLeaveToday.length > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="font-semibold text-white">Coverage Alert:</strong> {activeLeaveToday[0].name} ({activeLeaveToday[0].role}) submitted urgent {activeLeaveToday[0].type}. Auto-flagged for replacement.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-[10px] font-mono whitespace-nowrap">
            Standby Roster Active
          </span>
        </div>
      )}

      {/* Shift List Container */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/40">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Scheduled Floor Shifts for {selectedDay}</h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {currentShifts.length} Team Members
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target shift hours: <span className="text-white font-mono">{totalDayHours}h</span> • Est. Labor Spend: <span className="text-emerald-400 font-mono">${totalDayCost.toFixed(0)}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Store #1 • Downtown Flagship
            </span>
          </div>
        </div>

        {/* Shift Items */}
        <div className="divide-y divide-slate-800/60 text-xs">
          {currentShifts.map((s) => (
            <div 
              key={s.id} 
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <button 
                  onClick={() => onSelectEmployee({ id: s.empId, name: s.name, role: s.role })}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-cyan-600/20 hover:border-cyan-500 border border-slate-700 flex items-center justify-center font-bold text-white text-xs transition-colors"
                  title="View full employee profile"
                >
                  {s.name[0]}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectEmployee({ id: s.empId, name: s.name, role: s.role })}
                      className="font-semibold text-white hover:text-cyan-300 transition-colors text-left"
                    >
                      {s.name}
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">({s.empId})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${s.badge}`}>
                      {s.role}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 text-[10px] border border-slate-700/60">
                      📍 {s.station}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 font-mono">
                <div className="text-left sm:text-right space-y-0.5">
                  <div className="flex items-center sm:justify-end gap-1.5 text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{s.time}</span>
                    <span className="text-slate-400 text-[11px]">({s.hours} hrs)</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Est. Cost: <span className="text-slate-300">{s.wage}</span></p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => onSelectEmployee({ id: s.empId, name: s.name, role: s.role })}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700"
                  >
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}

          {currentShifts.length === 0 && (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-600" />
              <p>No shifts assigned for this date yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
