import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Warning} from '@material-ui/icons';

import styles from './styles';

const Recommendation = (translate, item) => {
  let icon = <Warning style={styles.icon}/>;
  const itemStyle = { color: '#3a87ad' };

  return (
    <ListItem key={item.id} component="a" href={`/#/recommendations/${item.id}/show`} style={itemStyle}>
      {icon}
      <div style={styles.column}>
        <Typography variant="title" style={styles.header}>{item.value}</Typography>
        <Typography variant="caption" style={styles.subHeader}>{item.type.name}</Typography>
      </div>
      <Divider style={styles.divider}/>
    </ListItem>
  )
};

export default Recommendation;
