import React from 'react';
import {
  translate,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  SelectArrayInput,
  ReferenceArrayInput,
  required
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import {DateInput} from 'react-admin-date-inputs';

const UserTitle = translate(({translate, record}) => {
  return <span>{`${translate('resources.users.name', 5)} ${record.fullname ? `${record.fullname}` : `${record.email}`}`}</span>;
});

export default ({permissions, ...props}) => (
  <Edit title={<UserTitle/>} {...props}>
    <SimpleForm>
      <TextInput disabled source="id"/>
      <TextInput disabled source="email"/>
      <TextInput source="fullname" validate={required()}/>
      <TextInput disabled source="username"/>
      <DateInput source="date_of_birth" providerOptions={{utils: MomentUtils}}/>
      <SelectInput source="gender" allowEmpty choices={[
        {id: 'male', name: 'resources.users.custom.options.gender.male'},
        {id: 'female', name: 'resources.users.custom.options.gender.female'},
      ]}/>
      <TextInput source="phone"/>
      <BooleanInput source="enabled"/>
      {permissions && permissions.includes('USERS_EDIT_GROUPS') &&
      <ReferenceArrayInput source="groups" reference="groups" allowEmpty>
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      }
      {permissions && permissions.includes('USERS_EDIT_PATIENTS') &&
      <ReferenceArrayInput source="patients" reference="users" allowEmpty>
        <SelectArrayInput optionText="email"/>
      </ReferenceArrayInput>
      }
    </SimpleForm>
  </Edit>
);
