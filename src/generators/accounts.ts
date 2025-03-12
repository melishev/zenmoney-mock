import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

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

  users.forEach((user) => {
    for (let i = 0; i < accountsPerUser; i++) {
      const instrument = faker.helpers.arrayElement(instruments)
      const type = faker.helpers.arrayElement(accountTypes)
      const balance = faker.number.float({ min: 0, max: 1000000, fractionDigits: 2 })

      accounts.push({
        id: uuidv4(),
        user: user.id,
        instrument: instrument.id,
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${faker.word.noun()}`,
        savings: faker.datatype.boolean(),
        balance,
        company: faker.helpers.arrayElement(companies).id,
        changed: Date.now(),
        syncID: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.finance.accountNumber()),
      })
    }
  })

  return accounts
}
