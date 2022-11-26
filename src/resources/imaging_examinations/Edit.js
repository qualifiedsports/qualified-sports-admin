import React from 'react';
import {required, Edit, SimpleForm, AutocompleteInput, ReferenceInput, FileInput, FileField} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text';
import MomentUtils from "@date-io/moment";
import { DateTimeInput } from "react-admin-date-inputs"; // eslint-disable-line import/no-unresolved

export default (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
      <RichTextInput source="description"/>
      <DateTimeInput
        source="created"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />
    </SimpleForm>
  </Edit>
);
