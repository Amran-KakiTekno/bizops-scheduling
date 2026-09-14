import React, { useState } from 'react';
import AccessibleModal from './AccessibleModal';
import { 
  Calendar, 
  FileText, 
  Receipt, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  DollarSign, 
  Plus, 
  Eye, 
  Clock, 
  Paperclip,
  X
} from 'lucide-react';

export default function LeaveClaimsView({ 
  leaveRequests, 
  onApproveLeave, 
  onRejectLeave, 
  claims, 
  onApproveClaim, 
  onSelectEmployee 
}) {
  const [activeSection, setActiveSection] = useState('leave');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [rejectingLeave, setRejectingLeave] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');
  const pendingClaims = claims.filter(c => c.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Sub-navigation Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('leave')}
            aria-pressed={activeSection === 'leave'}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer min-h-[44px] ${
              activeSection === 'leave'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Time Off & Leave Requests</span>
            {pendingLeaves.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">
                {pendingLeaves.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('claims')}
            aria-pressed={activeSection === 'claims'}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer min-h-[44px] ${
              activeSection === 'claims'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Expense Claims & Reimbursements</span>
            {pendingClaims.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">
                {pendingClaims.length}
              </span>
            )}
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline font-mono">
          Syncs with Shift Roster & Payroll
        </span>
      </div>

      {/* SECTION 1: LEAVE MANAGEMENT */}
      {activeSection === 'leave' && (
        <div className="space-y-4">
          {/* Leave Overview Alert */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Leave & PTO Approval Queue</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Approved leaves automatically blackout employees on the master shift calendar to prevent double-booking.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Pending: </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{pendingLeaves.length}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Approved: </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {leaveRequests.filter(l => l.status === 'Approved').length}
                </span>
              </div>
            </div>
          </div>

          {/* Leave Requests Cards */}
          <div className="space-y-3">
            {leaveRequests.map(req => (
              <div 
                key={req.id}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectEmployee({ id: req.empId, name: req.name, role: req.role })}
                      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center hover:border-cyan-500 border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      {req.name[0]}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectEmployee({ id: req.empId, name: req.name, role: req.role })}
                          className="font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer"
                        >
                          {req.name}
                        </button>
                        <span className="text-[10px] text-slate-500 font-mono">({req.id})</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{req.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${
                      req.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                        : req.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Leave Type & Dates</span>
                    <p className="font-semibold text-slate-900 dark:text-white">{req.type}</p>
                    <p className="font-mono text-cyan-600 dark:text-cyan-300 text-[11px]">{req.dates}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Reason & Justification</span>
                    <p className="text-slate-800 dark:text-slate-200">{req.reason}</p>
                    <p className="text-[10px] text-slate-500">Submitted {req.appliedAt}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Verification & Balance</span>
                    <p className="text-slate-700 dark:text-slate-300 font-mono">{req.balanceLeft}</p>
                    {req.docAttached ? (
                      <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-[11px]">
                        <Paperclip className="w-3 h-3" />
                        <span className="underline cursor-pointer">{req.docAttached}</span>
                      </div>
                    ) : (
                      <p className="text-slate-400 dark:text-slate-500 text-[10px]">No medical slip required</p>
                    )}
                  </div>
                </div>

                {/* Manager Rejection Feedback Note (if declined) */}
                {req.status === 'Rejected' && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-rose-900 dark:text-rose-200">Manager Rejection Feedback:</span>
                      <p className="text-slate-700 dark:text-slate-300 mt-0.5">{req.rejectionReason || 'Operational shift requirements / staffing constraint.'}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {req.status === 'Pending' && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                    <button
                      onClick={() => {
                        setRejectingLeave(req);
                        setRejectionReason('');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-500/30 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                      <span>Decline...</span>
                    </button>
                    <button
                      onClick={() => onApproveLeave(req.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Update Roster</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: CLAIMS & REIMBURSEMENTS */}
      {activeSection === 'claims' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Expense Reimbursement Submissions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Approved claims are automatically aggregated into the employee's payroll payout as tax-free reimbursements.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Total Pending: </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                RM {pendingClaims.reduce((acc, c) => acc + c.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-200 dark:divide-slate-800/70 text-xs">
              {claims.map(claim => (
                <div 
                  key={claim.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{claim.merchant}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {claim.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Claimed by <strong className="text-slate-800 dark:text-slate-200">{claim.name}</strong> • {claim.date}
                      </p>
                      <p className="text-[11px] text-slate-500 italic mt-0.5">"{claim.description}"</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">RM {claim.amount.toFixed(2)}</span>
                      <p className="text-[10px] text-slate-500 font-mono">{claim.receipt}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {claim.status === 'Pending' ? (
                        <button
                          onClick={() => onApproveClaim(claim.id)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors shadow-lg shadow-cyan-600/20 flex items-center gap-1 cursor-pointer min-h-[44px]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve Claim</span>
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Disbursing in Next Pay Run</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Accessible Leave Rejection Modal with Feedback */}
      {rejectingLeave && (
        <AccessibleModal
          isOpen={Boolean(rejectingLeave)}
          onClose={() => {
            setRejectingLeave(null);
            setRejectionReason('');
          }}
          titleId="reject-leave-modal-title"
          maxWidth="max-w-md"
        >
          {/* Modal Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="reject-leave-modal-title" className="font-bold text-sm text-slate-900 dark:text-white">Decline Leave Request</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {rejectingLeave.name} • <span className="text-cyan-600 dark:text-cyan-400">{rejectingLeave.type}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setRejectingLeave(null);
                setRejectionReason('');
              }}
              aria-label="Close modal"
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Requested Period:</span>
                <span className="font-mono text-slate-900 dark:text-white">{rejectingLeave.dates}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Employee Reason:</span>
                <span className="text-slate-600 dark:text-slate-300 italic">"{rejectingLeave.reason}"</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700 dark:text-white text-xs">
                Constructive Rejection Feedback <span className="text-slate-500 dark:text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify reason or instructions (e.g., Short-staffed during peak shift; please coordinate a shift swap with Jordan or reapply for next week)."
                rows={3}
                className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-3 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Quick Reason Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Quick Reason Suggestions:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Critical shift understaffed',
                  'Insufficient leave balance',
                  'Advance notice required (>48h)',
                  'Blackout date for retail event',
                  'Please coordinate peer shift swap'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setRejectionReason(chip)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-[11px] transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              This note will be communicated back to {rejectingLeave.name} in their self-service notification feed.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setRejectingLeave(null);
                setRejectionReason('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onRejectLeave(rejectingLeave.id, rejectionReason.trim());
                setRejectingLeave(null);
                setRejectionReason('');
              }}
              className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shadow-lg shadow-rose-600/20 flex items-center gap-1.5 min-h-[44px]"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Confirm Decline</span>
            </button>
          </div>
        </AccessibleModal>
      )}
    </div>
  );
}
