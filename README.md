# IQ Group | Тестовое задание

## Запуск проекта

```bash
pnpm i

pnpm build

pnpm preview
```

Или:

- Удалите файл `pnpm-lock.yaml`
- Удалите поля `packageManager` и `scripts.preinstall` в файле `package.json`

Затем:

```bash
npm i

npm build

npm preview
```

## Дополнительные библиотеки

### Development

- Prettier и ESLint - стандартный джентльменский набор
- commitlint, husky и lint-staged - имитация серьёзного проекта с CI/CD и всем подобным
- @total-typescript/ts-reset - делает работу со стандартной библиотекой TypeScript'а чуть более комфортной

### Production

- React Hook Form и @hookform/resolvers - для удобной работы с формами
- Maskito - добавить к инпутам удобные масочки
- Radix UI - парочка готовых, доступных и нестилизованных компонентов. Мог и сам написать всё то же самое, но время поджимало...
- Vanilla-extract - мой любимый способ писать стили. По сути, это просто типизированные SCSS модули с парочкой дополнительных плюшек
- libphonenumber-js - валидация телефонных номеров
- redux-persist - с бэкендом не совладал, пришлось хранить данные таким способом
- type-fest - библиотека очень удобных и полезных типов
- valibot - имитация серьёзного проекта с бэкендом, надо же как-то валидировать данные
