import React, { useState, useEffect } from 'react';
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
  FileText,
  Settings
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
import SuiteWaffleMenu from './components/SuiteWaffleMenu';
import SettingsModal from './components/SettingsModal';
import { useSettings } from './utils/useSettings';

const resolveTab = (tab) => {
  if (!tab) return 'roster';
  const valid = ['roster', 'attendance', 'leave-claims', 'team', 'payroll', 'swaps', 'rules', 'mobile'];
  if (valid.includes(tab)) return tab;
  if (tab === 'leave' || tab === 'claims') return 'leave-claims';
  if (tab === 'directory') return 'team';
  return 'roster';
};

export default function App() {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('tab');
      return resolveTab(param);
    }
    return 'roster';
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const param = new URLSearchParams(window.location.search).get('tab');
      setActiveTab(resolveTab(param));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
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

  const handleRejectLeave = (id, reason) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { 
      ...l, 
      status: 'Rejected',
      rejectionReason: reason || 'Shift coverage constraints'
    } : l));
    showToast(reason ? `Leave declined with feedback: "${reason}"` : 'Leave request marked as declined.');
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

  const tabsList = [
    { id: 'roster', label: t('tabRoster'), icon: CalendarClock },
    { id: 'attendance', label: t('tabAttendance'), icon: Clock },
    { id: 'leave-claims', label: t('tabLeaveClaims'), icon: FileText },
    { id: 'team', label: t('tabTeam'), icon: Users },
    { id: 'payroll', label: t('tabPayroll'), icon: DollarSign },
    { id: 'swaps', label: t('tabSwaps'), icon: ArrowRightLeft },
    { id: 'rules', label: t('tabRules'), icon: ShieldCheck },
    { id: 'mobile', label: t('tabMobile'), icon: Smartphone }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col md:flex-row font-sans transition-colors duration-200 selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* DESKTOP SIDEBAR (Visible >= 768px) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 bg-black/90 backdrop-blur-xl border-r border-white/[0.08] transition-colors">
        <div className="flex flex-col h-full justify-between p-4">
          <div className="space-y-6">
            {/* Branding & Backlink */}
            <div>
              <a 
                href="https://ezibiz-hub.pages.dev" 
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors mb-3 px-2 py-1 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-white/[0.08]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('backToHub')}</span>
              </a>

              <div className="flex items-center gap-3 px-1">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 shadow-rim">
                  <Users className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-base text-zinc-100 tracking-tight block truncate">
                    EziBiz HRMS
                  </span>
                  <p className="text-[11px] text-zinc-400 font-mono truncate">
                    People & Operations
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {tabsList.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-zinc-100 font-semibold border border-white/[0.08] shadow-rim'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50 shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Sidebar Footer */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            <button 
              onClick={() => handleTabChange('mobile')}
              className={`w-full flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all shadow-rim cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-zinc-900 text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/30'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{t('mobileSimulator')}</span>
            </button>

            <div className="flex items-center justify-between px-1 pt-1">
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors cursor-pointer"
                title={t('settings')}
              >
                <Settings className="w-4 h-4 text-zinc-400" />
                <span>{t('settings')}</span>
              </button>

              <SuiteWaffleMenu currentApp="hrms" />
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR (Visible < 768px) */}
      <header className="md:hidden sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/[0.08] px-4 h-14 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <a 
            href="https://ezibiz-hub.pages.dev" 
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100"
            title={t('backToHub')}
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-zinc-100 tracking-tight truncate">
            EziBiz HRMS
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handleTabChange('mobile')}
            className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white text-xs font-medium"
          >
            {t('mobileShort')}
          </button>
          <SuiteWaffleMenu currentApp="hrms" />
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="md:pl-64 flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* KPI Dashboard Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim hover:border-white/[0.16] transition-all space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{t('kpiTeam')}</span>
              <div className="text-xl font-bold font-mono tabular-nums text-zinc-100">{employees.length} Staff</div>
              <p className="text-[11px] text-cyan-400 font-mono">{t('kpiTeamSub')}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim hover:border-white/[0.16] transition-all space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{t('kpiTimesheets')}</span>
              <div className="text-xl font-bold font-mono tabular-nums text-amber-400">
                {pendingTimesheetsCount} Pending
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">{t('kpiTimesheetsSub')}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim hover:border-white/[0.16] transition-all space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{t('kpiLeave')}</span>
              <div className="text-xl font-bold font-mono tabular-nums text-cyan-400">
                {pendingLeavesCount} Requests
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">{t('kpiLeaveSub')}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim hover:border-white/[0.16] transition-all space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{t('kpiPayroll')}</span>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-400">
                RM {payrollData.totalGross.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">{t('kpiPayrollSub')}</p>
            </div>
          </div>

          {/* Navigation Segmented Pills */}
          <div className="overflow-x-auto no-scrollbar pb-1">
            <div 
              role="tablist" 
              aria-label="HRMS Modules"
              className="inline-flex gap-1.5 p-1 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-rim min-w-max"
            >
              {tabsList.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const badge = tab.id === 'attendance' ? pendingTimesheetsCount : tab.id === 'leave-claims' ? pendingLeavesCount : 0;

                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-zinc-900 text-zinc-100 border border-white/[0.08] shadow-rim font-semibold' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                    {badge > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono text-[10px] font-semibold">
                        {badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                    )}
                  </button>
                );
              })}
            </div>
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
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible < 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 px-2 py-1 flex items-center justify-around h-16 transition-colors">
        <button
          onClick={() => handleTabChange('roster')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'roster' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <CalendarClock className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('tabRoster')}</span>
        </button>

        <button
          onClick={() => handleTabChange('attendance')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors relative ${
            activeTab === 'attendance' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('tabAttendance')}</span>
          {pendingTimesheetsCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center font-bold">
              {pendingTimesheetsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabChange('leave-claims')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors relative ${
            activeTab === 'leave-claims' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('tabLeaveClaims')}</span>
          {pendingLeavesCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] flex items-center justify-center font-bold">
              {pendingLeavesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabChange('payroll')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors ${
            activeTab === 'payroll' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <DollarSign className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('tabPayroll')}</span>
        </button>

        <button
          onClick={() => setShowSettingsModal(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="truncate">{t('settings')}</span>
        </button>
      </nav>

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

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-2xl text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
