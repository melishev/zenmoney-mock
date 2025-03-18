export interface User {
  id: number
  country: number
  login: string | null
  parent: number | null
  countryCode: string
  email: string
  changed: number
  currency: number
  paidTill: number
  monthStartDay: number
  isForecastEnabled: boolean
  planBalanceMode: string
  planSettings: string
  subscription: string
  subscriptionRenewalDate: null
}

export interface Account {
  id: string
  user: number
  instrument: number
  type: string
  role: null
  private: boolean
  savings: boolean
  title: string
  inBalance: boolean
  creditLimit: number
  startBalance: number
  balance: number
  company: number | null
  archive: boolean
  enableCorrection: boolean
  balanceCorrectionType: string
  startDate: string | null
  capitalization: boolean | null
  percent: number | null
  changed: number
  syncID: string[] | null
  enableSMS: boolean
  endDateOffset: number | null
  endDateOffsetInterval: string | null
  payoffStep: number | null
  payoffInterval: string | null
}

export interface Tag {
  id: string
  user: number
  changed: number
  icon: string
  budgetIncome: boolean
  budgetOutcome: boolean
  required: boolean | null
  color: number | null
  picture: null
  title: string
  showIncome: boolean
  showOutcome: boolean
  parent: string | null
  staticId: string | null
}

export interface Instrument {
  id: number
  title: string
  shortTitle?: string
  symbol: string
  rate: number
  changed: number
}

export interface Merchant {
  id: string
  user: number
  title: string
  changed: number
}

export interface Organization {
  id: number
  title: string
  www: string | null
  country: number | null
  fullTitle: string | null
  changed: number
  deleted: boolean
  countryCode: string | null
}

export interface Transaction {
  id: string
  user: number
  date: string
  income: number
  outcome: number
  changed: number
  incomeInstrument: number
  outcomeInstrument: number
  created: number
  originalPayee: string | null
  deleted: boolean
  viewed: boolean
  hold: boolean | null
  qrCode: string | null
  source: string | null
  incomeAccount: string
  outcomeAccount: string
  tag: string[] | null
  comment: string | null
  payee: string | null
  opIncome: number | null
  opOutcome: number | null
  opIncomeInstrument: null
  opOutcomeInstrument: null
  latitude: null
  longitude: null
  merchant: string | null
  incomeBankID: string | null
  outcomeBankID: string | null
  reminderMarker: string | null
}

export interface ZMDiffResponse {
  account: Account[]
  budget: any[]
  company: Organization[]
  country: any[]
  instrument: Instrument[]
  merchant: Merchant[]
  reminder: any[]
  reminderMarker: any[]
  serverTimestamp: number
  tag: Tag[]
  transaction: Transaction[]
  user: User[]
}
