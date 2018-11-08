export default class Contr{
    constructor(){
        this.property = {
            name: ''
        }
    }

    create(data){
        this.property = {
            name: data.name,
            delete_at: null
        }
    }

    update(id, data){

    }

    delete(id){
        r.table('4444')get(id).update({delete_at: new Date()})
    }

    getList(){

    }


}