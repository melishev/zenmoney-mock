import { faker } from '@faker-js/faker'

import type { Category, User } from '../entities'

/**
 * Генерирует список категорий
 */
export function generateCategories(users: User[], categoriesPerUser: number): Category[] {
  const categories: Category[] = []

  // Используем реальные коды иконок из iconCodesMap.ts
  const iconCodes = [
    '1001_bunch_ingredients', // Продукты
    '1002_diningroom', // Рестораны
    '1014_bakery', // Выпечка
    '1017_coffee_outdoor', // Кофе
    '1018_meat', // Мясо
    '2002_dancing', // Развлечения
    '2012_gallery', // Фото, галереи
    '2501_hand_biceps', // Спорт
    '3001_bus2', // Автобус
    '3004_taxi', // Такси
    '3005_train', // Поезд
    '3010_bus', // Общественный транспорт
    '4501_phone2', // Связь
    '5001_coat', // Одежда
    '5003_portrait_mode', // Стиль
    '5004_barbers_scissors', // Стрижка
    '5401_exterior', // Дом
    '5407_gas', // Газ
    '5502_retro_tv', // ТВ
    '6501_doctor_suitecase', // Медицина
    '6502_pill', // Лекарства
    '6503_doctor', // Доктор
    '6505_smoking', // Вредные привычки
    '7001_gift', // Подарки
    '7002_literature', // Книги
    '8001_question', // Прочее
    '8503_handshake', // Бизнес
    '9001_cash_receiving', // Доход
    '9007_tax', // Налоги
    '9014_percentage', // Проценты
  ]

  /**
   * Генерирует цвет в формате ARGB
   * color = (a << 24) + (r << 16) + (g << 8) + (b << 0)
   */
  function generateColor(): number {
    const a = 255 // Полная непрозрачность
    const r = faker.number.int({ min: 0, max: 255 })
    const g = faker.number.int({ min: 0, max: 255 })
    const b = faker.number.int({ min: 0, max: 255 })

    return (a << 24) + (r << 16) + (g << 8) + (b << 0)
  }

  // Генерируем набор уникальных цветов для использования в категориях
  const predefinedColors: number[] = Array.from({ length: 15 }, () => generateColor())

  users.forEach((user) => {
    // Создаем родительские категории
    const parentCategories: Category[] = []
    const parentCategoriesCount = Math.min(categoriesPerUser / 2, 5)

    for (let i = 0; i < parentCategoriesCount; i++) {
      const categoryColor = faker.helpers.arrayElement(predefinedColors)

      const category: Category = {
        id: crypto.randomUUID(),
        user: user.id,
        changed: Date.now(),
        icon: faker.helpers.arrayElement(iconCodes),
        budgetIncome: faker.datatype.boolean(),
        budgetOutcome: faker.datatype.boolean(),
        required: faker.datatype.boolean(),
        color: categoryColor,
        picture: null,
        title: faker.commerce.department(),
        showIncome: faker.datatype.boolean(),
        showOutcome: faker.datatype.boolean(),
        parent: null,
        staticId: null,
      }

      parentCategories.push(category)
      categories.push(category)
    }

    // Создаем подкатегории
    for (let i = 0; i < categoriesPerUser - parentCategoriesCount; i++) {
      const parentCategory = faker.helpers.arrayElement(parentCategories)

      categories.push({
        id: crypto.randomUUID(),
        user: user.id,
        changed: Date.now(),
        icon: faker.helpers.arrayElement(iconCodes),
        budgetIncome: parentCategory.budgetIncome,
        budgetOutcome: parentCategory.budgetOutcome,
        required: faker.datatype.boolean(),
        color: parentCategory.color, // Используем тот же цвет, что и у родительской категории
        picture: null,
        title: faker.commerce.productName(),
        showIncome: parentCategory.showIncome,
        showOutcome: parentCategory.showOutcome,
        parent: parentCategory.id,
        staticId: null,
      })
    }
  })

  return categories
}
