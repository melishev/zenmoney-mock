import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import type { Category, User } from '../entities'

/**
 * Генерирует список категорий
 */
export function generateCategories(users: User[], categoriesPerUser: number): Category[] {
  const categories: Category[] = []
  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  users.forEach((user) => {
    // Создаем родительские категории
    const parentCategories: Category[] = []
    const parentCategoriesCount = Math.min(5, Math.floor(categoriesPerUser / 2))

    for (let i = 0; i < parentCategoriesCount; i++) {
      const category: Category = {
        id: uuidv4(),
        user: user.id,
        title: faker.commerce.department(),
        color: faker.helpers.arrayElement(colors),
        changed: Date.now(),
        showIncome: faker.datatype.boolean(),
        showOutcome: faker.datatype.boolean(),
        budgetIncome: faker.datatype.boolean(),
        budgetOutcome: faker.datatype.boolean(),
      }
      parentCategories.push(category)
      categories.push(category)
    }

    // Создаем дочерние категории
    for (let i = 0; i < categoriesPerUser - parentCategoriesCount; i++) {
      const parentCategory = faker.helpers.arrayElement(parentCategories)
      const category: Category = {
        id: uuidv4(),
        user: user.id,
        title: faker.commerce.productName(),
        parent: parentCategory.id,
        color: faker.helpers.arrayElement(colors),
        changed: Date.now(),
        showIncome: faker.datatype.boolean(),
        showOutcome: faker.datatype.boolean(),
        budgetIncome: faker.datatype.boolean(),
        budgetOutcome: faker.datatype.boolean(),
      }
      categories.push(category)
    }
  })

  return categories
}
