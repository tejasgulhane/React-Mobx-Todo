import { observable, computed, action, autorun, makeObservable } from 'mobx';
import { useNavigate  } from 'react-router';
import { Navigate } from 'react-router';
import { makePersistable , clearPersistedStore ,clearPersist } from 'mobx-persist-store';

class Authstore {
   

    issignup = false
    isAuthenticated =false
    userdatabase= []
    loggedinuser= []

    constructor() {
        makeObservable(this , {
            issignup:observable,
            userdatabase:observable,
            isAuthenticated:observable,
            loggedinuser:observable,
            gotologin:action,
            gotoTodo:action,
            signout:action,
        });

    makePersistable(this, { name: 'Authstore', properties: ['userdatabase','loggedinuser'], storage: window.localStorage });

    clearPersistedStore(this.loggedinuser);
          
    }

    gotologin =() =>{
        this.issignup = true;
        localStorage.setItem("issignup",true)
    }

    addtouserdatabase = (data) => {
        this.userdatabase.push(data)
    }

    signout = () =>{
        this.issignup = false;
        this.isAuthenticated =false  
        localStorage.setItem("isAuthenticated",false)
        localStorage.setItem("issignup",false)

    }

    gotoTodo =() =>{
        localStorage.setItem("isAuthenticated",true)
        this.isAuthenticated = true;
    }

}

export default Authstore;
