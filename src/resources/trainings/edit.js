import React from 'react';
import {
  translate,
  required,
  Edit,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  FileInput,
  FileField,
  TextInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import {DateInput} from 'react-admin-date-inputs';

const TrainingTitle = ({translate}) => {
  return <span>{`${translate('resources.trainings.name', 1)}`} </span>;
};

export default translate(({translate, ...props}) => (
  <Edit title={<TrainingTitle translate={translate} />} {...props}>
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
      <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
    </SimpleForm>
  </Edit>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
