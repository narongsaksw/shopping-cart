import React from 'react';
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

const Column = styled.div`
  text-align: center;
`;

const Record = styled.div`
  text-align: center;
`;

const HookForm = styled.form``;
const Label = styled.label``;

const originData = [];

for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    name: `name ${i}`,
    material: `material ${i}`,
    unit: ` ${i}`,
    price: ` ${i}`,
    phoneNumber: '0812345678',
  });
}
function Stock() {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);
    reset();
  };
  const phoneNumberFormat = (val) => {
    //08-1234-5678
    let phoneNumber;
    const pn = val.split('');
    phoneNumber = `${pn[0]}${pn[1]}-${pn[2]}${pn[3]}${pn[4]}${pn[5]}-${pn[6]}${pn[7]}${pn[8]}${pn[9]}`;
    return phoneNumber;
  };
  const columns = [
    {
      title: <Column>ลำดับที่</Column>,
      dataIndex: 'key',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>ผู้ค้า</Column>,
      dataIndex: 'name',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>วัตถุดิบ</Column>,
      dataIndex: 'material',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>เบอร์ติดต่อ</Column>,
      dataIndex: 'phoneNumber',
      render: (text) => <Record>{phoneNumberFormat(text)}</Record>,
    },
  ];
  return (
    <Container>
      <EntryCard style={{ padding: '10px 50px' }}>
        <PageHeader to='/'>สต็อค</PageHeader>
        <HookForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor='name'>ชื่อ</Label>
            <InputText
              id='name'
              name='name'
              type='text'
              ref={register({
                required: 'required',
              })}
            />
            {errors.name && (
              <ErrorMessage role='alert'>*{errors.name.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='meterial'>วัตถุดิบ</Label>
            <InputText
              id='meterial'
              name='meterial'
              type='string'
              ref={register({
                required: 'required',
              })}
            />
            {errors.meterial && (
              <ErrorMessage role='alert'>
                *{errors.meterial.message}
              </ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='unit'>จำนวน</Label>
            <InputText
              id='unit'
              name='unit'
              type='number'
              ref={register({
                required: 'required',
              })}
            />
            {errors.meterial && (
              <ErrorMessage role='alert'>*{errors.unit.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='price'>ราคา</Label>
            <InputText
              id='price'
              name='price'
              type='number'
              ref={register({
                required: 'required',
              })}
            />
            {errors.meterial && (
              <ErrorMessage role='alert'>*{errors.price.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label htmlFor='phoneNumber'>เบอร์ติดต่อ</Label>
            <InputText
              id='phoneNumber'
              name='phoneNumber'
              type='string'
              ref={register({
                required: 'required',
              })}
            />
            {errors.phoneNumber && (
              <ErrorMessage>*{errors.phoneNumber.message}</ErrorMessage>
            )}
          </InputGroup>
          <Button type='submit' full>
            SUBMIT
          </Button>
        </HookForm>
      </EntryCard>
      <Table columns={columns} dataSource={originData} />
    </Container>
  );
}

export default Stock;
