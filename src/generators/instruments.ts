import { faker } from '@faker-js/faker'

import type { Instrument } from '../entities'

/**
 * Генерирует список валют
 */
export function generateInstruments(count: number): Instrument[] {
  // Основные валюты, которые всегда должны быть
  const baseInstruments: Instrument[] = [
    {
      id: 1,
      changed: Date.now(),
      title: 'Российский рубль',
      shortTitle: 'RUB',
      symbol: '₽',
      rate: 1, // Базовая валюта, курс 1
    },
    {
      id: 2,
      changed: Date.now(),
      title: 'Доллар США',
      shortTitle: 'USD',
      symbol: '$',
      rate: 91.5, // Примерный курс к рублю
    },
    {
      id: 3,
      changed: Date.now(),
      title: 'Евро',
      shortTitle: 'EUR',
      symbol: '€',
      rate: 100.23, // Примерный курс к рублю
    },
  ]

  // Если запрошено меньше валют, чем в основном наборе, вернем только часть основного набора
  if (count <= baseInstruments.length) {
    return baseInstruments.slice(0, count)
  }

  // Иначе добавим ещё валют до нужного количества
  const instruments = [...baseInstruments]
  
  const symbols = ['£', '¥', '₩', '₺', '₴', '៛', '₫', '฿', '₱', '₦']
  const currencies = ['GBP', 'JPY', 'KRW', 'TRY', 'UAH', 'KHR', 'VND', 'THB', 'PHP', 'NGN']
  const currencyNames = [
    'Британский фунт',
    'Японская йена',
    'Южнокорейская вона',
    'Турецкая лира',
    'Украинская гривна',
    'Камбоджийский риель',
    'Вьетнамский донг',
    'Тайский бат',
    'Филиппинский песо',
    'Нигерийская найра',
  ]

  for (let i = baseInstruments.length; i < count; i++) {
    const index = i - baseInstruments.length
    
    instruments.push({
      id: i + 1,
      changed: Date.now(),
      title: currencyNames[index % currencyNames.length],
      shortTitle: currencies[index % currencies.length],
      symbol: symbols[index % symbols.length],
      rate: faker.number.float({ min: 0.01, max: 300, fractionDigits: 2 }), // Случайный курс к рублю
    })
  }

  return instruments
}
