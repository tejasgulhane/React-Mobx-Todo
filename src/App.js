import './App.css';
// import Todo from './Component/Todo';
import { observe } from 'mobx';
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Maintodo from './Todo/Maintodo'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider, Button } from 'antd';
import { observer } from 'mobx-react'
import 'antd/dist/reset.css';
import { useEffect } from 'react';
import Protected from './Protected/Protected';

const App = observer(({ store ,Auth}) => {
  let isAuthenticated = localStorage.getItem('isAuthenticated')
    return(
      <>
      
        <Routes>
          <Route  exact path="/" element={ isAuthenticated == true ? <Maintodo /> : <Signup Auth={Auth}/> }  />
          <Route exact path="/login" element={<Protected Component={Login} Auth={Auth}/>} /> 
          <Route  path="/todos" element={ <Protected Component= {Maintodo} store={store} Auth={Auth} isAuthenticated={isAuthenticated}/> }/> 
        </Routes>

      </>
    );
}
)
 
export default App;