import React, {memo} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import './Login.less';
import { useNavigate} from 'react-router-dom'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Login = memo(() => {
  const navigate = useNavigate()
   const onFinish = (values: any) => {
    let {password} = values
    if(password == 111 ){
      navigate('/main',{
        replace:true
      })

    }
  };
  return (
    <div className="login">
      <div className="warrery">
        <h1 className='title'>欢迎来的快乐星球</h1>
        <Form name="login" 
        initialValues={{remember: true}} 
        className="loginFrom"
        onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{required: true, message: '账号不为空'}]}>
            <Input className='username' autoComplete="off" placeholder="请输入账号"  />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: '密码不为空'}]}>
            <Input.Password 
            className='password' 
            type="password" 
            placeholder="请输入密码" 
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone className='passIcon'  />
              ) : (
                <EyeInvisibleOutlined />
              )
            }
            
            
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='submit'>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
