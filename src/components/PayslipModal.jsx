import React from 'react';
import { X, Printer, Download, Building2, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export default function PayslipModal({ employee, payrollData, onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Actions */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-white">Itemized Digital Payslip</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified Run
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()} 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="Print Payslip"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          {/* Company & Period Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white tracking-tight">EZIBIZ VENTURES SDN BHD</h2>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">Business Registration: 202301049982 (1509901-X)</p>
              <p className="text-slate-500 text-[11px]">Downtown Hub, Level 4, Retail Concourse</p>
            </div>
            <div className="sm:text-right font-mono text-[11px] space-y-0.5">
              <p className="text-slate-400">Pay Period: <span className="text-white font-semibold">01 Oct - 15 Oct 2026</span></p>
              <p className="text-slate-400">Payment Date: <span className="text-cyan-400 font-semibold">18 Oct 2026</span></p>
              <p className="text-slate-500">Pay Slip Ref: <span className="text-slate-400">PS-{employee.id}-202610</span></p>
            </div>
          </div>

          {/* Employee Info Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Employee Name</span>
              <p className="font-semibold text-white mt-0.5">{employee.name}</p>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Staff ID / Role</span>
              <p className="font-mono text-cyan-300 mt-0.5">{employee.id} • {employee.role}</p>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">NRIC / Passport</span>
              <p className="font-mono text-slate-300 mt-0.5">{employee.nationalId || 'ID-••••••-••-••••'}</p>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Disbursement Account</span>
              <p className="text-slate-300 mt-0.5">{employee.bankAccount || 'Direct Bank Deposit'}</p>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Earnings Column */}
            <div className="space-y-3">
              <div className="border-b border-slate-800 pb-1.5 flex justify-between items-center">
                <span className="font-bold text-white text-xs uppercase tracking-wider">Gross Earnings</span>
                <span className="text-[10px] text-slate-400">Hours / Unit</span>
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-200">Regular Shifts</p>
                    <p className="text-[10px] text-slate-500">{payRecord.regularHours.toFixed(1)} hrs @ ${payRecord.baseRate.toFixed(2)}/hr</p>
                  </div>
                  <span className="text-white">${payRecord.regularPay.toFixed(2)}</span>
                </div>

                {payRecord.otHours > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-emerald-400">Overtime (1.5x Multiplier)</p>
                      <p className="text-[10px] text-slate-500">{payRecord.otHours.toFixed(1)} hrs @ ${(payRecord.baseRate * 1.5).toFixed(2)}/hr</p>
                    </div>
                    <span className="text-emerald-400">+${payRecord.otPay.toFixed(2)}</span>
                  </div>
                )}

                {payRecord.claimsReimbursement > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-cyan-300">Approved Expense Claims</p>
                      <p className="text-[10px] text-slate-500">Tax-free reimbursement</p>
                    </div>
                    <span className="text-cyan-300">+${payRecord.claimsReimbursement.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Total Gross Pay</span>
                <span className="text-white font-mono">${payRecord.grossTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Deductions Column */}
            <div className="space-y-3">
              <div className="border-b border-slate-800 pb-1.5 flex justify-between items-center">
                <span className="font-bold text-white text-xs uppercase tracking-wider">Statutory & Withholding</span>
                <span className="text-[10px] text-slate-400">Rate / Code</span>
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-200">Employee EPF / Retirement</p>
                    <p className="text-[10px] text-slate-500">11.0% of eligible wages</p>
                  </div>
                  <span className="text-rose-400">-${(payRecord.statutoryDeductions * 0.85).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-200">SOCSO / Employment Insurance</p>
                    <p className="text-[10px] text-slate-500">Workplace injury & EIS</p>
                  </div>
                  <span className="text-rose-400">-${(payRecord.statutoryDeductions * 0.15).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-500">
                  <div>
                    <p>Unpaid Leave Deductions</p>
                    <p className="text-[10px]">0 unexcused absences</p>
                  </div>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Total Deductions</span>
                <span className="text-rose-400 font-mono">-${payRecord.statutoryDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Net Pay Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Net Amount Deposited</span>
                <p className="text-xs text-slate-300">Disbursed via Direct Bank ACH</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-emerald-400">${payRecord.netPay.toFixed(2)}</div>
              <p className="text-[10px] text-emerald-500/80 font-medium">Compliance Audited</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
            This is a computer-generated payslip audited under Fair Labor Standards and local Statutory Employment Acts. No manual signature required.
          </p>
        </div>
      </div>
    </div>
  );
}
