import React from 'react';
import {
  Show,
  SimpleShowLayout,
  ReferenceField,
  DateField,
  TextField,
  ChipField,
  ReferenceArrayField,
  SingleFieldList
} from 'react-admin'; // eslint-disable-line import/no-unresolved;

const styles = {
  numberField: {textAlign: 'left'},
  booleanField: {margin: 0}
};

export default ({permissions, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <DateField source="at"/>
      <DateField source="ends"/>
      <ReferenceField source="created_by" reference="users">
        <TextField source="fullname"/>
      </ReferenceField>
      <ReferenceField source="type" reference="recommendation_types">
        <TextField source="name"/>
      </ReferenceField>
      <TextField source="value" style={styles.numberField}/>
      {permissions && permissions.includes('RECOMMENDATIONS_SHOW_USERS') &&<ReferenceArrayField source="users" reference="users">
        <SingleFieldList>
          <ChipField source="fullname"/>
        </SingleFieldList>
      </ReferenceArrayField>}
    </SimpleShowLayout>
  </Show>
);
