import React, { Fragment } from 'react';
import { isLogin } from '../../middleware/auth';
import SideBar from '../../components/SideBar';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Layout, Menu, Image, Typography } from 'antd';
import Logo from '../../images/logo192.png';

const { Footer, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  if (!isLogin()) {
    return <Redirect to='/' />;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' style={{ boxShadow: '0px 3px 10px #00000029' }}>
        <div style={{ padding: 10 }}>
          <Image src={Logo} preview={false} style={{ padding: '10px 30px' }} />
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={['/history']}
          selectedKeys={[location.pathname]}
          mode='inline'
        >
          <Menu.Item key='/history'>
            <Link to='/history'>ข้อมูลการขาย</Link>
          </Menu.Item>
          <Menu.Item key='/stock'>
            <Link to='/stock'>คลังสินค้า</Link>
          </Menu.Item>
          <Menu.Item key='/employee-list'>
            <Link to='/employee-list'>พนักงาน</Link>
          </Menu.Item>
          <Menu.Item key='/logout'>
            <Link to='/logout'>ออกจากระบบ</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: 'white' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
