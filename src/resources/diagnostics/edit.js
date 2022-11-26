import React from 'react';
import {
  translate,
  required,
  Edit,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  TextInput,
  FileField,
  FileInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import { DateInput, DateTimeInput } from 'react-admin-date-inputs';
import MomentUtils from "@date-io/moment";

const DiagnosticsTitle = ({translate}) => {
  return <span>{`${translate('resources.diagnostics.name', 1)}`} </span>;
};

export default translate(({translate, ...props}) => (
  <Edit title={<DiagnosticsTitle translate={translate} />} {...props}>
    <SimpleForm redirect="show">
      <TextInput disabled source="id"/>
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
