# React с использованием Webpack и Jest

Информация о структуре и настройках проекта на React, который собирается с помощью Webpack и тестируется с использованием Jest.

## Начало работы

### Предварительные требования

Для работы с проектом вам понадобятся:
- Node.js (версия 12.x или выше)
- npm (обычно устанавливается вместе с Node.js)

### Установка

1. Клонируйте репозиторий:
```bash
   git clone https://github.com/sspopkov/react-starter
   cd react-starter
```

2. Установите зависимости:
```bash
   npm install
```

3. Запустите проект в режиме разработки:
```bash
   npm start
```
### Структура проекта

Проект организован следующим образом:
- src/: Исходный код приложения.
  - components/: React компоненты.
  - services/: Сервисы и утилиты.
  - tests/: Тесты для компонентов и сервисов.
- public/: Статические файлы, такие как index.html.
- dist/: Каталог для собранных файлов (создается Webpack при сборке).

По умолчанию сервер разработки будет доступен по адресу localhost:3000.

### Сборка проекта

Для создания оптимизированной версии приложения для продакшена выполните:

```bash
   npm run build
```
Команда создаст папку dist, содержащую все необходимые файлы.

## Тестирование

В проекте для написания и выполнения тестов используется Jest с дополнительной настройкой для обработки асинхронных операций и интеграции с MSW.

### Запуск тестов

Тесты запускаются командой:
```bash
   npm test
```
Эта команда использует скрипт scripts/test.js, который настраивает окружение для тестов.

### Конфигурация тестов

Настройки Jest для тестирования React компонентов определены в файле src/setupTests.ts:
```typescript
typescript
import "@testing-library/jest-dom";
import { server } from "./tests/server/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Мок-сервер для тестирования API
Для имитации API запросов используется Mock Service Worker (MSW). Это позволяет тестировать компоненты в изоляции от серверной части. Конфигурация мок-сервера находится в src/tests/server/server.ts.

```typescript
import { http } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./server-handlers";

const server = setupServer(...handlers);
export { server, http };
```

Обработчики API запросов определены в файле src/tests/server/server-handlers.ts:
```typescript
import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({
      id: "15d42a4d-1948-4de4-ba78-b8a893feaf45",
      firstName: "John",
    });
  }),
];
export { handlers };
```

## Вспомогательные функции и их тесты

В директории src/services/common/arrays/ находятся вспомогательные функции, такие как isNotEmptyArray. Тесты для этих функций расположены в src/services/tests/arrays/.

Функция isNotEmptyArray тестируется на корректность определения непустых массивов:
```typescript
import { describe, expect, test } from '@jest/globals';
import { isNotEmptyArray } from '../../common/arrays/is-not-empty-array';

const item: number[] = [1, 2, 3];
const item2: unknown = [];
const item3: unknown = {};
const item4 = 1;
const item5: { [key: string]: number }[] = [{ id: 1 }];

describe('отправляем данные и проверяем массив ли это и есть ли в нём значения ', () => {
  test('отправляем массив и проверяем, что он не пустой', () => {
    expect(isNotEmptyArray(item)).toBeTruthy();
  });
  test('отправляем массив и проверяем, что он пустой', () => {
    expect(isNotEmptyArray(item2)).toBeFalsy();
  });
  test('отправляем объект и проверяем, что он не массив', () => {
    expect(isNotEmptyArray(item3)).toBeFalsy();
  });
  test('отправляем число и проверяем, что он не массив', () => {
    expect(isNotEmptyArray(item4)).toBeFalsy();
  });
  test('отправляем массив и проверяем, что он не пустой', () => {
    expect(isNotEmptyArray(item5)).toBeTruthy();
  });
});
```
