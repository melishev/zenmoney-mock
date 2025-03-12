# ZenMoney Mock Data Generator

Генератор моковых данных для ZenMoney API. Позволяет создавать тестовые данные, имитирующие реальный ответ API ZenMoney.

## Установка

```bash
npm install zenmoney-mock
```

## Использование

### Базовое использование

```typescript
import { MockDataGenerator } from 'zenmoney-mock';

// Создание генератора с параметрами по умолчанию
const generator = new MockDataGenerator();

// Генерация данных
const mockData = generator.generate();

// Использование данных
console.log(mockData.user);
console.log(mockData.account);
```

### Настройка генерации

```typescript
import { MockDataGenerator } from 'zenmoney-mock';

// Создание генератора с пользовательскими параметрами
const generator = new MockDataGenerator({
  usersCount: 5,
  accountsPerUser: 4,
  categoriesPerUser: 12,
  transactionsPerUser: 50,
  instrumentsCount: 10,
  merchantsPerUser: 15,
  companiesCount: 5
});

// Генерация данных
const mockData = generator.generate();
```

### Сохранение в JSON (только в браузере)

```typescript
const generator = new MockDataGenerator();
generator.saveToJson('my-mock-data.json');
```

## Доступные настройки

| Параметр | Описание | Значение по умолчанию |
|----------|----------|----------------------|
| usersCount | Количество пользователей | 2 |
| accountsPerUser | Количество счетов на пользователя | 3 |
| categoriesPerUser | Количество категорий на пользователя | 10 |
| transactionsPerUser | Количество транзакций на пользователя | 30 |
| instrumentsCount | Количество валют | 5 |
| merchantsPerUser | Количество получателей на пользователя | 8 |
| companiesCount | Количество банков/компаний | 3 |

## Лицензия

MIT 