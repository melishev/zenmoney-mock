import type {
  Account,
  Category,
  Instrument,
  Merchant,
  Organization,
  Transaction,
  User,
  ZMDiffResponse,
} from './entities'
import { generateAccounts } from './generators/accounts'
import { generateCategories } from './generators/categories'
import { generateCompanies } from './generators/companies'
import { generateInstruments } from './generators/instruments'
import { generateMerchants } from './generators/merchants'
import { generateTransactions } from './generators/transactions'
import { generateUsers } from './generators/users'
import type { MockDataOptions } from './types'

/**
 * Генератор мок-данных для финансового приложения
 */
export class MockDataGenerator {
  private readonly options: Required<MockDataOptions>
  private users: User[] = []
  private accounts: Account[] = []
  private categories: Category[] = []
  private transactions: Transaction[] = []
  private instruments: Instrument[] = []
  private merchants: Merchant[] = []
  private companies: Organization[] = []

  constructor(options: MockDataOptions = {}) {
    this.options = {
      usersCount: options.usersCount || 2,
      accountsPerUser: options.accountsPerUser || 3,
      categoriesPerUser: options.categoriesPerUser || 10,
      transactionsPerUser: options.transactionsPerUser || 30,
      instrumentsCount: options.instrumentsCount || 5,
      merchantsPerUser: options.merchantsPerUser || 8,
      companiesCount: options.companiesCount || 3,
    }
  }

  /**
   * Генерирует все данные в формате API-ответа
   */
  public generate(): ZMDiffResponse {
    this.instruments = generateInstruments(this.options.instrumentsCount)
    this.companies = generateCompanies(this.options.companiesCount)
    this.users = generateUsers(this.options.usersCount, this.instruments)
    this.accounts = generateAccounts(this.users, this.instruments, this.companies, this.options.accountsPerUser)
    this.categories = generateCategories(this.users, this.options.categoriesPerUser)
    this.merchants = generateMerchants(this.users, this.options.merchantsPerUser)
    this.transactions = generateTransactions(
      this.users,
      this.accounts,
      this.merchants,
      this.categories,
      this.options.transactionsPerUser,
    )

    return {
      account: this.accounts,
      budget: [],
      company: this.companies,
      country: [],
      instrument: this.instruments,
      merchant: this.merchants,
      reminder: [],
      reminderMarker: [],
      serverTimestamp: Date.now(),
      tag: this.categories,
      transaction: this.transactions,
      user: this.users,
    }
  }

  /**
   * Сохраняет сгенерированные данные в JSON файл
   */
  public saveToJson(fileName: string = 'mockData.json'): void {
    // Если используется в браузере
    if (typeof window !== 'undefined') {
      const dataStr = JSON.stringify(this.generate(), null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', fileName)
      linkElement.click()
    }
    // Если используется в Node.js среде, нужно добавить соответствующую логику с fs.writeFile
  }
}
