import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Authentication/Login'
import { Indexstore } from '../store/Indexstore';

const Protected = observer(({Component ,Auth}) => {

   const store = Indexstore();

    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    useEffect(()=>{
      if( isAuthenticated === false)
        {
            navigate('/login')
        }
    },[isAuthenticated])

  return (
    <div>
      <Component Auth={Auth}/>
    </div>
  )
}
)
export default Protected
