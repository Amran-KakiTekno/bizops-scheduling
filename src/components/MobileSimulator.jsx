import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Maximize2,
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
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'full';
    }
    return 'bezel'; // 'bezel' | 'full'
  });
  const [mobileTab, setMobileTab] = useState('punch');
  const [selectedLeaveType, setSelectedLeaveType] = useState('Medical Leave (MC)');
  const [leaveDays, setLeaveDays] = useState('1');
  const [leaveReason, setLeaveReason] = useState('Fever & flu - doctor advised bed rest');

  // Auto-switch to full view on mobile screen widths
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        setViewMode('full');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Viewport Switcher Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-rim">
        <div>
          <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-100">Employee Self-Service (ESS) Simulator</h3>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">Preview field staff clock-in, shift rosters, and leave submissions.</p>
        </div>

        {/* Viewport Switcher Button */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-xs shadow-sm dark:shadow-rim">
          <button
            onClick={() => setViewMode('bezel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'bezel'
                ? 'bg-white dark:bg-zinc-900 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/[0.08] shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Simulate realistic smartphone bezel frame"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Device Bezel Frame</span>
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'full'
                ? 'bg-white dark:bg-zinc-900 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/[0.08] shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Expand to full container mobile view"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Mobile View</span>
          </button>
        </div>
      </div>

      {/* Simulator Frame Container */}
      <div 
        className={`mx-auto transition-all duration-200 ${
          viewMode === 'full'
            ? 'w-full max-w-2xl rounded-2xl bg-zinc-950 border border-white/[0.08] p-4 sm:p-6 shadow-rim space-y-4 text-zinc-100'
            : 'w-full max-w-full sm:max-w-sm rounded-2xl sm:rounded-[2.5rem] bg-black border border-white/[0.14] sm:border-2 sm:border-white/[0.16] p-3 sm:p-5 space-y-4 shadow-2xl relative text-zinc-100 sm:ring-1 sm:ring-cyan-500/20'
        }`}
      >
        {/* Phone Speaker & Camera Notch: hidden on viewports below 640px or in Full Mobile View */}
        {viewMode === 'bezel' && (
          <div className="hidden sm:flex w-28 h-4 rounded-full bg-zinc-950 mx-auto border border-white/[0.08] items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-zinc-800 mr-2"></div>
            <div className="w-8 h-1 rounded-full bg-zinc-800"></div>
          </div>
        )}

        {/* Mobile Top Bar: simulated only on desktop bezel mode to prevent double status bar on real phones */}
        {viewMode === 'bezel' && (
          <div className="hidden sm:flex items-center justify-between border-b border-white/[0.08] pb-2 text-[10px] text-zinc-400 font-mono">
            <span>09:41 AM</span>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">● 5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Employee Greeting Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
              Employee Self-Service (ESS)
            </span>
            <h4 className="text-sm font-bold text-zinc-100">Maya Rodriguez</h4>
            <p className="text-[11px] text-zinc-400">Senior Barista • Store #1</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-xs shadow-rim">
            MR
          </div>
        </div>

        {/* Screen View Area */}
        <div className="min-h-[380px] bg-zinc-950/90 rounded-2xl border border-white/[0.08] p-4 flex flex-col justify-between shadow-rim">
          {/* SUB-VIEW 1: GPS CLOCK IN / OUT */}
          {mobileTab === 'punch' && (
            <div className="space-y-4 text-center">
              {/* Geofence Status */}
              <div className="p-2.5 rounded-xl bg-black/80 border border-white/[0.08] flex items-center justify-between text-xs text-left shadow-rim">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 motion-safe:animate-bounce" />
                  <div>
                    <p className="font-semibold text-zinc-100 text-[11px]">GPS Geofence: Inside</p>
                    <p className="text-[10px] text-zinc-500 font-mono">Store #1 • 3m accuracy</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono shadow-rim">
                  Verified
                </span>
              </div>

              {/* Circular Punch Button */}
              <div className="py-6 space-y-3">
                <button
                  onClick={onClockToggle}
                  className={`w-36 h-36 rounded-full mx-auto flex flex-col items-center justify-center transition-all shadow-2xl border-2 cursor-pointer ${
                    clockedIn 
                      ? 'bg-rose-500/15 border-rose-500/60 text-rose-400 hover:bg-rose-500/25 ring-4 ring-rose-500/10 shadow-rose-500/20' 
                      : 'bg-cyan-500/15 border-cyan-400 text-cyan-300 hover:bg-cyan-500/25 hover:scale-105 ring-4 ring-cyan-500/10 shadow-cyan-500/25'
                  }`}
                >
                  <Clock className="w-7 h-7 mb-1" />
                  <span className="font-bold text-sm">{clockedIn ? 'Punch Out' : 'Punch In'}</span>
                  <span className="text-[10px] font-mono mt-0.5">{clockedIn ? 'Shift Active' : 'Ready'}</span>
                </button>

                {clockedIn && (
                  <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono animate-in fade-in shadow-rim">
                    Clocked In at {clockTime}
                  </div>
                )}
              </div>

              <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
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
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white text-base sm:text-xs focus:outline-none"
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
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white text-base sm:text-xs focus:outline-none"
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
                <div className="text-xl font-bold font-mono text-emerald-400">RM 1,486.75</div>
                <p className="text-[10px] text-slate-400">Oct 01 - Oct 15 Pay Run</p>
              </div>

              <div className="space-y-1 text-[11px] font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Base Hours (80h)</span>
                  <span className="text-white">RM 1,520.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-emerald-400">Overtime 1.5x (3h)</span>
                  <span className="text-emerald-400">+RM 85.50</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-cyan-300">Health Claim</span>
                  <span className="text-cyan-300">+RM 65.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-rose-400">EPF & Deductions</span>
                  <span className="text-rose-400">-RM 183.75</span>
                </div>
              </div>

              <button
                onClick={() => onViewPayslip({ id: 'EMP-102', name: 'Maya Rodriguez', role: 'Senior Barista', rate: 19 })}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium transition-colors border border-slate-700 flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>View Full Itemized Slip</span>
                <ChevronRight className="w-3.5 h-3.5" />
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
                className={`p-2 sm:p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
                  mobileTab === tab.id
                    ? 'text-cyan-400 font-semibold bg-cyan-500/10'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
