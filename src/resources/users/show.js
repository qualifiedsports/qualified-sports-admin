import React, {Component} from 'react';

import {translate, Show, SimpleShowLayout, TextField, BooleanField, EmailField, DateField, SelectField} from 'react-admin'; // eslint-disable-line import/no-unresolved;

import Diagrams from './../../views/Diagrams';
import Recommendation from './../../dashboard/cardListItems/Recommendation';
import CardList from './../../dashboard/CardList';
import getRecommendations from './../../reducers/Recommendations';

const UserTitle = translate(({translate, record}) => {
  return <span>{`${translate('resources.users.name', 5)} ${record.fullname ? `${record.fullname}` : `${record.email}`}`}</span>;
});

const styles = {
  booleanField: {margin: 0},
  diagrams: {marginTop: '2em'},
  flex: {display: 'flex'},
  recommendations: {marginRight: '1em', marginTop: '2em'},
};

class UserShow extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.userId = this.props.match.params.id;

    this.state = {
      recommendations: [],
      // activities: []
    }
  }

  componentDidMount() {
    getRecommendations({userId: this.userId})
      .then((data) => {
        this.setState({recommendations: data.data});
      });
  }

  render() {
    return (
      <div>
        <Show {...this.props} title={<UserTitle/>}>
          <SimpleShowLayout>
            <EmailField source="email"/>
            <TextField source="fullname"/>
            <TextField source="username"/>
            <BooleanField source="enabled" elStyle={styles.booleanField}/>
            <DateField source="dateOfBirth"/>
            <SelectField source="gender" choices={[
              { id: 'male', name: 'resources.users.custom.options.gender.male' },
              { id: 'female', name: 'resources.users.custom.options.gender.female' },
            ]} />
            <TextField source="phone"/>
          </SimpleShowLayout>
        </Show>
        <div style={styles.flex}>
          <CardList
            style={styles.recommendations}
            itemFunction={Recommendation}
            items={this.state.recommendations}
            backgroundColor="#159688"
            cardTitle="dashboard.recommendations.title"
            showButton={false}/>
        </div>
        <Diagrams userId={this.userId} style={styles.diagrams}/>
      </div>
    );
  }
}

export default UserShow;
