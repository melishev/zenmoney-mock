import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import type { Merchant, User } from '../entities'

/**
 * Генерирует список получателей платежей
 */
export function generateMerchants(users: User[], merchantsPerUser: number): Merchant[] {
  const merchants: Merchant[] = []

  users.forEach((user) => {
    for (let i = 0; i < merchantsPerUser; i++) {
      merchants.push({
        id: uuidv4(),
        user: user.id,
        title: faker.company.name(),
        changed: Date.now(),
      })
    }
  })

  return merchants
}
