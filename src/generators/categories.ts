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

  // Предопределенные цвета в формате ARGB
  const predefinedColors: number[] = [
    0xfff5f5fa, // Светло-серый
    0xffe15e44, // Красно-оранжевый
    0xffec9235, // Оранжевый
    0xfff1be41, // Желтый
    0xff89cf80, // Светло-зеленый
    0xff5fa454, // Зеленый
    0xff4a7e75, // Бирюзовый
    0xff59b3f0, // Голубой
    0xff3062b6, // Синий
    0xff7c67d4, // Фиолетовый
    0xff9030aa, // Пурпурный
    0xffbc3e76, // Розовый
    0xffd98aaf, // Светло-розовый
    0xff919299, // Серый
    0xff414141, // Темно-серый
  ]

  users.forEach((user) => {
    // Создаем родительские категории
    const parentCategories: Category[] = []
    const parentCategoriesCount = Math.min(categoriesPerUser / 2, 5)

    for (let i = 0; i < parentCategoriesCount; i++) {
      // 35% шанс того, что категория будет иметь цвет
      const shouldHaveColor = faker.number.int({ min: 1, max: 100 }) <= 35
      const categoryColor = shouldHaveColor ? faker.helpers.arrayElement(predefinedColors) : null

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
      // Для подкатегорий также 35% шанс получить цвет, если у родительской категории нет цвета
      const shouldHaveColor = parentCategory.color === null && faker.number.int({ min: 1, max: 100 }) <= 35
      const categoryColor = shouldHaveColor ? faker.helpers.arrayElement(predefinedColors) : parentCategory.color

      categories.push({
        id: crypto.randomUUID(),
        user: user.id,
        changed: Date.now(),
        icon: faker.helpers.arrayElement(iconCodes),
        budgetIncome: parentCategory.budgetIncome,
        budgetOutcome: parentCategory.budgetOutcome,
        required: faker.datatype.boolean(),
        color: categoryColor,
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
