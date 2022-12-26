import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Divider, List, Typography } from 'antd';
import { Button } from 'antd';
import './todo.css'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Pagination from '../Pagination/Pagination';
const { Search } = Input;

const Todo = observer(({ store , edit ,editbtn}) => {

   
    const [data, showdata] = useState(store.showtodo);
    
    let [currentpage, setcurrentpage] = useState(1);
    let [selectedindex, setselectedindex] = useState();
    let [checkeditclicked, setcheckeditclicked] = useState(false);
    let [postperpage] = useState(5);

    const indexoflastpost = currentpage * postperpage;
    const indexoffirstpost = indexoflastpost - postperpage;

    const currentpost = data.slice(indexoffirstpost,indexoflastpost)

    let pushdata = JSON.parse(localStorage.getItem('todoitem'))
    console.log(pushdata, "pushdata");

    useEffect(() => {
        console.log(store.showtodo, "store.showtodo");
    }, [store.todoitem]
    )

    const removetodo = (name) => {
        store.deltodo(name)
        console.log(name);
    }
    const edittodo = (item,index) => {
        store.edittodo(item)
        edit(item)
        setselectedindex(index)
        setcheckeditclicked(true)
    }

    const onSearch = (value) => {
        if (value.length == 0) {
            showdata(store.showtodo)
        }
        else {
            let fdata = store.showtodo.filter((todo) => {
                if (todo.includes(value)) {
                    return todo
                }
            })
            console.log(fdata);
            showdata(fdata)
        }

    }

    const showpage = (val) => {
        setcurrentpage(val)
    }

console.log(edit);
  if(checkeditclicked){

      if(!editbtn){
          console.log("edit  btn" , editbtn);
          console.log("selselectedindex" ,selectedindex);
          document.getElementById(selectedindex).classList.remove("active")
        }
        else{
            console.log("edit  btn" , editbtn);
            console.log("selselectedindex" ,selectedindex);
            document.getElementById(selectedindex).classList.add('active');
        }
        
    }

    return (
        <>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200, position: "relative", right: "-85%", top: -33 }} />
            <div className='todo_list_container'>
            {currentpost.length ? currentpost.map((item,index) => {
                return (
                    <div className='todo_list' id={index}>
                        <div>
                            <List.Item key={item}>{item}</List.Item>
                        </div>
                        { !editbtn && <div className='todo_list_buttons'>
                            <Button type="primary" onClick={() => removetodo(item)} style={{background:"red", color:"#111"}}>Del</Button>
                            <Button type="dashed" onClick={() => {edittodo(item,index)}} style={{background:"lightblue", color:"#111"}}>Edit</Button>
                        </div>
                        }
                    </div>
                )
            }) : <h1>NO Todo is Added...</h1>}
            </div>
           <Pagination store={store} postperpage={postperpage} showpage={showpage}/>

        </>
    )
}
)

export default Todo;