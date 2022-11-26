import React from 'react';
import {
  translate,
  required,
  Edit,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  TextInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import { DateInput, DateTimeInput } from 'react-admin-date-inputs';
import MomentUtils from "@date-io/moment";

const DiagnosticsTitle = ({translate}) => {
  return <span>{`${translate('resources.psycho_physical_developments.name', 1)}`} </span>;
};

export default translate(({translate, ...props}) => (
  <Edit title={<DiagnosticsTitle translate={translate} />} {...props}>
    <SimpleForm redirect="list">
      <TextInput disabled source="id"/>
      <DateTimeInput
        source="visit_date"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />
      <TextInput source="doctor_fullname" validate={required()}/>
      <TextInput source="preparing_instructions" validate={required()}/>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
    </SimpleForm>
  </Edit>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
