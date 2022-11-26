import React from 'react';
import {
  required,
  Edit,
  SimpleForm,
  TextInput
} from 'react-admin';

const MeasurementTitle = ({record}) => {
  return <span>{`${record.name}`}</span>;
};

export default (props) => (
  <Edit title={<MeasurementTitle />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput source="name" validate={required()}/>
        <TextInput source="unit"/>
      </SimpleForm>
  </Edit>
);
