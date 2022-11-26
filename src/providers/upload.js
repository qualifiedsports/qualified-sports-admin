import {CREATE, UPDATE} from 'react-admin'; // eslint-disable-line import/no-unresolved
import AppConfig from './../AppConfig';

const supported = [
  {resource: 'recommendations', field: 'attachment'},
  {resource: 'consultations', field: 'attachment'},
  {resource: 'trainings', field: 'attachment'},
  {resource: 'messages/send', field: 'attachment'},
  {resource: 'information_for_patients', field: 'attachment'},
  {resource: 'imaging_examinations', field: 'attachment'},
  {resource: 'diagnostics', field: 'attachment'},

  {resource: 'medical_recommendations', field: 'attachment'},

  {resource: 'diet_recommendations', field: 'attachment'},
];

const addUploadFeature = requestHandler => (type, resource, params) => {
  if (CREATE === type || UPDATE === type) {
    for (let support of supported) {
      if (support.resource === resource && null !== params.data[support.field] && undefined !== params.data[support.field]) {
        if (!("rawFile" in params.data[support.field]) && UPDATE === type) {
          return requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              [support.field]: `/api/media_objects/${params.data[support.field].id}`
            }
          })
        }

        const form = new FormData();
        form.append('file', params.data[support.field].rawFile);

        return fetch(`${AppConfig.endpoint}api/media_objects`, {
          method: 'POST',
          body: form,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => response.json())
          .then(data => requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              [support.field]: `/api/media_objects/${data.id}`
            }
          }));
      }
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadFeature;
