import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import '../Todo/todo.css'

const Pagination = observer(({store , postperpage ,showpage }) => {

    console.log(store.todoitem.length ,"lenth");
    console.log(postperpage ,"postperpage");
    
    const pagenumber = []

    for(let i=0;i<Math.ceil(store.todoitem.length/postperpage);i++)
    {
      pagenumber.push(i+1)
    }

  return (
    <div className='pagination'>
    { 
      pagenumber.map((pagenumber)=>{
        return(
          <div onClick={() => showpage(pagenumber)} id="1">
             <h4>{pagenumber}</h4>
          </div>
        )
      })
    }
      
    </div>
  )
})

export default Pagination
