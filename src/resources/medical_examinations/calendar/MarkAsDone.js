import React from 'react';
import {Button, useTranslate, useMutation, useRefresh} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MEDICAL_EXAMINATION_STATUS_DONE} from '../status';

export const MarkAsDone = ({record}) => {
  const translate = useTranslate();
  const refresh = useRefresh();

  const [markAsDone, {loading}] = useMutation({
    type: 'update',
    resource: 'medical_examinations',
    payload: {id: record.id, data: {status: MEDICAL_EXAMINATION_STATUS_DONE}}
  }, {
    onSuccess: refresh
  });

  return <Button
    label={translate('resources.medical_examinations.actions.done')}
    onClick={markAsDone}
    disabled={loading}
  />;
};
