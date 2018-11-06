module.exports = {
    name: "Контрагенты", // Наименование модуля
    desc: "Справочник контрагенты", // Описание модуля
    version: "0.0.1", // Текущая версия
    namespace: 'counterparties', // Namespace нужен для разработки
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
        {
            name: 'counterparties',
            indexes: [],
        },
        {
            name: 'counterparties_faces',
            indexes: ['counterparties_id'],
        },
        {
            name: 'counterparties_bank_details',
            indexes: ['counterparties_id'],
        },
        {
            name: 'counterparties_locations',
            indexes: ['counterparties_id'],
        }

    ],
    permission: [
        {
            key: 'user-get-all',
            name: 'Получение списка пользователей',
            desc: 'Может получать список пользователей'
        }
    ]
};