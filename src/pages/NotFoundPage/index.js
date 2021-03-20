import React from 'react';
import { Result, Button, Layout } from 'antd';
import { useHistory } from 'react-router-dom';

const subtitles = {
  403: 'Sorry, you are not authorized to access this page.',
  404: 'Sorry, the page you visited does not exist.',
  500: 'Sorry, something went wrong.',
};

const Exception = ({ code = 404 }) => {
  const history = useHistory();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Result
        status={code}
        title={code}
        subTitle={subtitles[code]}
        extra={
          <Button type='primary' onClick={() => history.replace('/')}>
            Back to Home
          </Button>
        }
      />
    </Layout>
  );
};

export default Exception;
