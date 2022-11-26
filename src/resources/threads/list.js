import React from 'react';
import {translate, List, SimpleList, Filter, DeleteButton, SelectInput} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {withStyles} from '@material-ui/core/styles';
import {Drafts, Mail} from '@material-ui/icons';

const style = {
  tertiary: {marginRight: '4em'}
};

const deleteAction = (record) => {
  return <DeleteButton basePath="/threads" record={record} resource="threads" redirect={`/threads/my`}/>
};

const Filters = ({...props}) => <Filter {...props}>
  <SelectInput source="type" default={'inbox'} choices={[
      { id: 'inbox', name: 'Odebrane' },
      { id: 'sent', name: 'Wysłane' },
  ]} />
</Filter>;

export default withStyles(style)(translate(({classes, translate, ...props}) => (
  <List {...props} filters={<Filters />} filterDefaultValues={{ type: 'inbox' }} perPage={10} bulkActions={false}>
    <SimpleList
      classes={{tertiary: classes.tertiary}}
      primaryText={record => record.subject}
      secondaryText={record => `${translate('resources.threads/my.custom.list.secondaryTextPrefix')} ${record.created_by ? record.created_by.fullname : ''}, do ${1 != record.messages.length ? record.messages[1].sender.fullname : '...'}`}
      tertiaryText={record => new Date(record.created_at).toLocaleDateString()}
      rightIcon={deleteAction}
      leftIcon={record => (record.has_been_read ? <Drafts/> : <Mail/>)}
    >
    </SimpleList>
  </List>
)));
