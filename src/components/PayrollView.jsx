import React from 'react';
import { 
  DollarSign, 
  Clock, 
  Receipt, 
  Download, 
  Lock, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert 
} from 'lucide-react';

export default function PayrollView({ 
  payrollData, 
  onViewPayslip, 
  onExportPayroll, 
  onLockPayroll 
}) {
  const { cycleName, status, totalGross, totalNet, totalOvertimeHours, totalRegularHours, employees } = payrollData;

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
            onClick={onLockPayroll}
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
          <div className="text-xl font-bold font-mono text-white">${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-[11px] text-slate-500">Regular + Overtime + Claims</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Net Disbursed</span>
          <div className="text-xl font-bold font-mono text-emerald-400">${totalNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
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

        <div className="overflow-x-auto">
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
                  <td className="p-3.5 text-slate-300">${emp.baseRate.toFixed(2)}/hr</td>
                  <td className="p-3.5 text-slate-300">{emp.regularHours.toFixed(1)} hrs</td>
                  <td className="p-3.5">
                    {emp.otHours > 0 ? (
                      <span className="text-cyan-300 font-medium">
                        {emp.otHours.toFixed(1)} hrs (${emp.otPay.toFixed(2)})
                      </span>
                    ) : (
                      <span className="text-slate-500">0.0 hrs</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {emp.claimsReimbursement > 0 ? (
                      <span className="text-emerald-400">+${emp.claimsReimbursement.toFixed(2)}</span>
                    ) : (
                      <span className="text-slate-500">$0.00</span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-white">${emp.grossTotal.toFixed(2)}</td>
                  <td className="p-3.5 text-rose-400">-${emp.statutoryDeductions.toFixed(2)}</td>
                  <td className="p-3.5 font-bold text-emerald-400 text-xs">${emp.netPay.toFixed(2)}</td>
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
      </div>
    </div>
  );
}
