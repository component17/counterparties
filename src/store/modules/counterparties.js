import arrayToTree from 'array-to-tree'

const store = {
    namespaced: true,
    state: {
        list: [],

        model: {
            name_full: '',
            name_short: '',
            type: 'LEGAL',

            address: '',

            inn: '',
            kpp: '',
            ogrn: '',

            management: {
                name: '',
                post: ''
            },

            ogrn_date: '',

        }
    },
    mutations: {
        setListOneItem(state, val){
            state.list.push(val);
            state.list.sort((a, b) => {
                if (a.name_short > b.name_short) {
                    return 1;
                }
                if (a.name_short < b.name_short) {
                    return -1;
                }
                return 0;
            });
        },
        setModel(state, val){
            state.model = {
                name_full: val.name.full_with_opf,
                name_short: val.name.short_with_opf,
                type: val.opf.type,

                address: val.address.value,

                inn: val.inn,
                kpp: val.kpp,
                ogrn: val.ogrn,

                management: {
                    name: val.management.name,
                    post: val.management.post
                },

                register: val.state.registration_date,
                status: val.state.status
            }
        }
    },
    actions: {
        getList({state}){
            return new Promise((resolve, reject) => {
                r.table('counterparties').orderBy('name_short').filter({deletedAt: null}).run(conn, (err, cursor) => {
                    if(err){
                        return reject(err);
                    }
                    cursor.toArray((err, data) => {
                        if(err){
                            return reject(err)
                        }
                        state.list = data;
                        resolve(data)
                    })
                })
            })
        }
    }
};

export default store;