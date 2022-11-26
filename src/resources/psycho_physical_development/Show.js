import React from 'react';
import {
  Show,
  SimpleShowLayout,
  ReferenceField,
  TextField,
  RichTextField,
  DateField,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;

const styles = {
  numberField: {textAlign: 'left'},
  booleanField: {margin: 0}
};

export const PsychoPhysicalDevelopmentShow = ({...props}) => {
  const {permissions} = usePermissions();
  return <Show {...props}>
    <SimpleShowLayout>
      {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_SHOW_USER') && <ReferenceField source="user" reference="users">
        <TextField source="fullname"/>
      </ReferenceField>}
      <DateField source="at" locales="pl"/>
      <RichTextField source="value" style={styles.numberField}/>
    </SimpleShowLayout>
  </Show>
};
