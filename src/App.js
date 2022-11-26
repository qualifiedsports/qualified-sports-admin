import React from 'react';
import {Admin, Resource} from 'react-admin'; // eslint-disable-line import/no-unresolved;

import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan'

import restClient from './providers/rest';
import uploadClient from './providers/upload';
import authClient from './providers/auth';
import messages from './translations/pl';
import Dashboard from './dashboard/Dashboard';
import Menu from './menu';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import UserList from './resources/users/list';
import UserShow from './resources/users/show';
import UserEdit from './resources/users/edit';
import UserCreate from './resources/users/create';
import GroupList from './resources/groups/list';
import GroupEdit from './resources/groups/edit';
import GroupCreate from './resources/groups/create';
import DiagnosticsList from './resources/diagnostics/list';
import DiagnosticsCreate from './resources/diagnostics/create';
import DiagnosticsEdit from './resources/diagnostics/edit';
import DiagnosticsShow from './resources/diagnostics/show';
import MeasurementTypeEdit from './resources/measurement_types/edit';
import MeasurementTypeList from './resources/measurement_types/list';
import MeasurementTypeCreate from './resources/measurement_types/create';
import ConsultationsList from './resources/consultations/list';
import ConsultationsCreate from './resources/consultations/create';
import ConsultationsEdit from './resources/consultations/edit';
import RecommendationEdit from './resources/recommendations/edit';
import RecommendationList from './resources/recommendations/list';
import RecommendationCreate from './resources/recommendations/create';
import RecommendationShow from './resources/recommendations/show';
import VisitsList from './resources/visits/list';
import VisitsCreate from './resources/visits/create';
import VisitsEdit from './resources/visits/edit';
import TrainingsList from './resources/trainings/list';
import TrainingsCreate from './resources/trainings/create';
import TrainingsEdit from './resources/trainings/edit';
import ThreadList from './resources/threads/list';
import ThreadShow from './resources/threads/show';
import ThreadCreate from './resources/threads/create';
import {MediaObjectList} from './resources/media_objects';

import './App.scss';
import {MedicalExaminationsCreate} from './resources/medical_examinations/create';
import {MedicalExaminationsList} from './resources/medical_examinations/list';
import {List} from './resources/medical_recommendations/List';
import {Create} from './resources/medical_recommendations/Create';
import {Edit} from './resources/medical_recommendations/Edit';

import {PsychoPhysicalDevelopmentList} from './resources/psycho_physical_development/List';
import {PsychoPhysicalDevelopmentEdit} from './resources/psycho_physical_development/Edit';
import {PsychoPhysicalDevelopmentCreate} from './resources/psycho_physical_development/Create';
import {PsychoPhysicalDevelopmentShow} from './resources/psycho_physical_development/Show';

import {MeasurementsEdit} from './resources/measurements/Edit';
import {MeasurementsList} from './resources/measurements/List';
import {MeasurementsCreate} from './resources/measurements/Create';
import {MedicalExaminationsEdit} from "./resources/medical_examinations/edit";

import routes from './routes';

const i18nProvider = polyglotI18nProvider(() => messages["pl"]);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: cyan
  }
});

