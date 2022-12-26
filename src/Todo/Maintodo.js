import React, { useEffect, useState } from "react";
import Todo from './Todo'
import { observer } from 'mobx-react'
import { useNavigate } from "react-router-dom";
import { Input, Space } from 'antd';
import { Indexstore } from "../store/Indexstore";
import { Alert } from 'antd';

const { Search } = Input;

const Maintodo = observer(() => {

  const store = Indexstore()
  const navigate = useNavigate();

  const [inputvalue , setinputvalue] = useState();
  const [editbtn , seteditbtn] = useState(false);

  const [closepopup,setclosepopup] = React.useState(true);
  
  setTimeout(() => {
        setclosepopup(false)
      }, 2500);

  const addtotodo = (values) => {
    console.log(values);
    if(store.todostore.showtodo.includes(values)){
      alert('opps duplicate todo not allowed ')
    }else{
    store.todostore.addtodo(values);
    }
    setinputvalue("")
  };
  const isAuthenticated=localStorage.getItem('isAuthenticated')
  const issignup=localStorage.getItem('issignup')

  useEffect(() => {
    if ( isAuthenticated === "false" ) {
      navigate("/login")
    }
    else {
      navigate("/todos")
    }
    },[]
  )

  const gotologout =()=>{ 
    store.Authstore.signout()
    navigate('/login')
  }

  const edit =(val) => {
    setinputvalue(val)
    store.todostore.edittodo(val)
    seteditbtn(true)
  }

  const edittodo =() => {
      store.todostore.edittodoarr(inputvalue)
      seteditbtn(false)
      setinputvalue("");
  }

  return (

    <>
    { closepopup && <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert
        description="LOGGED IN  SUCESSFULLY ..."
        type="success"
        showIcon
      />
  </Space>}
      <div className="App">
        <h1>TO DO APP</h1>
        
        <Input placeholder="TODO..."
        value={inputvalue}
        onChange={(e) => {
        setinputvalue(e.target.value)
        }}
        style={{width:"50%" ,marginRight:"5px"}}
        />

        {!editbtn && <button onClick={()=>addtotodo(inputvalue)} style={{width:"10%" ,marginRight:"35px" ,padding:"6px" , borderRadius:"5px" ,border:"none" , color:"#000",background:"orange"}}>Add</button>}
        { editbtn && <button onClick={()=>edittodo()} style={{width:"10%" ,marginRight:"35px" , border:"none" , color:"#000",background:"orange" ,padding:"6px" , borderRadius:"5px"}}>Edit</button>}

        <button style={{width:"10%" ,marginRight:"35px" ,padding:"4px" , borderRadius:"5px" ,position:"relative" ,top:-45 ,right:-160,border:"none",cursor:"pointer" ,color:"#fff" , background:"purple"}} onClick={gotologout}>LOGOUT</button>
      </div>

      <div>
        <Todo store={store.todostore} edit={edit} editbtn={editbtn}/>
      </div> 
      
    </>
  
  );
}
)

export default Maintodo;