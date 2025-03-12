import { faker } from '@faker-js/faker'

import type { Instrument, User } from '../entities'

/**
 * Генерирует список пользователей
 */
export function generateUsers(count: number, instruments: Instrument[]): User[] {
  const users: User[] = []
  
  // Создаем родительского пользователя, если запрошено более 1 пользователя
  if (count > 1) {
    const parentUser: User = {
      id: 1,
      changed: Date.now(),
      login: faker.internet.userName(),
      currency: instruments[0].id, // Используем первую валюту как основную
    }
    users.push(parentUser)
    
    // Создаем дочерних пользователей
    for (let i = 1; i < count; i++) {
      users.push({
        id: i + 1,
        changed: Date.now(),
        login: faker.internet.userName(),
        currency: faker.helpers.arrayElement(instruments).id,
        parent: parentUser.id, // Ссылка на родительского пользователя
      })
    }
  } else if (count === 1) {
    // Если запрошен только один пользователь, создаем его без родителя
    users.push({
      id: 1,
      changed: Date.now(),
      login: faker.internet.userName(),
      currency: instruments[0].id,
    })
  }
  
  return users
}
