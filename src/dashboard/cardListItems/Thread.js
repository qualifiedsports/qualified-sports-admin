import React from 'react';

import {FormattedRelative} from 'react-intl';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {PermIdentity} from '@material-ui/icons';

import styles from './styles';

const messageCharactersLimit = 200;

const Thread = (translate, item, isPatient = false) => {
  const body = item.messages[item.messages.length - 1].body;
  const message = body > messageCharactersLimit ? `${body.substr(0, messageCharactersLimit)}...` : body;

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    color: isPatient ? '#3a87ad' : '#4caf50'
  };

  return (
    <ListItem key={item.id} component="a" href={`/#/threads/my/${item.id}`} style={itemStyle}>
      <div>
        <PermIdentity style={styles.icon} />
        <div style={styles.column}>
          <h2 style={styles.header}>{item.created_by.fullname}</h2>
          <h5 style={styles.subHeader}>{item.subject}</h5>
        </div>
        <div style={styles.date}><FormattedRelative value={item.messages[item.messages.length - 1].created_at}/></div>
      </div>
      <div>
        <p>{message}</p>
      </div>
      <Divider style={styles.divider}/>
    </ListItem>
  );
};

export default Thread;
