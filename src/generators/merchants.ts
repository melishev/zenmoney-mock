import { faker } from '@faker-js/faker'

import type { Merchant, User } from '../entities'

/**
 * Генерирует список продавцов
 */
export function generateMerchants(users: User[], merchantsPerUser: number): Merchant[] {
  const merchants: Merchant[] = []

  users.forEach((user) => {
    for (let i = 0; i < merchantsPerUser; i++) {
      merchants.push({
        id: crypto.randomUUID(),
        user: user.id,
        title: faker.company.name(),
        changed: Date.now(),
      })
    }
  })

  return merchants
}
