import React from 'react';
import {
  translate,
  required,
  Create,
  SimpleForm,
  ReferenceInput,
  FileInput,
  FileField,
  TextInput,
  AutocompleteInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default translate(({translate, ...props}) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput multiline source="value" validate={required()}/>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
