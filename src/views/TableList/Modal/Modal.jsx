import React from 'react';
import { Form, Input } from 'antd'
import ThemeButton from 'views/Components/ThemeButton/ThemeButton'
import MultiFunctionModal from 'views/Components/MultiFunctionModal/MultiFunctionModal'

const Modal = (props) => {
  function handleSubmit(values) {
    // console.log('完事收工!', values)
    props.toggleModalVisible()
  }
  return (
    <div>
      <MultiFunctionModal
        {...props}
        onCancel={props.toggleModalVisible}
        width='500px'
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          name="multiFunctionModal"
          initialValues={{ ...props.editData }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="家庭地址"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'end' }}>
            <ThemeButton style={{ marginRight: '15px' }} htmlType="submit">确定</ThemeButton>
          </Form.Item>
        </Form>
      </MultiFunctionModal>
    </div>
  );
};

export default Modal;