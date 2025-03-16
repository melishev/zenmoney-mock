import { faker } from '@faker-js/faker'

import type { Account, Instrument, Organization, User } from '../entities'
/**
 * Генерирует список счетов
 */
export function generateAccounts(
  users: User[],
  instruments: Instrument[],
  companies: Organization[],
  accountsPerUser: number,
): Account[] {
  const accounts: Account[] = []
  const accountTypes = ['cash', 'ccard', 'checking', 'loan', 'deposit', 'investment']

  const createAccount = (user: User, type: string) => {
    const instrument = faker.helpers.arrayElement(instruments)
    const balance = faker.number.float({ min: 0, max: 1000000, fractionDigits: 2 })

    return {
      id: crypto.randomUUID(),
      user: user.id,
      instrument: instrument.id,
      type,
      role: null,
      private: faker.datatype.boolean(),
      savings: faker.datatype.boolean(),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${faker.word.noun()}`,
      inBalance: faker.datatype.boolean(),
      creditLimit: type === 'ccard' ? faker.number.float({ min: 10000, max: 500000, fractionDigits: 2 }) : 0,
      startBalance: faker.number.float({ min: 0, max: 100000, fractionDigits: 2 }),
      balance,
      company: faker.helpers.arrayElement(companies).id,
      archive: false,
      enableCorrection: faker.datatype.boolean(),
      balanceCorrectionType: faker.helpers.arrayElement(['income', 'outcome', 'balanced']),
      startDate: faker.date.recent().toISOString(),
      capitalization: type === 'deposit' ? faker.datatype.boolean() : null,
      percent:
        type === 'deposit' || type === 'loan' ? faker.number.float({ min: 1, max: 20, fractionDigits: 2 }) : null,
      changed: Date.now(),
      syncID: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.finance.accountNumber()),
      enableSMS: faker.datatype.boolean(),
      endDateOffset: type === 'deposit' || type === 'loan' ? faker.number.int({ min: 3, max: 60 }) : null,
      endDateOffsetInterval:
        type === 'deposit' || type === 'loan' ? faker.helpers.arrayElement(['month', 'year']) : null,
      payoffStep: type === 'loan' ? faker.number.int({ min: 1, max: 30 }) : null,
      payoffInterval: type === 'loan' ? faker.helpers.arrayElement(['day', 'month']) : null,
    }
  }

  users.forEach((user) => {
    // Создаем обязательные типы счетов
    accounts.push(createAccount(user, 'ccard'))
    accounts.push(createAccount(user, 'checking'))

    // Создаем оставшиеся случайные счета
    for (let i = 0; i < accountsPerUser - 2; i++) {
      const type = faker.helpers.arrayElement(accountTypes)
      accounts.push(createAccount(user, type))
    }
  })

  return accounts
}
