import React from 'react';
import {
  translate,
  required,
  Create,
  SimpleForm,
  AutocompleteInput,
  TextInput,
  ReferenceInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import { DateTimeInput } from 'react-admin-date-inputs';
import MomentUtils from '@date-io/moment';

export default translate(({translate, ...props}) => (
  <Create {...props}>
    <SimpleForm>
      <DateTimeInput
        source="visit_date"
        validate={required()}
        providerOptions={{utils: MomentUtils, locale: 'pl'}}
      />
      <TextInput source="doctor_fullname" validate={required()}/>
      <TextInput source="preparing_instructions" validate={required()}/>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
