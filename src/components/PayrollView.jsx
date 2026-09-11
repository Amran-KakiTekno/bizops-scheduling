import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Clock, 
  Receipt, 
  Download, 
  Lock, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
  X 
} from 'lucide-react';

export default function PayrollView({ 
  payrollData, 
  onViewPayslip, 
  onExportPayroll, 
  onLockPayroll 
}) {
  const { cycleName, status, totalGross, totalNet, totalOvertimeHours, totalRegularHours, employees } = payrollData;
  const [showLockModal, setShowLockModal] = useState(false);

  useEffect(() => {
    if (!showLockModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowLockModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showLockModal]);

  return (
    <div className="space-y-6">
      {/* Pay Cycle Status Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">{cycleName}</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated from verified timesheet geo-punches, overtime guardrail rules, and approved employee expense claims.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportPayroll}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Bank Batch File (IBG/ACH)</span>
          </button>
          <button
            onClick={() => setShowLockModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock & Disburse</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Gross Payroll</span>
          <div className="text-xl font-bold font-mono text-white">RM {totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-[11px] text-slate-500">Regular + Overtime + Claims</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Net Disbursed</span>
          <div className="text-xl font-bold font-mono text-emerald-400">RM {totalNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-[11px] text-emerald-500/80 font-medium">After statutory withholdings</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Overtime Hours</span>
          <div className="text-xl font-bold font-mono text-cyan-400">{totalOvertimeHours} Hours</div>
          <p className="text-[11px] text-slate-500">Auto-calculated at 1.5x standard</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Statutory Compliance</span>
          <div className="text-xl font-bold font-mono text-white">Audited</div>
          <p className="text-[11px] text-slate-500">EPF 11%, SOCSO & tax ready</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div>
            <h4 className="text-sm font-semibold text-white">Employee Compensation Ledger</h4>
            <p className="text-xs text-slate-400">Click any employee row to preview or print their digital payslip.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{employees.length} Enrolled Staff</span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 text-[10px] uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Employee</th>
                <th className="p-3.5">Base Rate</th>
                <th className="p-3.5">Regular Hrs</th>
                <th className="p-3.5">Overtime (1.5x)</th>
                <th className="p-3.5">Claims</th>
                <th className="p-3.5">Gross Pay</th>
                <th className="p-3.5">Withholdings</th>
                <th className="p-3.5">Net Payout</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono text-[11px]">
              {employees.map(emp => (
                <tr key={emp.empId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-sans">
                    <p className="font-semibold text-white">{emp.name}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{emp.empId} • {emp.role}</span>
                  </td>
                  <td className="p-3.5 text-slate-300">RM {emp.baseRate.toFixed(2)}/hr</td>
                  <td className="p-3.5 text-slate-300">{emp.regularHours.toFixed(1)} hrs</td>
                  <td className="p-3.5">
                    {emp.otHours > 0 ? (
                      <span className="text-cyan-300 font-medium">
                        {emp.otHours.toFixed(1)} hrs (RM {emp.otPay.toFixed(2)})
                      </span>
                    ) : (
                      <span className="text-slate-500">0.0 hrs</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {emp.claimsReimbursement > 0 ? (
                      <span className="text-emerald-400">+RM {emp.claimsReimbursement.toFixed(2)}</span>
                    ) : (
                      <span className="text-slate-500">RM 0.00</span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-white">RM {emp.grossTotal.toFixed(2)}</td>
                  <td className="p-3.5 text-rose-400">-RM {emp.statutoryDeductions.toFixed(2)}</td>
                  <td className="p-3.5 font-bold text-emerald-400 text-xs">RM {emp.netPay.toFixed(2)}</td>
                  <td className="p-3.5 text-right font-sans">
                    <button
                      onClick={() => onViewPayslip({ id: emp.empId, name: emp.name, role: emp.role, rate: emp.baseRate })}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600/20 hover:border-cyan-500 text-cyan-300 border border-slate-700 text-xs transition-colors"
                    >
                      Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Compensation Cards */}
        <div className="md:hidden divide-y divide-slate-800/60">
          {employees.map(emp => (
            <div key={emp.empId} className="p-4 space-y-3 bg-slate-900/50">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h5 className="font-semibold text-white text-sm truncate">{emp.name}</h5>
                  <p className="text-[11px] text-slate-400 font-mono">{emp.empId} • {emp.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Net Payout</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">RM {emp.netPay.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Gross Pay</span>
                  <span className="text-white font-semibold">RM {emp.grossTotal.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Base Rate</span>
                  <span className="text-slate-300">RM {emp.baseRate.toFixed(2)}/hr</span>
                </div>
                <div className="col-span-2 pt-1.5 border-t border-slate-900 flex flex-wrap gap-2 text-[11px]">
                  <span className="text-slate-400">Regular: <strong className="text-slate-200">{emp.regularHours.toFixed(1)}h</strong></span>
                  {emp.otHours > 0 && (
                    <span className="text-cyan-300">OT: <strong>{emp.otHours.toFixed(1)}h (+RM {emp.otPay.toFixed(2)})</strong></span>
                  )}
                  {emp.claimsReimbursement > 0 && (
                    <span className="text-emerald-400">Claims: <strong>+RM {emp.claimsReimbursement.toFixed(2)}</strong></span>
                  )}
                  <span className="text-rose-400">Deductions: <strong>-RM {emp.statutoryDeductions.toFixed(2)}</strong></span>
                </div>
              </div>

              <button
                onClick={() => onViewPayslip({ id: emp.empId, name: emp.name, role: emp.role, rate: emp.baseRate })}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium transition-colors border border-slate-700 flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>View Itemized Digital Payslip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Destructive Action Confirmation Modal */}
      {showLockModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLockModal(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lock-payroll-dialog-title"
        >
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="lock-payroll-dialog-title" className="text-sm sm:text-base font-bold text-white">
                    Confirm Payroll Cycle Lock & Disbursement
                  </h3>
                  <p className="text-xs text-slate-400">Final authorization before bank processing</p>
                </div>
              </div>
              <button
                onClick={() => setShowLockModal(false)}
                aria-label="Close modal"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 leading-relaxed">
                <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  ACH Direct Deposit Finalization Notice
                </p>
                <p className="text-[11px] text-amber-200/90">
                  Warning: Once confirmed, bank ACH direct deposits will be finalized. The pay cycle 
                  <strong className="text-white font-semibold"> {cycleName}</strong> will be permanently locked as non-editable, and ACH credit files will be submitted for settlement.
                </p>
              </div>

              {/* Cycle Financial Summary */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-slate-400 font-sans">
                  <span>Pay Cycle:</span>
                  <span className="text-white font-medium">{cycleName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-sans">
                  <span>Enrolled Staff:</span>
                  <span className="text-cyan-300 font-semibold">{employees.length} Employees</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-sans">
                  <span>Total Gross Compensation:</span>
                  <span className="text-white">RM {totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-300 font-semibold">Net Payout to Disburse:</span>
                  <span className="text-emerald-400 font-bold text-sm">RM {totalNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Please ensure all timesheet hours, overtime allowances, and claim receipts have been audited before continuing.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowLockModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700 min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLockModal(false);
                  onLockPayroll();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Confirm Lock & Disburse</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
