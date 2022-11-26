import React from 'react';
import {translate, required, Create, SimpleForm, AutocompleteInput, ReferenceInput, TextInput} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default translate(({translate, ...props}) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="subject" validate={required()}/>
      <ReferenceInput source="user" reference="users" allowEmpty validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <TextInput multiline source="body" validate={required()}/>
    </SimpleForm>
  </Create>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
