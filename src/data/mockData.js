export const initialEmployees = [
  {
    id: 'EMP-101',
    name: 'Marcus Sterling',
    role: 'Floor Lead / Barista',
    department: 'Front of House',
    type: 'Full-Time',
    rate: 22,
    baseSalary: 3800,
    email: 'marcus.s@ezibiz.io',
    phone: '+1 (555) 234-5678',
    joinDate: '15 Jan 2022',
    avatar: 'MS',
    status: 'Active',
    bankAccount: 'Maybank •••• 4912',
    nationalId: 'ID-920311-10-5541',
    certifications: [
      { name: 'First Aid & CPR', status: 'Valid', expiry: 'Nov 2026', badge: 'emerald' },
      { name: 'Advanced Barista L3', status: 'Valid', expiry: 'Jan 2027', badge: 'emerald' },
      { name: 'Food Safety Hygiene', status: 'Valid', expiry: 'Aug 2027', badge: 'emerald' }
    ],
    leaveBalances: { annual: 12, medical: 14, emergency: 3 }
  },
  {
    id: 'EMP-102',
    name: 'Maya Rodriguez',
    role: 'Senior Barista',
    department: 'Front of House',
    type: 'Full-Time',
    rate: 19,
    baseSalary: 3300,
    email: 'maya.r@ezibiz.io',
    phone: '+1 (555) 345-6789',
    joinDate: '10 Mar 2023',
    avatar: 'MR',
    status: 'Active',
    bankAccount: 'CIMB •••• 8291',
    nationalId: 'ID-960418-14-6122',
    certifications: [
      { name: 'Food Safety Hygiene', status: 'Valid', expiry: 'Oct 2026', badge: 'emerald' },
      { name: 'Typhoid Immunization', status: 'Valid', expiry: 'Mar 2027', badge: 'emerald' }
    ],
    leaveBalances: { annual: 10, medical: 12, emergency: 2 }
  },
  {
    id: 'EMP-103',
    name: 'Alex Chen',
    role: 'Kitchen Prep Lead',
    department: 'Kitchen Operations',
    type: 'Full-Time',
    rate: 20,
    baseSalary: 3500,
    email: 'alex.c@ezibiz.io',
    phone: '+1 (555) 456-7890',
    joinDate: '01 Jun 2023',
    avatar: 'AC',
    status: 'Active',
    bankAccount: 'Public Bank •••• 1045',
    nationalId: 'ID-940822-08-5931',
    certifications: [
      { name: 'HACCP Food Safety', status: 'Valid', expiry: 'Dec 2026', badge: 'emerald' },
      { name: 'Commercial Kitchen Fire Safety', status: 'Valid', expiry: 'May 2027', badge: 'emerald' }
    ],
    leaveBalances: { annual: 8, medical: 14, emergency: 3 }
  },
  {
    id: 'EMP-104',
    name: 'Jordan Kim',
    role: 'Barista / Register',
    department: 'Front of House',
    type: 'Hourly Part-Time',
    rate: 18,
    baseSalary: null,
    email: 'jordan.k@ezibiz.io',
    phone: '+1 (555) 567-8901',
    joinDate: '12 Nov 2023',
    avatar: 'JK',
    status: 'Active',
    bankAccount: 'RHB Bank •••• 7734',
    nationalId: 'ID-000214-10-8842',
    certifications: [
      { name: 'Food Safety Level 2', status: 'Expiring Soon', expiry: '24 Oct 2026', badge: 'amber' }
    ],
    leaveBalances: { annual: 5, medical: 8, emergency: 1 }
  },
  {
    id: 'EMP-105',
    name: 'Taylor Smith',
    role: 'Closing Supervisor',
    department: 'Store Operations',
    type: 'Full-Time',
    rate: 22,
    baseSalary: 3800,
    email: 'taylor.s@ezibiz.io',
    phone: '+1 (555) 678-9012',
    joinDate: '20 Aug 2022',
    avatar: 'TS',
    status: 'Active',
    bankAccount: 'Hong Leong •••• 3419',
    nationalId: 'ID-911105-01-4478',
    certifications: [
      { name: 'Premises Security & Cash Handling', status: 'Valid', expiry: 'Aug 2027', badge: 'emerald' },
      { name: 'Food Safety Hygiene', status: 'Valid', expiry: 'Sep 2026', badge: 'emerald' }
    ],
    leaveBalances: { annual: 11, medical: 13, emergency: 2 }
  },
  {
    id: 'EMP-106',
    name: 'Nurul Aisyah',
    role: 'Pastry & Bakery Chef',
    department: 'Kitchen Operations',
    type: 'Full-Time',
    rate: 21,
    baseSalary: 3600,
    email: 'nurul.a@ezibiz.io',
    phone: '+1 (555) 789-0123',
    joinDate: '15 Feb 2024',
    avatar: 'NA',
    status: 'On Medical Leave',
    bankAccount: 'Maybank •••• 9921',
    nationalId: 'ID-970519-14-5390',
    certifications: [
      { name: 'Halal Food Processing', status: 'Valid', expiry: 'Jan 2028', badge: 'emerald' },
      { name: 'Typhoid Immunization', status: 'Valid', expiry: 'Feb 2027', badge: 'emerald' }
    ],
    leaveBalances: { annual: 9, medical: 10, emergency: 3 }
  },
  {
    id: 'EMP-107',
    name: 'David Tan',
    role: 'Barista & Cashier',
    department: 'Front of House',
    type: 'Hourly Part-Time',
    rate: 17,
    baseSalary: null,
    email: 'david.t@ezibiz.io',
    phone: '+1 (555) 890-1234',
    joinDate: '02 May 2024',
    avatar: 'DT',
    status: 'Active',
    bankAccount: 'AmBank •••• 5512',
    nationalId: 'ID-010729-10-6311',
    certifications: [
      { name: 'Basic Food Handling', status: 'Valid', expiry: 'May 2027', badge: 'emerald' }
    ],
    leaveBalances: { annual: 4, medical: 7, emergency: 1 }
  },
  {
    id: 'EMP-108',
    name: 'Chloe Bennett',
    role: 'Customer Service & Host',
    department: 'Front of House',
    type: 'Hourly Part-Time',
    rate: 17,
    baseSalary: null,
    email: 'chloe.b@ezibiz.io',
    phone: '+1 (555) 901-2345',
    joinDate: '18 Jul 2024',
    avatar: 'CB',
    status: 'Active',
    bankAccount: 'OCBC •••• 2187',
    nationalId: 'ID-020914-08-7204',
    certifications: [
      { name: 'Basic Food Handling', status: 'Expired', expiry: '01 Sep 2026', badge: 'red' }
    ],
    leaveBalances: { annual: 3, medical: 6, emergency: 1 }
  }
];

