import React from 'react';
import {Create, SimpleForm, TextInput, SelectInput, required} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import {DateInput} from 'react-admin-date-inputs';

export default (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" validate={required()}/>
      <TextInput source="username" validate={required()}/>
      <TextInput source="fullname" validate={required()}/>
      <TextInput source="plain_password" validate={required()}/>
      <DateInput source="date_of_birth" providerOptions={{utils: MomentUtils}}/>
      <SelectInput source="gender" allowEmpty choices={[
        {id: 'male', name: 'resources.users.custom.options.gender.male'},
        {id: 'female', name: 'resources.users.custom.options.gender.female'},
      ]}/>
      <TextInput source="phone"/>
    </SimpleForm>
  </Create>
);
