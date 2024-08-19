module.exports = {
    preset: 'ts-jest', // Используем ts-jest для тестов TypeScript
    testEnvironment: 'jsdom', // Тестируем в среде, похожей на браузер
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Обработка CSS-модулей (опционально)
      // Добавьте другие сопоставления модулей, если необходимо
    },
  };