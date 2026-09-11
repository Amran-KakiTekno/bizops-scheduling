import React, { useState } from 'react';
import { 
  Users, 
  CalendarClock, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Smartphone, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Receipt, 
  ArrowRightLeft, 
  Sliders, 
  FileText 
} from 'lucide-react';

import { 
  initialEmployees, 
  initialRosterDays, 
  dayShiftsData, 
  initialAttendance, 
  initialLeaveRequests, 
  initialClaims, 
  initialPayrollCycle, 
  initialComplianceRules, 
  initialSwaps 
} from './data/mockData';

import RosterView from './components/RosterView';
import AttendanceView from './components/AttendanceView';
import LeaveClaimsView from './components/LeaveClaimsView';
import TeamDirectoryView from './components/TeamDirectoryView';
import PayrollView from './components/PayrollView';
import ShiftSwapsView from './components/ShiftSwapsView';
import ComplianceRulesView from './components/ComplianceRulesView';
import MobileSimulator from './components/MobileSimulator';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import PayslipModal from './components/PayslipModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('roster');
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [employees, setEmployees] = useState(initialEmployees);
  const [rosterDays, setRosterDays] = useState(initialRosterDays);
  const [dayShifts, setDayShifts] = useState(dayShiftsData);
  const [attendanceList, setAttendanceList] = useState(initialAttendance);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [claims, setClaims] = useState(initialClaims);
  const [payrollData, setPayrollData] = useState(initialPayrollCycle);
  const [complianceRules, setComplianceRules] = useState(initialComplianceRules);
  const [swapRequests, setSwapRequests] = useState(initialSwaps);

  // Mobile clock state
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState('06:58 AM');

  // Modals state
  const [selectedEmployeeForModal, setSelectedEmployeeForModal] = useState(null);
  const [selectedEmployeeForPayslip, setSelectedEmployeeForPayslip] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Clock toggle handler
  const handleClockToggle = () => {
    if (!clockedIn) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockTime(now);
      setClockedIn(true);
      showToast(`Punched In at ${now}! GPS Geofence verified (Downtown Flagship).`);
    } else {
      setClockedIn(false);
      showToast('Punched Out! Shift hours logged and sent for manager audit.');
    }
  };

  // Shift swap approval
  const handleApproveSwap = (id) => {
    setSwapRequests(prev => prev.map(s => s.id === id ? { ...s, approved: true } : s));
    showToast('Shift swap confirmed! Master schedule and timesheets synchronized.');
  };

  // Timesheet reconciliation
  const handleReconcileAll = () => {
    setAttendanceList(prev => prev.map(a => ({ ...a, reconciled: true })));
    showToast('All timesheets audited and locked into October Cycle 1 Payroll!');
  };

  const handleReconcileSingle = (id) => {
    setAttendanceList(prev => prev.map(a => a.id === id ? { ...a, reconciled: true } : a));
    showToast('Timesheet punch confirmed and locked for payroll.');
  };

  // Leave approvals
  const handleApproveLeave = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    showToast('Leave request approved! Standby shift roster notified.');
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    showToast('Leave request marked as declined.');
  };

  // Claim approvals
  const handleApproveClaim = (id) => {
    const claim = claims.find(c => c.id === id);
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    
    // Update payroll
    if (claim) {
      setPayrollData(prev => ({
        ...prev,
        totalGross: prev.totalGross + claim.amount,
        totalNet: prev.totalNet + claim.amount,
        employees: prev.employees.map(e => {
          if (e.name === claim.name) {
            return {
              ...e,
              claimsReimbursement: e.claimsReimbursement + claim.amount,
              grossTotal: e.grossTotal + claim.amount,
              netPay: e.netPay + claim.amount
            };
          }
          return e;
        })
      }));
    }
    showToast(`Claim approved! Added to next payroll disbursement.`);
  };

  // Payroll actions
  const handleExportPayroll = () => {
    showToast('Generated direct debit batch file (IBG/ACH-Format-202610.txt) ready for bank portal!');
  };

  const handleLockPayroll = () => {
    setPayrollData(prev => ({ ...prev, status: 'Locked & Disbursed' }));
    showToast('Payroll Cycle locked! Direct deposits scheduled via Bank ACH.');
  };

  // Mobile leave submit demo
  const handleApplyLeaveDemo = (type, reason) => {
    const newLeave = {
      id: `LV-${Date.now().toString().slice(-3)}`,
      empId: 'EMP-102',
      name: 'Maya Rodriguez',
      role: 'Senior Barista',
      type,
      dates: 'Tomorrow (1 Day)',
      reason,
      docAttached: type.includes('MC') ? 'Medical-Certificate-Upload.pdf' : null,
      appliedAt: 'Just now via Mobile',
      status: 'Pending',
      balanceLeft: '11 days remaining'
    };
    setLeaveRequests([newLeave, ...leaveRequests]);
    showToast('Leave submitted via Mobile ESS! Manager notified.');
  };

  const pendingLeavesCount = leaveRequests.filter(l => l.status === 'Pending').length;
  const pendingTimesheetsCount = attendanceList.filter(a => !a.reconciled).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="https://ezibiz-hub.pages.dev" 
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </a>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">EziBiz HRMS</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                HR & Workforce Ops
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('mobile')}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl transition-all shadow-lg ${
                activeTab === 'mobile'
                  ? 'bg-cyan-500 text-white shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-600/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile ESS Simulator</span>
            </button>
            <a 
              href="https://github.com/Amran-KakiTekno/ezibiz-hrms" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI Dashboard Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Total Enrolled Team</span>
            <div className="text-xl font-bold font-mono text-white">{employees.length} Active Staff</div>
            <p className="text-[11px] text-cyan-400 font-medium">Full-time & Part-time hourly</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Timesheets to Reconcile</span>
            <div className="text-xl font-bold font-mono text-amber-400">
              {pendingTimesheetsCount} Pending
            </div>
            <p className="text-[11px] text-slate-500">Live GPS punch audited</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Leave Approvals Pending</span>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {pendingLeavesCount} Requests
            </div>
            <p className="text-[11px] text-slate-500">Auto-syncs with shift calendar</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Estimated Pay Run (Cycle 1)</span>
            <div className="text-xl font-bold font-mono text-emerald-400">
              ${payrollData.totalGross.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </div>
            <p className="text-[11px] text-slate-500">Includes OT & verified claims</p>
          </div>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex border-b border-slate-800 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'roster', label: 'Roster & Shifts', icon: CalendarClock },
            { id: 'attendance', label: 'Attendance & Timesheets', icon: Clock, badge: pendingTimesheetsCount },
            { id: 'leave-claims', label: 'Leave & Claims', icon: FileText, badge: pendingLeavesCount },
            { id: 'team', label: 'Team Directory', icon: Users },
            { id: 'payroll', label: 'Payroll & Compensation', icon: DollarSign },
            { id: 'swaps', label: 'Peer Shift Swaps', icon: ArrowRightLeft },
            { id: 'rules', label: 'Labor Guardrails', icon: Sliders },
            { id: 'mobile', label: 'Mobile ESS View', icon: Smartphone }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 font-medium border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'border-cyan-500 text-white' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ROSTER & SHIFTS */}
        {activeTab === 'roster' && (
          <RosterView
            rosterDays={rosterDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            dayShifts={dayShifts}
            onSelectEmployee={(emp) => {
              const fullEmp = employees.find(e => e.id === emp.id) || emp;
              setSelectedEmployeeForModal(fullEmp);
            }}
            leaveRequests={leaveRequests}
          />
        )}

        {/* TAB 2: ATTENDANCE & TIMESHEETS */}
        {activeTab === 'attendance' && (
          <AttendanceView
            attendanceList={attendanceList}
            onReconcileAll={handleReconcileAll}
            onReconcileSingle={handleReconcileSingle}
            onSelectEmployee={(emp) => {
              const fullEmp = employees.find(e => e.id === emp.id) || emp;
              setSelectedEmployeeForModal(fullEmp);
            }}
          />
        )}

        {/* TAB 3: LEAVE & CLAIMS */}
        {activeTab === 'leave-claims' && (
          <LeaveClaimsView
            leaveRequests={leaveRequests}
            onApproveLeave={handleApproveLeave}
            onRejectLeave={handleRejectLeave}
            claims={claims}
            onApproveClaim={handleApproveClaim}
            onSelectEmployee={(emp) => {
              const fullEmp = employees.find(e => e.id === emp.id) || emp;
              setSelectedEmployeeForModal(fullEmp);
            }}
          />
        )}

        {/* TAB 4: TEAM DIRECTORY */}
        {activeTab === 'team' && (
          <TeamDirectoryView
            employees={employees}
            onSelectEmployee={(emp) => setSelectedEmployeeForModal(emp)}
            onViewPayslip={(emp) => setSelectedEmployeeForPayslip(emp)}
          />
        )}

        {/* TAB 5: PAYROLL & COMPENSATION */}
        {activeTab === 'payroll' && (
          <PayrollView
            payrollData={payrollData}
            onViewPayslip={(emp) => setSelectedEmployeeForPayslip(emp)}
            onExportPayroll={handleExportPayroll}
            onLockPayroll={handleLockPayroll}
          />
        )}

        {/* TAB 6: PEER SHIFT SWAPS */}
        {activeTab === 'swaps' && (
          <ShiftSwapsView
            swapRequests={swapRequests}
            onApproveSwap={handleApproveSwap}
          />
        )}

        {/* TAB 7: LABOR GUARDRAILS */}
        {activeTab === 'rules' && (
          <ComplianceRulesView rules={complianceRules} />
        )}

        {/* TAB 8: MOBILE SIMULATOR */}
        {activeTab === 'mobile' && (
          <MobileSimulator
            clockedIn={clockedIn}
            clockTime={clockTime}
            onClockToggle={handleClockToggle}
            onViewPayslip={(emp) => setSelectedEmployeeForPayslip(emp)}
            onApplyLeaveDemo={handleApplyLeaveDemo}
          />
        )}

      </main>

      {/* Global Slide-Over / Modals */}
      {selectedEmployeeForModal && (
        <EmployeeDetailModal
          employee={selectedEmployeeForModal}
          onClose={() => setSelectedEmployeeForModal(null)}
          onViewPayslip={(emp) => {
            setSelectedEmployeeForModal(null);
            setSelectedEmployeeForPayslip(emp);
          }}
        />
      )}

      {selectedEmployeeForPayslip && (
        <PayslipModal
          employee={selectedEmployeeForPayslip}
          payrollData={payrollData}
          onClose={() => setSelectedEmployeeForPayslip(null)}
        />
      )}

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-2xl text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
