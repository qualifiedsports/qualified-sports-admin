import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Warning} from '@material-ui/icons';

import styles from './styles';

const Notification = (translate, item) => {
  let icon = <Warning style={styles.icon}/>;
  const itemStyle = { color: '#ff0000' };

  return (
    <ListItem key={item.id} component="a" href={`/#/`} style={itemStyle}>
      {icon}
      <div style={styles.column}>
        <Typography variant="title" style={styles.header}>Anomalia wykryta</Typography>
        <Typography variant="caption" style={styles.subHeader}>{item.notification}</Typography>
      </div>
      <Divider style={styles.divider}/>
    </ListItem>
  )
};

export default Notification;
