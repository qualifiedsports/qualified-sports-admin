import React, {Component} from 'react';

import Recommendation from './cardListItems/Recommendation';
import Thread from './cardListItems/Thread';
import Activity from './cardListItems/Activity';
import Notification from './cardListItems/Notification';

import CardList from './CardList';

import getRecommendations from './../reducers/Recommendations';
import getActivities from './../reducers/Activities';
import getThreads from './../reducers/Threads';
import getNotifications from './../reducers/Notifications';

import {GET_ONE} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import restClient from '../providers/rest';

const styles = {
    flex: {display: 'flex'},
    recommendations: {marginRight: '1em', marginBottom: '2em'},
    activities: {marginLeft: '1em', marginBottom: '2em'},
    threads: {marginBottom: '2em'},
    notifications: {marginBottom: '2em'},
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.props = props;
        this.state = {
            recommendations: [],
            activities: [],
            threads: [],
            notifications: [],
        };
    }
    
    componentDidMount() {
        getActivities({}).then((data) => this.setState({activities: data.data}));
        getRecommendations({}).then((data) => {
            this.setState({recommendations: data.data}, () => {
                this.state.recommendations.forEach(item => {
                    restClient(GET_ONE, 'recommendation_types', {id: item.type}).then(type => {
                        const {recommendations} = this.state;
                        const recommendation = recommendations.find(r => r.id === item.id);
                        
                        recommendation.type = type.data;
                        this.setState({recommendations});
                    });
                });
            });
        });
        getThreads().then((data) => this.setState({threads: data.data}));
        getNotifications().then((data) => this.setState({notifications: data.data}));
    }
    
    render() {
        const {permissions} = this.props;
        
        return (
            <div>
                {permissions && (!permissions.includes('ROLE_ADMIN') || !permissions.includes('ROLE_SUPER_ADMIN')) && (
                    <div>
                        <div style={styles.flex}>
                            <CardList
                                isPatient
                                style={styles.notifications}
                                itemFunction={Notification}
                                items={this.state.notifications}
                                backgroundColor="#0f7194"
                                cardTitle="dashboard.notifications.title"/>
                        </div>
                        <div style={styles.flex}>
                            <CardList
                                style={styles.recommendations}
                                itemFunction={Recommendation}
                                items={this.state.recommendations}
                                backgroundColor="#159688"
                                cardTitle="dashboard.recommendations.title"
                                flatButtonLabel="dashboard.recommendations.more"
                                flatButtonHref="/#/recommendations"/>
                            <CardList
                                style={styles.activities}
                                itemFunction={Activity}
                                items={this.state.activities}
                                backgroundColor="#bb26dd"
                                cardTitle="dashboard.activities.title"
                                flatButtonLabel="dashboard.activities.more"
                                flatButtonHref="/#/diagrams"/>
                        </div>
                        <div style={styles.flex}>
                            <CardList
                                isPatient
                                style={styles.threads}
                                itemFunction={Thread}
                                items={this.state.threads}
                                backgroundColor="#0f7194"
                                cardTitle="dashboard.threads.title.patient"
                                flatButtonLabel="dashboard.threads.more"
                                flatButtonHref="/#/threads/my"/>
                        </div>
                    </div>
                )}
                {permissions && (permissions.includes('ROLE_ADMIN') || permissions.includes('ROLE_SUPER_ADMIN')) && (
                    <div style={styles.flex}>
                        <CardList
                            isPatient={false}
                            style={styles.threads}
                            itemFunction={Thread}
                            items={this.state.threads}
                            backgroundColor="#0f7194"
                            cardTitle="dashboard.threads.title.doctor"
                            flatButtonLabel="dashboard.threads.more"
                            flatButtonHref="/#/threads/my"/>
                    </div>
                )}
            </div>
        );
    }
}

export default Dashboard;
