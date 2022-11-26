import React from 'react';
import {
  translate,
  required,
  Create,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  FileInput,
  FileField,
  TextInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import {DateInput} from 'react-admin-date-inputs';

export default translate(({translate, ...props}) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <DateInput source="ends" validate={required()} allowEmpty providerOptions={{utils: MomentUtils}}/>
      <TextInput multiline fullWidth source="value" validate={required()}/>
      <TextInput multiline fullWidth source="result_achieved"/>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
    </SimpleForm>
  </Create>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
