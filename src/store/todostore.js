import { observable, computed, action, makeObservable } from 'mobx';


class Todostore {
    todoitem =[];
    editindex="";
    addvalue=""

    constructor() {
        makeObservable(this, {
            todoitem: observable,
            editindex: observable,
            addtodo: action,
            deltodo: action,
            edittodo: action,
            edittodoarr: action,
            showtodo: computed,
        })
    }

    addtodo = (value) => {
        if(this.editvalue){
             this.addvalue = this.todoitem.find(this.editvalue)
        }
            this.todoitem.push(value)
    }

    deltodo = (item) =>{
        let index = this.todoitem.indexOf(item)
        this.todoitem.splice(index,1)
    }

    edittodo = (item) =>{
        const result = this.todoitem.indexOf(item);
        console.log(result);
        this.editindex= result
    }
    
    edittodoarr = (value) => {
        this.todoitem.fill(value,this.editindex,this.editindex+1)
    }

    get showtodo() {
        return this.todoitem;
    }

}



export default Todostore;