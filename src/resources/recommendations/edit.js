import React from 'react';
import {
  required,
  translate,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectArrayInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import {DateInput} from 'react-admin-date-inputs';

const RecommendationTitle = ({translate}) => {
  return <span>{`${translate('resources.recommendations.name', 1)}`} </span>;
};

export default translate(({translate, ...props}) => (
  <Edit title={<RecommendationTitle translate={translate}/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput disabled source="id"/>
      <ReferenceInput source="type" reference="recommendation_types" validate={required()}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput multiline source="value" validate={required()}/>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <DateInput source="ends" allowEmpty providerOptions={{utils: MomentUtils}}/>
      <ReferenceArrayInput source="users" reference="users" allowEmpty>
        <SelectArrayInput optionText="email"/>
      </ReferenceArrayInput>
      <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
    </SimpleForm>
  </Edit>
));
