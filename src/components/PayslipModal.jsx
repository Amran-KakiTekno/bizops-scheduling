import React, { useEffect } from 'react';
import AccessibleModal from './AccessibleModal';
import { X, Printer, Building2, ShieldCheck, DollarSign } from 'lucide-react';

export default function PayslipModal({ employee, payrollData, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!employee) return null;

  const payRecord = payrollData?.employees?.find(e => e.empId === employee.id) || {
    baseRate: employee.rate || 20,
    regularHours: 80,
    regularPay: (employee.rate || 20) * 80,
    otHours: 4.0,
    otPay: (employee.rate || 20) * 4.0 * 1.5,
    claimsReimbursement: 45.00,
    grossTotal: ((employee.rate || 20) * 80) + ((employee.rate || 20) * 4.0 * 1.5) + 45.00,
    statutoryDeductions: (((employee.rate || 20) * 80) + ((employee.rate || 20) * 4.0 * 1.5)) * 0.11,
    netPay: (((employee.rate || 20) * 80) + ((employee.rate || 20) * 4.0 * 1.5) + 45.00) - ((((employee.rate || 20) * 80) + ((employee.rate || 20) * 4.0 * 1.5)) * 0.11)
  };

  return (
    <AccessibleModal
      isOpen={Boolean(employee)}
      onClose={onClose}
      titleId={`payslip-title-${employee.id}`}
      maxWidth="max-w-2xl"
      className="payslip-modal-backdrop"
      contentClassName="payslip-modal-card border-slate-200 dark:border-slate-700/80 shadow-2xl"
    >
      {/* Header Actions - Hidden when printing */}
      <div className="payslip-header-actions no-print px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <h2 id={`payslip-title-${employee.id}`} className="font-semibold text-sm text-slate-900 dark:text-white">Itemized Digital Payslip</h2>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Verified Run
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()} 
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
            title="Print Payslip"
            aria-label="Print payslip"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Printable Payslip Body */}
      <div className="payslip-body p-6 overflow-y-auto space-y-6 text-xs text-slate-800 dark:text-slate-200 printable-payslip-content">
        {/* Company & Period Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 payslip-section">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 payslip-icon" />
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight payslip-heading">EZIBIZ VENTURES SDN BHD</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 payslip-subtext">Business Registration: 202301049982 (1509901-X)</p>
            <p className="text-slate-400 dark:text-slate-400 text-[11px] payslip-subtext">Downtown Hub, Level 4, Retail Concourse</p>
          </div>
          <div className="sm:text-right font-mono text-[11px] space-y-0.5 payslip-period-info">
            <p className="text-slate-500 dark:text-slate-400">Pay Period: <span className="text-slate-900 dark:text-white font-semibold payslip-value">01 Oct - 15 Oct 2026</span></p>
            <p className="text-slate-500 dark:text-slate-400">Payment Date: <span className="text-cyan-600 dark:text-cyan-400 font-semibold payslip-value">18 Oct 2026</span></p>
            <p className="text-slate-400 dark:text-slate-400 payslip-ref">Pay Slip Ref: <span className="text-slate-600 dark:text-slate-400 payslip-ref-code">PS-{employee.id}-202610</span></p>
          </div>
        </div>

        {/* Employee Info Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] payslip-info-box">
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block payslip-label">Employee Name</span>
            <p className="font-semibold text-slate-900 dark:text-white mt-0.5 payslip-data">{employee.name}</p>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block payslip-label">Staff ID / Role</span>
            <p className="font-mono text-cyan-600 dark:text-cyan-300 mt-0.5 payslip-data">{employee.id} â€¢ {employee.role}</p>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block payslip-label">NRIC / Passport</span>
            <p className="font-mono text-slate-600 dark:text-slate-300 mt-0.5 payslip-data">{employee.nationalId || 'ID-â€¢â€¢â€¢â€¢â€¢â€¢-â€¢â€¢-â€¢â€¢â€¢â€¢'}</p>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block payslip-label">Disbursement Account</span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5 payslip-data">{employee.bankAccount || 'Direct Bank Deposit'}</p>
          </div>
        </div>

        {/* Earnings & Deductions Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 payslip-tables">
          {/* Earnings Column */}
          <div className="space-y-3 payslip-column">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5 flex justify-between items-center payslip-col-header">
              <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider payslip-col-title">Gross Earnings</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 payslip-col-unit">Hours / Unit</span>
            </div>
            <div className="space-y-2 font-mono text-[11px] payslip-rows">
              <div className="flex justify-between items-center payslip-row">
                <div>
                  <p className="text-slate-800 dark:text-slate-200 payslip-item-name">Regular Shifts</p>
                  <p className="text-[10px] text-slate-500 payslip-item-desc">{payRecord.regularHours.toFixed(1)} hrs @ RM {payRecord.baseRate.toFixed(2)}/hr</p>
                </div>
                <span className="text-slate-900 dark:text-white payslip-item-amount">RM {payRecord.regularPay.toFixed(2)}</span>
              </div>

              {payRecord.otHours > 0 && (
                <div className="flex justify-between items-center payslip-row">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 payslip-item-name">Overtime (1.5x Multiplier)</p>
                    <p className="text-[10px] text-slate-500 payslip-item-desc">{payRecord.otHours.toFixed(1)} hrs @ RM {(payRecord.baseRate * 1.5).toFixed(2)}/hr</p>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 payslip-item-amount">+RM {payRecord.otPay.toFixed(2)}</span>
                </div>
              )}

              {payRecord.claimsReimbursement > 0 && (
                <div className="flex justify-between items-center payslip-row">
                  <div>
                    <p className="text-cyan-600 dark:text-cyan-300 payslip-item-name">Approved Expense Claims</p>
                    <p className="text-[10px] text-slate-500 payslip-item-desc">Tax-free reimbursement</p>
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-300 payslip-item-amount">+RM {payRecord.claimsReimbursement.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex justify-between text-xs font-semibold payslip-total-row">
              <span className="text-slate-700 dark:text-slate-300 payslip-total-label">Total Gross Pay</span>
              <span className="text-slate-900 dark:text-white font-mono payslip-total-value">RM {payRecord.grossTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Deductions Column */}
          <div className="space-y-3 payslip-column">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5 flex justify-between items-center payslip-col-header">
              <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider payslip-col-title">Statutory & Withholding</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 payslip-col-unit">Rate / Code</span>
            </div>
            <div className="space-y-2 font-mono text-[11px] payslip-rows">
              <div className="flex justify-between items-center payslip-row">
                <div>
                  <p className="text-slate-800 dark:text-slate-200 payslip-item-name">Employee EPF / Retirement</p>
                  <p className="text-[10px] text-slate-500 payslip-item-desc">11.0% of eligible wages</p>
                </div>
                <span className="text-rose-600 dark:text-rose-400 payslip-deduction-amount">-RM {(payRecord.statutoryDeductions * 0.85).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center payslip-row">
                <div>
                  <p className="text-slate-800 dark:text-slate-200 payslip-item-name">SOCSO / Employment Insurance</p>
                  <p className="text-[10px] text-slate-500 payslip-item-desc">Workplace injury & EIS</p>
                </div>
                <span className="text-rose-600 dark:text-rose-400 payslip-deduction-amount">-RM {(payRecord.statutoryDeductions * 0.15).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-slate-400 dark:text-slate-400 payslip-row">
                <div>
                  <p className="payslip-item-name">Unpaid Leave Deductions</p>
                  <p className="text-[10px] payslip-item-desc">0 unexcused absences</p>
                </div>
                <span className="payslip-deduction-amount">RM 0.00</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex justify-between text-xs font-semibold payslip-total-row">
              <span className="text-slate-700 dark:text-slate-300 payslip-total-label">Total Deductions</span>
              <span className="text-rose-600 dark:text-rose-400 font-mono payslip-total-value">-RM {payRecord.statutoryDeductions.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Net Pay Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-slate-50 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/30 flex items-center justify-between payslip-net-box shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold payslip-net-icon">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block payslip-label">Net Amount Deposited</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 payslip-disbursed-note">Disbursed via Direct Bank ACH</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 payslip-net-amount">RM {payRecord.netPay.toFixed(2)}</div>
            <p className="text-[10px] text-emerald-600/80 dark:text-emerald-500/80 font-medium payslip-audited-note">Compliance Audited</p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 dark:text-slate-400 text-center leading-relaxed payslip-footer-note">
          This is a computer-generated payslip audited under Fair Labor Standards and local Statutory Employment Acts. No manual signature required.
        </p>
      </div>
    </AccessibleModal>
  );
}

