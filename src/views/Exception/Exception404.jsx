import React from 'react';
import { Result } from 'antd';
import ThemeButton from 'views/Components/ThemeButton/ThemeButton'

const Exception404 = (props) => {
  function handleBack() {
    props.history.go(-1)
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <ThemeButton type="primary" onClick={handleBack}>
          返回上一级
      </ThemeButton>
      }
    />
  );
};

export default Exception404;

