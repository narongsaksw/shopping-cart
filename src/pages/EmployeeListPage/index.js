import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import EntryCard from '../../components/EntryCard';
import InputText from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { PageHeader } from '../style';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  padding: 0 50px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const HookForm = styled.form``;
const Label = styled.label``;

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    firstname: `Firstname ${i}`,
    lastname: `Lastname ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    email: `Email no. ${i}`,
    password: `Password no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function EmployeeList() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    reset();
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'firstname',
      // width: '25%',
      editable: true,
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      // width: '25%',
      editable: true,
    },
    {
      title: 'อายุ',
      dataIndex: 'age',
      // width: '15%',
      editable: true,
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      // width: '15%',
      editable: true,
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      // width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href='javascript:;'
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Container>
      <EntryCard style={{ padding: '10px 50px' }}>
        <PageHeader to='/'>ฟอร์ม</PageHeader>
        <HookForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor='firstname'>ชื่อ</Label>
            <InputText
              id='firstname'
              name='firstname'
              type='text'
              ref={register({
                required: 'required',
              })}
            />
            {errors.firstname && (
              <ErrorMessage role='alert'>
                *{errors.firstname.message}
              </ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='lastname'>นามสกุล</Label>
            <InputText
              id='lastname'
              name='lastname'
              type='text'
              ref={register({
                required: 'required',
              })}
            />
            {errors.lastname && (
              <ErrorMessage role='alert'>
                *{errors.lastname.message}
              </ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='age'>อายุ</Label>
            <InputText
              id='age'
              name='age'
              type='number'
              ref={register({
                required: 'required',
              })}
            />
            {errors.age && (
              <ErrorMessage role='alert'>*{errors.age.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='email'>อีเมล</Label>
            <InputText
              id='email'
              name='email'
              type='email'
              ref={register({
                required: 'required',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Entered value does not match email format',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>*{errors.email.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='password'>รหัสผ่าน</Label>
            <InputText
              id='password'
              name='password'
              ref={register({
                required: 'required',
                minLength: {
                  value: 5,
                  message: 'min length is 5',
                },
              })}
              type='password'
            />
            {errors.password && (
              <ErrorMessage>*{errors.password.message}</ErrorMessage>
            )}
          </InputGroup>
          <Button type='submit' full>
            SUBMIT
          </Button>
        </HookForm>
      </EntryCard>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Container>
  );
}

export default EmployeeList;
