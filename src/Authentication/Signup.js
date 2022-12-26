import React, { useEffect } from'react';
import ReactDOM from'react-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { Indexstore } from '../store/Indexstore';
import { useNavigate  } from 'react-router';
import { observer } from 'mobx-react';
import { Alert, Space } from 'antd';

const Signup = observer(({Auth}) => {
    const { Authstore  } = Indexstore();

    const navigate = useNavigate();

    const [username,setusername] = React.useState("");
    const [password,setpassword] = React.useState("");
    

    useEffect(()=>{
      if(localStorage.getItem('isAuthenticated')=== "true"){
        navigate('/todos')
      }
    },[])
  
   

    const onFinish = (values) => {
      let database = Auth.userdatabase;
      let result = database.filter((user)=>{
          return user.username === values.username && user.password === values.password;
      })
    
      if(result.length){
        alert("Oops u have already registered...PLease log in");
      }
      else{
        console.log('Success:', values);
        Auth.gotologin()
        Auth.addtouserdatabase(values)
        navigate('/login')
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const gotologin = () => {
      console.log("show" , Authstore.issignup);
      navigate('/login')
      Authstore.gotologin();
    }

      return (
        <>
        <h1 style={{textAlign:"center", position:"relative"}}>SIGNUP</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
  
          >
            <Input placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/>
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Item>
    
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="link" style={{textAlign:"center", position:"relative"}}  onClick={gotologin}>Already has an account Click here ...</Button>
          </Form.Item>
        </Form>
        </>
      );
    }
)
              



export default Signup