export default () => (
  <Admin
    theme={theme}
    locale="pl"
    title="Sporty kwalifikowane"
    authProvider={authClient}
    dataProvider={uploadClient(restClient)}
    i18nProvider={i18nProvider}
    customRoutes={routes}
    dashboard={Dashboard}
    menu={Menu}
  >
    {permissions => [
      <Resource
        name="users"
        list={permissions.includes('USERS_LIST') ? UserList : null}
        show={permissions.includes('USERS_SHOW') ? UserShow : null}
        edit={permissions.includes('USERS_EDIT') ? UserEdit : null}
        create={permissions.includes('USERS_CREATE') ? UserCreate : null}
      />,
      <Resource
        name="media_objects"
        list={permissions.includes('MEDIA_OBJECTS_LIST') ? MediaObjectList : null}
      />,
      permissions.includes('GROUPS_LIST') ? <Resource
        name="groups"
        list={permissions.includes('GROUPS_LIST') ? GroupList : null}
        edit={permissions.includes('GROUPS_EDIT') ? GroupEdit : null}
        create={permissions.includes('GROUPS_CREATE') ? GroupCreate : null}/> : null,
      <Resource
        name="trainings"
        list={TrainingsList}
        create={permissions.includes('TRAININGS_CREATE') ? TrainingsCreate : null}
        edit={permissions.includes('TRAININGS_EDIT') ? TrainingsEdit : null}
      />,
      <Resource
        name="visits"
        list={VisitsList}
        create={permissions.includes('VISITS_CREATE') ? VisitsCreate : null}
        edit={permissions.includes('VISITS_EDIT') ? VisitsEdit : null}
      />,
      <Resource
        name="medical_examinations"
        list={MedicalExaminationsList}
        create={permissions.includes('MEDICAL_EXAMINATIONS_CREATE') ? MedicalExaminationsCreate : null}
        edit={permissions.includes('MEDICAL_EXAMINATIONS_EDIT') ? MedicalExaminationsEdit : null}
      />,
      <Resource
        name="diagnostics"
        list={DiagnosticsList}
        create={permissions.includes('DIAGNOSTICS_CREATE') ? DiagnosticsCreate : null}
        edit={permissions.includes('DIAGNOSTICS_EDIT') ? DiagnosticsEdit : null}
        show={DiagnosticsShow}
      />,
      <Resource
        name="consultations"
        list={ConsultationsList}
        create={permissions.includes('CONSULTATIONS_CREATE') ? ConsultationsCreate : null}
        edit={permissions.includes('CONSULTATIONS_EDIT') ? ConsultationsEdit : null}
      />,
      <Resource name="recommendation_types" />,
      <Resource
        name="recommendations"
        list={permissions.includes('RECOMMENDATIONS_LIST') ? RecommendationList : null}
        edit={permissions.includes('RECOMMENDATIONS_EDIT') ? RecommendationEdit : null}
        create={permissions.includes('RECOMMENDATIONS_CREATE') ? RecommendationCreate : null}
        show={RecommendationShow}/>,
      <Resource
        name="psycho_physical_developments"
        list={PsychoPhysicalDevelopmentList}
        create={permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_CREATE') ? PsychoPhysicalDevelopmentCreate : null}
        edit={permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_EDIT') ? PsychoPhysicalDevelopmentEdit : null}
        show={PsychoPhysicalDevelopmentShow}
      />,
      <Resource
        name="medical_recommendations"
        list={List}
        create={permissions.includes('MEDICAL_RECOMMENDATIONS_CREATE') ? Create : null}
        edit={permissions.includes('MEDICAL_RECOMMENDATIONS_EDIT') ? Edit : null}
      />,
      <Resource
        name="diet_recommendations"
        list={List}
        create={permissions.includes('DIET_RECOMMENDATIONS_CREATE') ? Create : null}
        edit={permissions.includes('DIET_RECOMMENDATIONS_EDIT') ? Edit : null}
      />,
      <Resource
        name="threads/my"
        list={ThreadList}
        edit={ThreadShow}
        create={ThreadCreate}
      />,
      <Resource
        name="measurements"
        list={MeasurementsList}
        edit={MeasurementsEdit}
        create={MeasurementsCreate}/>,
      <Resource
        name="notifications"
        list={null}
        edit={null}
        create={null}/>,
      <Resource
        name="measurement_types"
        list={permissions.includes('MEASUREMENT_TYPES_LIST') ? MeasurementTypeList : null}
        edit={permissions.includes('MEASUREMENT_TYPES_EDIT') ? MeasurementTypeEdit : null}
        create={permissions.includes('MEASUREMENT_TYPES_CREATE') ? MeasurementTypeCreate : null}
        options={{hide: !permissions.includes('MEASUREMENT_TYPES_LIST')}}/>
    ]}
  </Admin>
);
