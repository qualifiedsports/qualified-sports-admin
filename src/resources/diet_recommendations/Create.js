import React from 'react';
import {
  required,
  Create,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  FileInput,
  FileField
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import {DateInput} from "react-admin-date-inputs";

export const DietRecommendationsCreate = ({...props}) => {
  return <Create {...props}>
    <SimpleForm redirect="list">
      <ReferenceInput source="user" reference="users" allowEmpty validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <DateInput source="ends" allowEmpty providerOptions={{utils: MomentUtils}}/>
      <RichTextInput multiline source="value" validate={required()}/>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
    </SimpleForm>
  </Create>
};
