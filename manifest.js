module.exports = {
    name: "Контрагенты", // Наименование модуля
    desc: "Справочник контрагенты", // Описание модуля
    version: "0.0.1", // Текущая версия
    namespace: 'counterparties', // Namspace нужен для разработки
    icon: "briefcase", // Иконка приложения в основном меню
    endpoint: {
        dev: {
            type: "web",
            url: 'http://localhost:8080'
        },
        prod: {
            type: 'file',
            endpointDir: '/dist',
            endpointFile: 'index.html'
        }
    },
    databaseTables: [
        'users'
    ],
    permission: [
        {
            key: 'user-get-all',
            name: 'Получение списка пользователей',
            desc: 'Может получать список пользователей'
        }
    ]
};