import React, { useEffect } from 'react';
import AccessibleModal from './AccessibleModal';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Building, 
  CreditCard, 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  Clock, 
  DollarSign, 
  FileText 
} from 'lucide-react';

export default function EmployeeDetailModal({ employee, onClose, onViewPayslip }) {
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

  return (
    <AccessibleModal
      isOpen={Boolean(employee)}
      onClose={onClose}
      titleId={`emp-detail-title-${employee.id}`}
      maxWidth="max-w-2xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-lg font-mono">
            {employee.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id={`emp-detail-title-${employee.id}`} className="text-lg font-bold text-white">{employee.name}</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {employee.id}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                  employee.status === 'Active' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{employee.role} • <span className="text-cyan-400">{employee.department}</span></p>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          {/* Key HR Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Employment Type</span>
              <p className="font-semibold text-white">{employee.type}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Base Pay Rate</span>
              <p className="font-semibold font-mono text-emerald-400">${employee.rate}/hour</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Tenure</span>
              <p className="font-semibold text-white">Since {employee.joinDate}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Annual Leave</span>
              <p className="font-semibold font-mono text-cyan-300">{employee.leaveBalances?.annual || 0} Days Avail</p>
            </div>
          </div>

          {/* Contact & Personal Dossier */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Contact & Identification</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-400" /> Email
                </span>
                <p className="font-medium text-slate-200">{employee.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" /> Phone
                </span>
                <p className="font-medium text-slate-200">{employee.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-slate-400" /> National ID / Passport
                </span>
                <p className="font-mono text-slate-200">{employee.nationalId}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3 text-slate-400" /> Payroll Bank Account
                </span>
                <p className="font-mono text-slate-200">{employee.bankAccount}</p>
              </div>
            </div>
          </div>

          {/* Compliance & Certifications Tracker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Qualifications & Certifications Compliance</span>
              </h3>
              <span className="text-[10px] text-slate-400">Audited against Food & Safety Acts</span>
            </div>

            <div className="divide-y divide-slate-800/80 rounded-xl bg-slate-950/40 border border-slate-800 overflow-hidden">
              {employee.certifications?.map((cert, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-2 hover:bg-slate-900/40">
                  <div className="flex items-center gap-2.5">
                    {cert.badge === 'emerald' && <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {cert.badge === 'amber' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                    {cert.badge === 'red' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                    <div>
                      <p className="font-semibold text-white">{cert.name}</p>
                      <p className="text-[10px] text-slate-400">Expires: {cert.expiry}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    cert.badge === 'emerald' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : cert.badge === 'amber'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Entitlement Breakdown */}
          <div className="space-y-2">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Current Leave Balances</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">Annual Leave</span>
                <p className="text-base font-bold font-mono text-cyan-300 mt-0.5">{employee.leaveBalances?.annual} Days</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">Medical (MC)</span>
                <p className="text-base font-bold font-mono text-emerald-400 mt-0.5">{employee.leaveBalances?.medical} Days</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">Emergency</span>
                <p className="text-base font-bold font-mono text-amber-400 mt-0.5">{employee.leaveBalances?.emergency} Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Employee dossier up to date</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewPayslip(employee);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Preview Payslip</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
    </AccessibleModal>
  );
}
