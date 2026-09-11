import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  ArrowRightLeft, 
  CheckCircle2, 
  FileText, 
  Upload, 
  ChevronRight 
} from 'lucide-react';

export default function MobileSimulator({ 
  clockedIn, 
  clockTime, 
  onClockToggle, 
  onViewPayslip,
  onApplyLeaveDemo 
}) {
  const [mobileTab, setMobileTab] = useState('punch');
  const [selectedLeaveType, setSelectedLeaveType] = useState('Medical Leave (MC)');
  const [leaveDays, setLeaveDays] = useState('1');
  const [leaveReason, setLeaveReason] = useState('Fever & flu - doctor advised bed rest');

  return (
    <div className="max-w-sm mx-auto rounded-[2.5rem] bg-slate-900 border-4 border-slate-700/80 p-5 space-y-4 shadow-2xl relative text-slate-100 ring-1 ring-white/10">
      {/* Phone Speaker & Camera Notch */}
      <div className="w-28 h-4 rounded-full bg-slate-950 mx-auto border border-slate-800 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
        <div className="w-8 h-1 rounded-full bg-slate-800"></div>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400 font-mono">
        <span>09:41 AM</span>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400">● 5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Employee Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Employee Self-Service (ESS)
          </span>
          <h4 className="text-sm font-bold text-white">Maya Rodriguez</h4>
          <p className="text-[11px] text-slate-400">Senior Barista • Store #1</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-xs">
          MR
        </div>
      </div>

      {/* Screen View Area */}
      <div className="min-h-[380px] bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
        {/* SUB-VIEW 1: GPS CLOCK IN / OUT */}
        {mobileTab === 'punch' && (
          <div className="space-y-4 text-center">
            {/* Geofence Status */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-left">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                <div>
                  <p className="font-semibold text-white text-[11px]">GPS Geofence: Inside</p>
                  <p className="text-[10px] text-slate-400">Store #1 • 3m accuracy</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                Verified
              </span>
            </div>

            {/* Circular Punch Button */}
            <div className="py-6 space-y-3">
              <button
                onClick={onClockToggle}
                className={`w-36 h-36 rounded-full mx-auto flex flex-col items-center justify-center transition-all shadow-2xl border-4 ${
                  clockedIn 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 hover:bg-rose-500/30 ring-4 ring-rose-500/10' 
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/30 hover:scale-105 ring-4 ring-emerald-500/10'
                }`}
              >
                <Clock className="w-7 h-7 mb-1" />
                <span className="font-bold text-sm">{clockedIn ? 'Punch Out' : 'Punch In'}</span>
                <span className="text-[10px] font-mono mt-0.5">{clockedIn ? 'Shift Active' : 'Ready'}</span>
              </button>

              {clockedIn && (
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono animate-in fade-in">
                  Clocked In at {clockTime}
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed">
              Auto-syncs timesheet to manager portal. Overtime rules applied if shift &gt; 8 hours.
            </p>
          </div>
        )}

        {/* SUB-VIEW 2: MY SHIFTS */}
        {mobileTab === 'shifts' && (
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-white">Upcoming Shifts</span>
              <span className="text-[10px] text-cyan-400 font-mono">Week 41</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Fri, Oct 11</span>
                  <span className="text-cyan-400 font-mono">07:00 - 15:00</span>
                </div>
                <p className="text-slate-400 text-[10px]">Espresso Bar 2 • 8.0 hrs</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Sat, Oct 12</span>
                  <span className="text-indigo-300 font-mono">14:00 - 22:00</span>
                </div>
                <p className="text-slate-400 text-[10px]">Espresso Bar 2 • 8.0 hrs</p>
                <div className="pt-1.5 border-t border-slate-800 flex justify-end">
                  <span className="text-[10px] text-cyan-400 font-medium flex items-center gap-1">
                    <ArrowRightLeft className="w-3 h-3" /> Swap Requested
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Mon, Oct 14</span>
                  <span className="text-slate-300 font-mono">07:00 - 15:00</span>
                </div>
                <p className="text-slate-400 text-[10px]">Morning Opening • 8.0 hrs</p>
              </div>
            </div>
          </div>
        )}

        {/* SUB-VIEW 3: APPLY LEAVE */}
        {mobileTab === 'leave' && (
          <div className="space-y-3 text-left text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Submit Leave / MC</span>
              <span className="text-[10px] text-cyan-400 font-mono">10 AL • 12 MC</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Leave Category</label>
                <select 
                  value={selectedLeaveType}
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white text-xs focus:outline-none"
                >
                  <option>Medical Leave (MC)</option>
                  <option>Annual Leave</option>
                  <option>Emergency Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Reason / Clinic Note</label>
                <input 
                  type="text"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white text-xs focus:outline-none"
                />
              </div>

              <div className="p-2 rounded-lg border border-dashed border-slate-700 bg-slate-900/60 text-center cursor-pointer hover:border-cyan-500 transition-colors">
                <Upload className="w-3.5 h-3.5 mx-auto text-cyan-400 mb-1" />
                <span className="text-[10px] text-slate-300">Tap to snap doctor MC slip</span>
              </div>

              <button
                onClick={() => onApplyLeaveDemo(selectedLeaveType, leaveReason)}
                className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-lg shadow-cyan-600/20"
              >
                Send Request to Manager
              </button>
            </div>
          </div>
        )}

        {/* SUB-VIEW 4: MY PAYSLIP */}
        {mobileTab === 'payslip' && (
          <div className="space-y-3 text-left text-xs">
            <span className="font-bold text-white">Latest Earnings</span>

            <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Estimated Take-Home</span>
              <div className="text-xl font-bold font-mono text-emerald-400">$1,486.75</div>
              <p className="text-[10px] text-slate-400">Oct 01 - Oct 15 Pay Run</p>
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Base Hours (80h)</span>
                <span className="text-white">$1,520.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-emerald-400">Overtime 1.5x (3h)</span>
                <span className="text-emerald-400">+$85.50</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-cyan-300">Health Claim</span>
                <span className="text-cyan-300">+$65.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-rose-400">EPF & Deductions</span>
                <span className="text-rose-400">-$183.75</span>
              </div>
            </div>

            <button
              onClick={() => onViewPayslip({ id: 'EMP-102', name: 'Maya Rodriguez', role: 'Senior Barista', rate: 19 })}
              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium transition-colors border border-slate-700 flex items-center justify-center gap-1"
            >
              <span>View Full Itemized Slip</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Phone Bottom Navigation Bar */}
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800 text-[10px]">
        {[
          { id: 'punch', label: 'Clock-In', icon: Clock },
          { id: 'shifts', label: 'Shifts', icon: Calendar },
          { id: 'leave', label: 'Leave', icon: FileText },
          { id: 'payslip', label: 'Pay', icon: DollarSign }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              className={`p-1.5 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                mobileTab === tab.id
                  ? 'text-cyan-400 font-semibold bg-cyan-500/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
