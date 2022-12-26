import React, { useEffect } from'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Alert, Space } from 'antd';

const Login = observer(({Auth}) => {

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(typeof isAuthenticated ,isAuthenticated ,typeof true , "isAuth");

  useEffect(()=>{
    if(isAuthenticated === "true"){
      navigate('/todos');
    }
  },[])
  const [closepopup,setclosepopup] = React.useState(true);

  setTimeout(() => {
        setclosepopup(false)
      }, 2500);
    
  


    const onFinish = (values) => {
        let database = Auth.userdatabase;
        let result = database.filter((user)=>{
            return user.username === values.username && user.password === values.password;
        })
      
        if(result.length){
          console.log('Success:', values);
          Auth.gotoTodo();
          navigate('/todos')
        }
        else{
          alert("Oops Invalid User name Or Password");
          console.log('Failed:', values);
        }
      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const submithandler = (e) =>{
        console.log("submit");
        e.preventDefault() ;
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
                message="Success Tips"
                description="USER REGISTERED SUCESSFULLY ..."
                type="success"
                showIcon
              />
          </Space>}
        <h1 style={{textAlign:"center", position:"relative"}}>LOGIN</h1>
        <Form
          onSubmit={submithandler}
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
            <Input />
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
            <Input.Password />
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
          </Form.Item>
        </Form>
        </>
      );
    })
              



export default Login