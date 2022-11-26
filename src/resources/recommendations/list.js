import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    DateField,
    Filter,
    SelectInput,
    AutocompleteInput,
    ReferenceInput,
    ChipField,
    ReferenceArrayField,
    SingleFieldList,
    translate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from './../fields/FullNameField';
import CalendarView from './CalendarView';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => (
    <Filter {...props}>
        {permissions && permissions.includes('RECOMMENDATIONS_LIST_USERS') &&
        <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
            <AutocompleteInput optionText="fullname"/>
        </ReferenceInput>}
        <ReferenceInput source="type" reference="recommendation_types">
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

class RecommendationsList extends React.Component {
    render = () => {
        const {permissions, translate} = this.props;

        if (permissions && permissions.includes('RECOMMENDATIONS_LIST_AS_CALENDAR') && !permissions.includes('RECOMMENDATIONS_CREATE')) {
            return (
                <List {...this.props} title={translate('resources.recommendations.calendar_title')}>
                    <CalendarView/>
                </List>
            );
        }

        return (
            <List {...this.props}
                  filters={<Filters permissions={permissions}/>}
                  bulkActions={false}
            >
                <Datagrid>
                    {permissions && permissions.includes('RECOMMENDATIONS_LIST_USERS') &&
                    <ReferenceArrayField source="users" reference="users">
                        <SingleFieldList>
                            <ChipField source="fullname"/>
                        </SingleFieldList>
                    </ReferenceArrayField>}

                    <ReferenceField source="type" reference="recommendation_types">
                        <TextField source="name"/>
                    </ReferenceField>

                    <TextField source="value"/>

                    <DateField source="at" locales="pl" options={dateOptions}/>
                    <DateField source="ends" locales="pl" options={dateOptions}/>

                    <ReferenceField source="created_by" reference="users">
                        <FullNameField source="fullname"/>
                    </ReferenceField>

                    {permissions && permissions.includes('RECOMMENDATIONS_LIST_CREATED') &&
                    <DateField source="created" locales="pl" options={dateOptions}/>}

                    {permissions && permissions.includes('RECOMMENDATIONS_LIST_UPDATED') &&
                    <DateField source="updated" locales="pl" options={dateOptions}/>}

                    {permissions && permissions.includes('RECOMMENDATIONS_EDIT') &&
                    <EditButton basePath="/recommendations"/>}

                    {permissions && permissions.includes('RECO')}
                    <ShowButton basePath="/recommendations"/>
                </Datagrid>
            </List>
        );
    };
}

export default translate(RecommendationsList);