export const initialRosterDays = [
  { day: 'Mon', date: 'Oct 07', shifts: 6, hours: 48, cost: 960 },
  { day: 'Tue', date: 'Oct 08', shifts: 6, hours: 48, cost: 960 },
  { day: 'Wed', date: 'Oct 09', shifts: 7, hours: 56, cost: 1120 },
  { day: 'Thu', date: 'Oct 10', shifts: 7, hours: 56, cost: 1120 },
  { day: 'Fri', date: 'Oct 11', shifts: 9, hours: 72, cost: 1440 },
  { day: 'Sat', date: 'Oct 12', shifts: 10, hours: 80, cost: 1600 },
  { day: 'Sun', date: 'Oct 13', shifts: 8, hours: 64, cost: 1280 }
];

export const dayShiftsData = {
  Fri: [
    { id: 'S-1', empId: 'EMP-101', name: 'Marcus Sterling', role: 'Floor Lead / Barista', time: '06:30 - 14:30', hours: 8.0, wage: 'RM 176', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', station: 'Espresso Bar 1' },
    { id: 'S-2', empId: 'EMP-102', name: 'Maya Rodriguez', role: 'Senior Barista', time: '07:00 - 15:00', hours: 8.0, wage: 'RM 152', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400', station: 'Espresso Bar 2' },
    { id: 'S-3', empId: 'EMP-103', name: 'Alex Chen', role: 'Kitchen Prep Lead', time: '08:00 - 16:30', hours: 8.5, wage: 'RM 170', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', station: 'Hot Kitchen' },
    { id: 'S-4', empId: 'EMP-104', name: 'Jordan Kim', role: 'Barista / Register', time: '14:00 - 22:00', hours: 8.0, wage: 'RM 144', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400', station: 'Front POS' },
    { id: 'S-5', empId: 'EMP-105', name: 'Taylor Smith', role: 'Closing Supervisor', time: '15:30 - 23:30', hours: 8.0, wage: 'RM 176', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', station: 'Store Close & Cash' },
    { id: 'S-6', empId: 'EMP-107', name: 'David Tan', role: 'Barista & Cashier', time: '10:00 - 18:00', hours: 8.0, wage: 'RM 136', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', station: 'Drive-Thru Window' }
  ],
  Sat: [
    { id: 'S-7', empId: 'EMP-101', name: 'Marcus Sterling', role: 'Floor Lead / Barista', time: '07:00 - 15:30', hours: 8.5, wage: 'RM 187', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', station: 'Espresso Bar 1' },
    { id: 'S-8', empId: 'EMP-102', name: 'Maya Rodriguez', role: 'Senior Barista', time: '14:00 - 22:00', hours: 8.0, wage: 'RM 152', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400', station: 'Espresso Bar 2' },
    { id: 'S-9', empId: 'EMP-104', name: 'Jordan Kim', role: 'Barista / Register', time: '08:00 - 16:00', hours: 8.0, wage: 'RM 144', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400', station: 'Front POS' },
    { id: 'S-10', empId: 'EMP-105', name: 'Taylor Smith', role: 'Closing Supervisor', time: '16:00 - 00:00', hours: 8.0, wage: 'RM 176', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', station: 'Store Close' }
  ]
};

export const initialAttendance = [
  {
    id: 'ATT-201',
    empId: 'EMP-101',
    name: 'Marcus Sterling',
    role: 'Floor Lead / Barista',
    shiftDate: 'Fri, Oct 11',
    scheduled: '06:30 - 14:30 (8.0h)',
    actual: '06:28 - 14:34 (8.1h)',
    punchIn: '06:28 AM',
    punchOut: '02:34 PM',
    status: 'Completed',
    geofence: 'Store #1 GPS Pass (4m)',
    variance: '+6 mins OT',
    isLate: false,
    verified: true,
    reconciled: false
  },
  {
    id: 'ATT-202',
    empId: 'EMP-102',
    name: 'Maya Rodriguez',
    role: 'Senior Barista',
    shiftDate: 'Fri, Oct 11',
    scheduled: '07:00 - 15:00 (8.0h)',
    actual: '06:58 - 15:05 (8.1h)',
    punchIn: '06:58 AM',
    punchOut: '03:05 PM',
    status: 'Completed',
    geofence: 'Store #1 GPS Pass (2m)',
    variance: '+7 mins OT',
    isLate: false,
    verified: true,
    reconciled: false
  },
  {
    id: 'ATT-203',
    empId: 'EMP-103',
    name: 'Alex Chen',
    role: 'Kitchen Prep Lead',
    shiftDate: 'Fri, Oct 11',
    scheduled: '08:00 - 16:30 (8.5h)',
    actual: '08:14 - 16:32 (8.3h)',
    punchIn: '08:14 AM',
    punchOut: '04:32 PM',
    status: 'Completed',
    geofence: 'Store #1 GPS Pass (5m)',
    variance: '14 mins Late',
    isLate: true,
    verified: true,
    reconciled: false
  },
  {
    id: 'ATT-204',
    empId: 'EMP-104',
    name: 'Jordan Kim',
    role: 'Barista / Register',
    shiftDate: 'Fri, Oct 11',
    scheduled: '14:00 - 22:00 (8.0h)',
    actual: '13:58 - In Progress',
    punchIn: '01:58 PM',
    punchOut: '--',
    status: 'On Shift',
    geofence: 'Store #1 GPS Pass (3m)',
    variance: 'On Time',
    isLate: false,
    verified: true,
    reconciled: false
  },
  {
    id: 'ATT-205',
    empId: 'EMP-107',
    name: 'David Tan',
    role: 'Barista & Cashier',
    shiftDate: 'Fri, Oct 11',
    scheduled: '10:00 - 18:00 (8.0h)',
    actual: '09:59 - In Progress',
    punchIn: '09:59 AM',
    punchOut: '--',
    status: 'On Shift',
    geofence: 'Store #1 GPS Pass (2m)',
    variance: 'On Time',
    isLate: false,
    verified: true,
    reconciled: false
  }
];

export const initialLeaveRequests = [
  {
    id: 'LV-301',
    empId: 'EMP-106',
    name: 'Nurul Aisyah',
    role: 'Pastry & Bakery Chef',
    type: 'Medical Leave (MC)',
    dates: 'Fri, Oct 11 (1 Day)',
    reason: 'Acute gastroenteritis - Doctor prescribed 1 day medical rest',
    docAttached: 'Klinik Mediville #MC-4492.pdf',
    appliedAt: 'Today, 06:15 AM',
    status: 'Pending',
    balanceLeft: '10 days remaining'
  },
  {
    id: 'LV-302',
    empId: 'EMP-104',
    name: 'Jordan Kim',
    role: 'Barista / Register',
    type: 'Annual Leave',
    dates: 'Wed, Oct 16 - Fri, Oct 18 (3 Days)',
    reason: 'Brother university graduation ceremony',
    docAttached: null,
    appliedAt: 'Yesterday, 02:40 PM',
    status: 'Approved',
    balanceLeft: '5 days remaining'
  },
  {
    id: 'LV-303',
    empId: 'EMP-107',
    name: 'David Tan',
    role: 'Barista & Cashier',
    type: 'Emergency Leave',
    dates: 'Tue, Oct 08 (1 Day)',
    reason: 'Family urgent transport breakdown',
    docAttached: null,
    appliedAt: '08 Oct 2026',
    status: 'Approved',
    balanceLeft: '1 day remaining'
  }
];

export const initialClaims = [
  {
    id: 'CLM-501',
    empId: 'EMP-103',
    name: 'Alex Chen',
    category: 'Kitchen Supplies',
    amount: 45.00,
    date: 'Oct 09, 2026',
    receipt: 'REC-Kitchen-8821.jpg',
    merchant: 'Metro Restaurant Supply Co.',
    description: 'Emergency replacement heavy-duty silicone spatulas & digital food thermometers',
    status: 'Pending'
  },
  {
    id: 'CLM-502',
    empId: 'EMP-101',
    name: 'Marcus Sterling',
    category: 'Staff Welfare',
    amount: 38.50,
    date: 'Oct 08, 2026',
    receipt: 'REC-Cafe-1043.jpg',
    merchant: 'Fresh Juice Mart',
    description: 'Electrolyte hydration drinks for kitchen & floor staff during weekend rush',
    status: 'Approved'
  },
  {
    id: 'CLM-503',
    empId: 'EMP-102',
    name: 'Maya Rodriguez',
    category: 'Medical / Health',
    amount: 65.00,
    date: 'Oct 04, 2026',
    receipt: 'REC-Med-7740.pdf',
    merchant: 'City Health Diagnostic Centre',
    description: 'Annual mandatory food handler health screening & medical checkup',
    status: 'Approved'
  }
];

export const initialPayrollCycle = {
  cycleName: 'October 2026 - Cycle 1 (Oct 01 - Oct 15)',
  status: 'Draft / Reconciling',
  totalGross: 14820.00,
  totalNet: 13189.80,
  totalOvertimeHours: 18.5,
  totalRegularHours: 640.0,
  employees: [
    {
      empId: 'EMP-101',
      name: 'Marcus Sterling',
      role: 'Floor Lead',
      type: 'Full-Time',
      baseRate: 22.00,
      regularHours: 80.0,
      regularPay: 1760.00,
      otHours: 4.5,
      otPay: 148.50, // 4.5 * 22 * 1.5
      claimsReimbursement: 38.50,
      grossTotal: 1947.00,
      statutoryDeductions: 214.17, // EPF/SOCSO/tax simulation
      netPay: 1732.83
    },
    {
      empId: 'EMP-102',
      name: 'Maya Rodriguez',
      role: 'Senior Barista',
      type: 'Full-Time',
      baseRate: 19.00,
      regularHours: 80.0,
      regularPay: 1520.00,
      otHours: 3.0,
      otPay: 85.50, // 3 * 19 * 1.5
      claimsReimbursement: 65.00,
      grossTotal: 1670.50,
      statutoryDeductions: 183.75,
      netPay: 1486.75
    },
    {
      empId: 'EMP-103',
      name: 'Alex Chen',
      role: 'Kitchen Prep Lead',
      type: 'Full-Time',
      baseRate: 20.00,
      regularHours: 82.5,
      regularPay: 1650.00,
      otHours: 5.0,
      otPay: 150.00,
      claimsReimbursement: 45.00,
      grossTotal: 1845.00,
      statutoryDeductions: 202.95,
      netPay: 1642.05
    },
    {
      empId: 'EMP-104',
      name: 'Jordan Kim',
      role: 'Barista / Register',
      type: 'Hourly Part-Time',
      baseRate: 18.00,
      regularHours: 48.0,
      regularPay: 864.00,
      otHours: 0.0,
      otPay: 0.00,
      claimsReimbursement: 0.00,
      grossTotal: 864.00,
      statutoryDeductions: 95.04,
      netPay: 768.96
    },
    {
      empId: 'EMP-105',
      name: 'Taylor Smith',
      role: 'Closing Supervisor',
      type: 'Full-Time',
      baseRate: 22.00,
      regularHours: 80.0,
      regularPay: 1760.00,
      otHours: 6.0,
      otPay: 198.00,
      claimsReimbursement: 0.00,
      grossTotal: 1958.00,
      statutoryDeductions: 215.38,
      netPay: 1742.62
    }
  ]
};

export const initialComplianceRules = [
  { id: 'R-1', title: 'Maximum Regular Weekly Hours', val: '40 hrs / week', desc: 'Any schedule or clocked time exceeding 40 regular hours triggers automated 1.5x overtime wage rate.' },
  { id: 'R-2', title: 'Mandatory Rest Period Between Shifts', val: '11 Hours Minimum', desc: 'Blocks back-to-back closing-to-opening ("clopening") shifts to prevent employee fatigue.' },
  { id: 'R-3', title: 'Mandatory Meal Break Threshold', val: '30 mins after 5 hrs', desc: 'Auto-logs mandatory unpaid meal break to comply with local labor regulations.' },
  { id: 'R-4', title: 'GPS Geofence Radius Lock', val: '50 Meters', desc: 'Employees must be physically inside store boundaries to clock in or out via mobile.' },
  { id: 'R-5', title: 'Health & Food Safety Certification Guardrail', val: 'Active Cert Required', desc: 'Alerts manager if an employee with an expired Food Handler or Typhoid cert is assigned to prep shifts.' }
];

export const initialSwaps = [
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
    reason: 'Doctor specialist appointment',
    compliance: {
      roleMatch: true,
      restPeriod: '26 hrs (Passes 11 hr min)',
      overtimeRisk: '0 hrs overtime added',
      status: 'Compliant'
    },
    approved: false
  }
];
