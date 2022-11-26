import React from 'react';
import {
  translate,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  ReferenceField,
  TextField,
  ReferenceInput,
  AutocompleteInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from '../fields/FullNameField';
import CustomDateField from '../fields/CustomDateField';
import {Combined} from "./Combined";
import {ColouredChipField} from "../../components/fields/ColouredChipField";

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('VISITS_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

class ListVisits extends React.Component {
  render = () => {
    const {permissions, translate} = this.props;

    if (permissions && permissions.includes('VISITS_LIST_AS_CALENDAR')) {
      return (
        <List pagination={null} {...this.props} title={translate('resources.visits.calendar_title')}>
          <Combined/>
        </List>
      );
    }

    return (
      <List {...this.props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
        <Datagrid>
          {permissions && permissions.includes('VISITS_LIST_USERS') &&
          <ReferenceField source="user" reference="users">
            <FullNameField source="fullname"/>
          </ReferenceField>}

          <CustomDateField source="visit_date" format={'DD MMM YYYY - HH:mm'}/>

          <TextField source="doctor_fullname"/>
          <TextField source="preparing_instructions"/>

          <ReferenceField source="created_by" reference="users">
            <FullNameField source="fullname"/>
          </ReferenceField>

          <ColouredChipField
            source="status"
            colorList={{
              DONE: "primary",
              NOT_DONE: "secondary",
            }}
            renderLabel={status => translate(`resources.visits.values.status.${status}`)}
          />

          {permissions && permissions.includes('VISITS_LIST_CREATED') &&
          <DateField source="created" locales="pl" options={dateOptions}/>}

          {permissions && permissions.includes('VISITS_LIST_UPDATED') &&
          <DateField source="updated" locales="pl" options={dateOptions}/>}

          {permissions && permissions.includes('VISITS_EDIT') &&
          <EditButton basePath="/visits"/>}
        </Datagrid>
      </List>
    );
  };
}

export default translate(ListVisits);
