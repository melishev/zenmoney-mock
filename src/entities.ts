/**
 * Типы сущностей для генератора мок-данных
 */

export interface User {
  id: number
  changed: number
  login?: string
  currency: number
  parent?: number
}

export interface Account {
  id: string
  changed: number
  user: number
  role?: number
  instrument: number
  company?: number
  type: string
  title: string
  balance: number
  syncID?: string[]
  savings: boolean
}

export interface Category {
  id: string
  changed: number
  user: number
  title: string
  parent?: string
  color?: number
  showIncome: boolean
  showOutcome: boolean
  budgetIncome: boolean
  budgetOutcome: boolean
}

export interface Instrument {
  id: number
  changed: number
  title: string
  shortTitle: string
  symbol: string
  rate: number
}

export interface Merchant {
  id: string
  changed: number
  user: number
  title: string
}

export interface Organization {
  id: number
  changed: number
  title: string
  fullTitle: string
  www?: string
  country?: string
}

export interface Transaction {
  id: string
  changed: number
  created: number
  user: number
  deleted: boolean
  incomeInstrument: number
  incomeAccount: string
  income: number
  outcomeInstrument: number
  outcomeAccount: string
  outcome: number
  tag?: string[]
  merchant?: string
  payee?: string
  originalPayee?: string
  comment?: string
  date: string
  mcc?: number
  reminderMarker?: string
  opIncome?: number
  opIncomeInstrument?: number
  opOutcome?: number
  opOutcomeInstrument?: number
  latitude?: number
  longitude?: number
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
  tag: Category[]
  transaction: Transaction[]
  user: User[]
} 