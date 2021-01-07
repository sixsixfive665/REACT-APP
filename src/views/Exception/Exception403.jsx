import React from 'react';
import { Result } from 'antd';
import ThemeButton from 'views/Components/ThemeButton/ThemeButton'

const Exception403 = (props) => {
  function handleBack() {
    props.history.go(-1)
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <ThemeButton type="primary" onClick={handleBack}>
          返回上一级
      </ThemeButton>
      }
    />
  );
};

export default Exception403;
