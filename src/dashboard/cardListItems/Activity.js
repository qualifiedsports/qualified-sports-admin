import React from 'react';
import {FormattedRelative} from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {Announcement} from '@material-ui/icons';
import styles from './styles';

const Activity = (translate, item) => {
    let icon = <Announcement style={styles.icon}/>;
    let value = item.value;
    
    return (
        <ListItem key={item.id} containerElement={<a href={`/#/measurements/${item.id}/show`} >x</a>}>
            {icon}
            <div style={styles.column}>
                <h2 style={styles.header}>{value}</h2>
                <h5 style={styles.subHeader}>{item.type.name}</h5>
            </div>
            <div style={styles.date}><FormattedRelative value={item.created}/></div>
            <Divider style={styles.divider}/>
        </ListItem>
    );
};

export default Activity;
