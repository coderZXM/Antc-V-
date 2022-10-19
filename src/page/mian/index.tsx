import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu } from 'antd';
import { Layout ,Breadcrumb ,Menu} from 'antd';
import React from 'react';
import {Outlet , Link,useNavigate } from 'react-router-dom'


const { Header, Content, Footer, Sider } = Layout

const items1: MenuProps['items'] = ['首页', '拖拽', '柱状图'].map((key,index) => ({
  key:index,
  label: `${key}`,
}));

const items2: MenuProps['items'] = ['流程图', '拖拽', '柱状图'].map(
  (item, index) => {
    const key = String(index + 1);
    return {
      key: `${key}`,
      label: `${item}`,
    };
  },
);


const Main: React.FC = () =>{
  const navigate  = useNavigate()
  const changePage = (e : any) => {
    let {key}  = e
   if(key == 1) {
     navigate('columnar',{
      replace:true 
     })
   }else if (key == 2) {
     navigate('drag',{
       replace:true
     })
   }else {
    navigate('pie',{
      replace:true
    })
     
   }
  
  }
  const changeTab = (e : any)=>{
    let {key}  = e
    if(key == 0) {
      navigate('columnar',{
       replace:true 
      })
    }else if (key == 1) {
      navigate('drag',{
        replace:true
      })
    }else {
     navigate('pie',{
       replace:true
     })
      
    }
   
  }
  return (
    <Layout style={{height:'100vh'}}>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} onClick={changeTab} />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' , height:'100%' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
            onClick={changePage}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Outlet/>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}

export default Main;