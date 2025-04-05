import { faker } from '@faker-js/faker'

import type { Country, Instrument, User } from '../entities'

/**
 * Генерирует список пользователей
 */
export function generateUsers(count: number, countries: Country[], instruments: Instrument[]): User[] {
  const users: User[] = []

  for (let i = 0; i < count; i++) {
    const randomCountry = faker.helpers.arrayElement(countries)
    users.push({
      id: i + 1,
      country: randomCountry.id,
      login: faker.internet.username(),
      parent: null,
      countryCode: faker.location.countryCode(),
      email: faker.internet.email(),
      changed: Date.now(),
      currency: instruments[0].id,
      paidTill: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 дней от текущей даты
      monthStartDay: faker.number.int({ min: 1, max: 28 }),
      isForecastEnabled: faker.datatype.boolean(),
      planBalanceMode: faker.helpers.arrayElement(['null', 'income', 'outcome']),
      planSettings: '{}',
      subscription: faker.helpers.arrayElement(['free', 'premium', 'pro']),
      subscriptionRenewalDate: null,
    })
  }

  return users
}
