import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Divider, message, Popconfirm, Input } from 'antd';
import ThemeButton from 'views/Components/ThemeButton/ThemeButton'
import { table } from 'api/mock'
import { QuestionCircleOutlined } from '@ant-design/icons';
import MultiFunctionModal from './Modal/Modal'

const TableList = (props) => {
  const actionPermissions = useRef()
  const timer = useRef()
  timer.current = true
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '家庭住址',
      dataIndex: 'address'
    },
    {
      title: '操作',
      key: 'action',
      render: (scope) => (
        <Space size="middle">
          <span className="action_sapn_tag" onClick={() => { handleEdit(scope) }}>Edit</span>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除？"
            icon={<QuestionCircleOutlined
              style={{ color: 'red' }} />}
            onConfirm={() => {
              handleDelete(scope)
            }}
            cancelText="取消"
            okText="确定">
            <span className="action_sapn_tag">Delete</span>
          </Popconfirm>
        </Space>
      ),
    }
  ]
  const [dataSource, setDataSource] = useState([])
  const [tableState, setTableState] = useState({
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 50
    }
  })
  const [multiFunctionModalData, setMultiFunctionModalData] = useState({
    type: 'Create',
    visible: false,
    editData: {}
  })
  const nameRef = useRef()
  const ageRef = useRef()

  function requestTableData() {
    setTableState({
      ...tableState,
      loading: true
    })
    table().then(res => {
      if (res.code === 0) {
        if (timer.current) {
          setDataSource(res.data.items)
          setTableState({ ...tableState, loading: false })
        }
      } else {
        message.error('请求错误')
        if (timer.current) {
          setTableState({ ...tableState, loading: false })
        }
      }
    })
  }

  function handleChange(val) {
    setTableState({
      ...tableState,
      pagination: {
        ...tableState.pagination,
        current: val.current
      }
    })
  }

  function handleDelete(data) {
    alert(data.key)
  }

  function toggleModalVisible() {
    setMultiFunctionModalData({
      visible: false,
      editData: {}
    })
  }

  function handleEdit(data) {
    setMultiFunctionModalData({
      type: 'Edit',
      visible: true,
      editData: data
    })
  }

  function handleCreate() {
    setMultiFunctionModalData({
      type: 'Create',
      visible: true
    })
  }

  function handleSearch() {
    console.log(nameRef.current.state.value)
    console.log(ageRef.current.state.value)
  }

  /* eslint-disable */
  useEffect(() => {
    actionPermissions.current = props.route.actionPermissions
    // console.log(actionPermissions)
    requestTableData()
    return () => {
      timer.current = false
    }
  }, [])
  /* eslint-disable */

  return (
    <div className="table_container">
      <div className="table_header">
        <Input style={{ width: '120px', marginRight: '10px' }} placeholder="姓名" allowClear ref={nameRef} />
        <Input style={{ width: '120px', marginRight: '10px' }} placeholder="年龄" allowClear ref={ageRef} />
        <ThemeButton onClick={handleSearch}>Search Button</ThemeButton>
        <ThemeButton className="fl_right" onClick={handleCreate} disabled>Create Button</ThemeButton>
      </div>
      <Table
        {...tableState}
        dataSource={dataSource}
        columns={columns}
        onChange={handleChange}
        expandable={{
          expandedRowRender: record => <div style={{ margin: 0 }}>{record.description}</div>
        }} />
      {multiFunctionModalData.visible
        ? <MultiFunctionModal {...multiFunctionModalData} toggleModalVisible={toggleModalVisible} />
        : ''}
    </div>
  );
};

export default TableList;