import React from 'react';
import {
  translate,
  required,
  Edit,
  SimpleForm,
  ReferenceInput,
  FileInput,
  FileField,
  TextInput,
  AutocompleteInput
} from 'react-admin';
import MomentUtils from "@date-io/moment";
import { DateTimeInput } from "react-admin-date-inputs"; // eslint-disable-line import/no-unresolved;

export default translate(({translate, ...props}) => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <TextInput multiline source="value" validate={required()}/>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateTimeInput
        source="created"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />
    </SimpleForm>
  </Edit>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
