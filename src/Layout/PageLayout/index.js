import React from 'react';
import { PageHeader, Button, Typography, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const PageLayout = ({
  title,
  subTitle = '',
  extra = [],
  children,
  shownBack = true,
  styleHeader,
}) => {
  const username = JSON.parse(localStorage.getItem('userData'))?.name;
  const history = useHistory();
  return (
    <div style={{ padding: '16px 24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Typography.Title
          level={3}
          style={{ margin: '0 10px', color: '#4A4A4A' }}
        >
          สวัสดี, คุณ {username}
          {/* สวัสดี, คุณ Dev */}
        </Typography.Title>
      </div>
      <PageHeader
        onBack={() => history.goBack()}
        backIcon={shownBack ? <ArrowLeftOutlined /> : false}
        title={title}
        subTitle={subTitle}
        extra={[...extra]}
        style={{ backgroundColor: 'white', ...styleHeader }}
      >
        {children}
      </PageHeader>
    </div>
  );
};

export default PageLayout;
