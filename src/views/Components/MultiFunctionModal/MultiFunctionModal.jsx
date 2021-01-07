import React from 'react';
import { Modal } from 'antd'

const MultiFunctionModal = (props) => {
  return (
    <Modal
      {...props}
      style={{ ...props.style, borderRadius: '8px' }}
      centered={true}
      footer={null}
      maskClosable={true}
      title={props.type === 'Create' ? '新建' : props.type === 'Edit' ? '编辑' : '其他'}
      width={props.width ? props.width : '600px'}
    >
      {props.children}
    </Modal>
  );
};

export default MultiFunctionModal; 