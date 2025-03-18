# ZenMoney Mock Data Generator

Генератор моковых данных для ZenMoney API. Позволяет создавать тестовые данные, имитирующие реальный ответ API ZenMoney.

## Установка

Рекомендуется использовать этот проект в качестве Git submodule, что позволит оперативно вносить изменения при необходимости:

## Использование

### Базовое использование

```typescript
import { MockDataGenerator } from './zenmoney-mock/src';

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
import { MockDataGenerator } from './zenmoney-mock/src';

// Создание генератора с пользовательскими параметрами
const generator = new MockDataGenerator({
  usersCount: 5,
  accountsPerUser: 4,
  tagsPerUser: 12,
  transactionsPerUser: 50,
  instrumentsCount: 10,
  merchantsPerUser: 15
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
| tagsPerUser | Количество тэгов на пользователя | 10 |
| transactionsPerUser | Количество транзакций на пользователя | 30 |
| instrumentsCount | Количество валют | 5 |
| merchantsPerUser | Количество получателей на пользователя | 8 |
| companiesCount | Количество банков/компаний | 3 |

## Внесение изменений

Поскольку проект используется как Git submodule, вы можете легко вносить правки и дополнения:

1. Внесите необходимые изменения в код
2. Отправьте изменения в репозиторий
3. Обновите submodule в основном проекте

## Лицензия

MIT 