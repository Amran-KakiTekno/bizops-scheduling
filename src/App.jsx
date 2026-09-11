import React, { useState } from 'react';
import { 
  CalendarClock, 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Smartphone, 
  MapPin, 
  Zap, 
  ArrowRightLeft, 
  ChevronRight, 
  Sliders,
  DollarSign
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('roster');
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Peer Swap Requests State
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 1,
      requester: 'Maya Rodriguez',
      requesterShift: 'Sat, Oct 12 (14:00 - 22:00)',
      requesterRole: 'Senior Barista',
      recipient: 'Jordan Kim',
      recipientShift: 'Sun, Oct 13 (08:00 - 16:00)',
      recipientRole: 'Senior Barista',
      reason: 'Family wedding attendance',
      compliance: {
        roleMatch: true,
        restPeriod: '14 hrs (Passes 11 hr min)',
        overtimeRisk: '0 hrs overtime added',
        status: 'Compliant'
      },
      approved: false
    },
    {
      id: 2,
      requester: 'Alex Chen',
      requesterShift: 'Fri, Oct 11 (18:00 - 02:00)',
      requesterRole: 'Kitchen Lead',
      recipient: 'Taylor Smith',
      recipientShift: 'Tue, Oct 15 (09:00 - 17:00)',
      recipientRole: 'Kitchen Lead',
      reason: 'Doctor appointment',
      compliance: {
        roleMatch: true,
        restPeriod: '26 hrs (Passes 11 hr min)',
        overtimeRisk: '0 hrs overtime added',
        status: 'Compliant'
      },
      approved: false
    }
  ]);

  const handleApproveSwap = (id) => {
    setSwapRequests(swapRequests.map(s => s.id === id ? { ...s, approved: true } : s));
    showToast('Shift swap approved! Master schedule & payroll updated.');
  };

  const handleClockIn = () => {
    if (!clockedIn) {
      const now = new Date().toLocaleTimeString();
      setClockTime(now);
      setClockedIn(true);
      showToast(`Punched In at ${now}! GPS Geofence verified (Downtown Store).`);
    } else {
      setClockedIn(false);
      showToast('Punched Out! Shift hours logged to payroll.');
    }
  };

  const rosterDays = [
    { day: 'Mon', date: 'Oct 07', shifts: 6, hours: 48, cost: '$960' },
    { day: 'Tue', date: 'Oct 08', shifts: 6, hours: 48, cost: '$960' },
    { day: 'Wed', date: 'Oct 09', shifts: 7, hours: 56, cost: '$1,120' },
    { day: 'Thu', date: 'Oct 10', shifts: 7, hours: 56, cost: '$1,120' },
    { day: 'Fri', date: 'Oct 11', shifts: 9, hours: 72, cost: '$1,440' },
    { day: 'Sat', date: 'Oct 12', shifts: 10, hours: 80, cost: '$1,600' },
    { day: 'Sun', date: 'Oct 13', shifts: 8, hours: 64, cost: '$1,280' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="https://bizops-portal.pages.dev" 
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </a>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <CalendarClock className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">BizOps Shifts</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Module 3
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('mobile')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/20"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Clock-In</span>
            </button>
            <a 
              href="https://github.com/Amran-KakiTekno/bizops-scheduling" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Total Weekly Hours</span>
            <div className="text-xl font-bold font-mono text-white">424 Hours</div>
            <p className="text-[11px] text-cyan-400 font-medium">16 active team members</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Overtime Violations</span>
            <div className="text-xl font-bold font-mono text-emerald-400">0 Hours ($0 Penalty)</div>
            <p className="text-[11px] text-slate-500">Enforced by shift guardrails</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Labor Cost % of Sales</span>
            <div className="text-xl font-bold font-mono text-emerald-400">21.8% Target</div>
            <p className="text-[11px] text-slate-500">Optimal margin zone</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Peer Swaps Auto-Mediated</span>
            <div className="text-xl font-bold font-mono text-cyan-300">12 Swaps</div>
            <p className="text-[11px] text-slate-500">Zero spreadsheet edits</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 text-xs">
          {[
            { id: 'roster', label: 'Weekly Roster & Hours' },
            { id: 'swaps', label: 'Peer Shift Swap Marketplace' },
            { id: 'mobile', label: 'Mobile Geo-Clock-In Simulator' },
            { id: 'rules', label: 'Overtime & Labor Guardrails' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-cyan-500 text-white' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Weekly Shift Roster */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            {/* Day Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
              {rosterDays.map(d => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedDay === d.day 
                      ? 'bg-cyan-600/15 border-cyan-500 text-white shadow-lg shadow-cyan-600/10' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{d.day}</span>
                    <span className="text-[10px] text-slate-500">{d.date}</span>
                  </div>
                  <div className="mt-2 space-y-0.5 text-[11px]">
                    <p className="text-cyan-400 font-mono">{d.hours} hrs</p>
                    <p className="text-slate-500">{d.cost}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Shift List for Selected Day */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Scheduled Shifts for {selectedDay}</h3>
                  <p className="text-xs text-slate-400">All shifts are verified against minimum rest and overtime rules.</p>
                </div>
                <span className="text-xs font-mono text-cyan-400">Store #1 • Downtown</span>
              </div>

              <div className="divide-y divide-slate-800/60 text-xs">
                {[
                  { name: 'Marcus Sterling', role: 'Floor Lead / Barista', time: '06:30 - 14:30 (8 hrs)', wage: '$160', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
                  { name: 'Maya Rodriguez', role: 'Senior Barista', time: '07:00 - 15:00 (8 hrs)', wage: '$152', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
                  { name: 'Alex Chen', role: 'Kitchen Prep Lead', time: '08:00 - 16:30 (8.5 hrs)', wage: '$170', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
                  { name: 'Jordan Kim', role: 'Barista / Register', time: '14:00 - 22:00 (8 hrs)', wage: '$144', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
                  { name: 'Taylor Smith', role: 'Closing Supervisor', time: '15:30 - 23:30 (8 hrs)', wage: '$176', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400' }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{s.name}</p>
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] border mt-0.5 ${s.badge}`}>
                          {s.role}
                        </span>
                      </div>
                    </div>

                    <div className="text-right space-y-0.5 font-mono">
                      <p className="text-white font-medium">{s.time}</p>
                      <p className="text-slate-500 text-[11px]">Est. Cost: {s.wage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Shift Swap Marketplace */}
        {activeTab === 'swaps' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <h3 className="text-sm font-semibold text-white">Peer Shift Swap Marketplace</h3>
              <p className="text-xs text-slate-400">
                Employees swap shifts directly on mobile. The system verifies certification matching, minimum rest hours, and overtime before approving.
              </p>
            </div>

            <div className="space-y-4">
              {swapRequests.map(swap => (
                <div key={swap.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">Swap Proposal #{swap.id}</span>
                      <span className="text-[10px] text-slate-400 italic">"{swap.reason}"</span>
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      swap.approved ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                    }`}>
                      {swap.approved ? 'Approved & Locked' : 'Pending Manager Confirmation'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                      <span className="text-slate-400 text-[11px]">Giving Away:</span>
                      <p className="font-semibold text-white">{swap.requester} ({swap.requesterRole})</p>
                      <p className="font-mono text-cyan-300">{swap.requesterShift}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                      <span className="text-slate-400 text-[11px]">Taking On:</span>
                      <p className="font-semibold text-white">{swap.recipient} ({swap.recipientRole})</p>
                      <p className="font-mono text-indigo-300">{swap.recipientShift}</p>
                    </div>
                  </div>

                  {/* Automated Compliance Guardrail Checks */}
                  <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Role Skill Match</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{swap.compliance.restPeriod}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{swap.compliance.overtimeRisk}</span>
                      </div>
                    </div>

                    {!swap.approved ? (
                      <button
                        onClick={() => handleApproveSwap(swap.id)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
                      >
                        1-Click Approve Swap
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Schedule Synchronized</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Mobile Geo-Clock-In Simulator */}
        {activeTab === 'mobile' && (
          <div className="max-w-md mx-auto rounded-3xl bg-slate-900 border-4 border-slate-800 p-6 space-y-6 shadow-2xl relative">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 rounded-full bg-slate-950 mx-auto border border-slate-800"></div>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                Employee Mobile View
              </span>
              <h4 className="text-base font-bold text-white">Downtown Location Punch</h4>
              <p className="text-xs text-slate-400">Maya Rodriguez • Senior Barista</p>
            </div>

            {/* Geofence Status */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                <div>
                  <p className="font-semibold text-white">GPS Geofence: Inside</p>
                  <p className="text-[11px] text-slate-400">Store #1 • 3m accuracy</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                Verified
              </span>
            </div>

            {/* Big Punch In Button */}
            <div className="text-center py-4 space-y-4">
              <button
                onClick={handleClockIn}
                className={`w-40 h-40 rounded-full mx-auto flex flex-col items-center justify-center transition-all shadow-2xl border-4 ${
                  clockedIn 
                    ? 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30' 
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/30 hover:scale-105'
                }`}
              >
                <Clock className="w-8 h-8 mb-1" />
                <span className="font-bold text-base">{clockedIn ? 'Punch Out' : 'Punch In'}</span>
                <span className="text-[11px] font-mono mt-0.5">{clockedIn ? 'Shift in Progress' : 'Ready'}</span>
              </button>

              {clockedIn && (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  Clocked In at {clockTime}
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Geofence prevents offsite punches. Real-time notifications alert managers if a shift is delayed by &gt; 10 mins.
            </p>
          </div>
        )}

        {/* Tab 4: Overtime Guardrails */}
        {activeTab === 'rules' && (
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white">Configurable Labor Compliance Engine</h3>
              <p className="text-xs text-slate-400">Rules are checked before any roster publish or shift swap approval.</p>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { title: 'Maximum Regular Weekly Hours', val: '40 hrs / week', desc: 'Any schedule exceeding 40 hours triggers 1.5x overtime wage alerts.' },
                { title: 'Mandatory Rest Period Between Shifts', val: '11 Hours Minimum', desc: 'Blocks closing-to-opening ("clopening") shift assignments automatically.' },
                { title: 'Mandatory Meal Break Threshold', val: '30 mins after 5 hrs', desc: 'Auto-schedules required breaks based on state labor compliance.' },
                { title: 'Geofence Radius Lock', val: '50 Meters', desc: 'Employees must be within physical store boundary to clock in.' }
              ].map((r, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-white">{r.title}</p>
                    <p className="text-slate-400">{r.desc}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono font-semibold whitespace-nowrap">
                    {r.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
