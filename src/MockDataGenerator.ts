import type {
  Account,
  Country,
  Instrument,
  Merchant,
  Organization,
  Tag,
  Transaction,
  User,
  ZMDiffResponse,
} from './entities'
import { generateAccounts } from './generators/accounts'
import { generateCompanies } from './generators/companies'
import { generateCountries } from './generators/countries'
import { generateInstruments } from './generators/instruments'
import { generateMerchants } from './generators/merchants'
import { generateTags } from './generators/tags'
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
  private tags: Tag[] = []
  private transactions: Transaction[] = []
  private instruments: Instrument[] = []
  private merchants: Merchant[] = []
  private companies: Organization[] = []
  private countries: Country[] = []

  constructor(options: MockDataOptions = {}) {
    this.options = {
      usersCount: options.usersCount || 2,
      accountsPerUser: options.accountsPerUser || 3,
      tagsPerUser: options.tagsPerUser || 10,
      transactionsPerUser: options.transactionsPerUser || 365,
      merchantsPerUser: options.merchantsPerUser || 8,
      companiesCount: options.companiesCount || 3,
    }
  }

  /**
   * Генерирует все данные в формате API-ответа
   */
  public generate(): ZMDiffResponse {
    this.instruments = generateInstruments()
    this.companies = generateCompanies()
    this.countries = generateCountries()
    this.users = generateUsers(this.options.usersCount, this.countries, this.instruments)
    this.accounts = generateAccounts(this.users, this.instruments, this.companies, this.options.accountsPerUser)
    this.tags = generateTags(this.users, this.options.tagsPerUser)
    this.merchants = generateMerchants(this.users, this.options.merchantsPerUser)
    this.transactions = generateTransactions(
      this.users,
      this.accounts,
      this.merchants,
      this.tags,
      this.options.transactionsPerUser,
    )

    return {
      account: this.accounts,
      budget: [],
      company: this.companies,
      country: this.countries,
      instrument: this.instruments,
      merchant: this.merchants,
      reminder: [],
      reminderMarker: [],
      serverTimestamp: Date.now(),
      tag: this.tags,
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
