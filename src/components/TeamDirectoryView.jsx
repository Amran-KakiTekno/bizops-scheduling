import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  DollarSign, 
  ChevronRight, 
  Mail, 
  Phone 
} from 'lucide-react';

export default function TeamDirectoryView({ 
  employees, 
  onSelectEmployee, 
  onViewPayslip 
}) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', 'Front of House', 'Kitchen Operations', 'Store Operations'];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, or staff ID..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-base sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
          />
        </div>

        {/* Department Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer min-h-[44px] flex items-center ${
                deptFilter === dept 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">No team members match your search</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                No active staff found matching "{search}" {deptFilter !== 'All' ? `in ${deptFilter}` : ''}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDeptFilter('All');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-medium hover:bg-cyan-500/20 transition-colors cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          filtered.map(emp => {
            const hasExpiringCert = emp.certifications?.some(c => c.badge === 'amber' || c.badge === 'red');

            return (
              <div
                key={emp.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold text-sm font-mono shadow-inner">
                        {emp.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {emp.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{emp.role}</p>
                        <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5 inline-block">
                          {emp.department}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                      emp.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-sans">Base Wage</span>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">RM {emp.rate}/hr</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-sans">Leave Avail</span>
                      <p className="text-cyan-600 dark:text-cyan-300 font-semibold mt-0.5">{emp.leaveBalances?.annual || 0} AL • {emp.leaveBalances?.medical || 0} MC</p>
                    </div>
                  </div>

                {/* Compliance Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    Certifications & Safety
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {emp.certifications?.map((c, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 ${
                          c.badge === 'emerald'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                            : c.badge === 'amber'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 motion-safe:animate-pulse'
                            : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        }`}
                        title={`Expires: ${c.expiry}`}
                      >
                        {c.badge === 'emerald' ? <ShieldCheck className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                        <span>{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onViewPayslip(emp)}
                  className="px-2.5 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px] cursor-pointer min-h-[44px]"
                  title="Generate Digital Payslip"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Payslip</span>
                </button>

                <button
                  onClick={() => onSelectEmployee(emp)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 dark:hover:bg-cyan-600/30 hover:border-cyan-500 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer min-h-[44px]"
                >
                  <span>Dossier</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            );
          }))}
      </div>
    </div>
  );
}
