import React from 'react';
import {required, Create, SimpleForm, AutocompleteInput, ReferenceInput, FileInput, FileField} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved

export default (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
      <RichTextInput source="description"/>
    </SimpleForm>
  </Create>
);
