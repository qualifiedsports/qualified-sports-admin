import React from 'react';
import {useMutation, Button, useTranslate, useRefresh} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MEDICAL_EXAMINATION_STATUS_NOT_DONE} from '../status';

export const MarkAsNotDone = ({record}) => {
  const translate = useTranslate();
  const refresh = useRefresh();

  const [markAsNotDone, {loading}] = useMutation({
    type: 'update',
    resource: 'medical_examinations',
    payload: {id: record.id, data: {status: MEDICAL_EXAMINATION_STATUS_NOT_DONE}}
  }, {
    onSuccess: refresh
  });

  return <Button
    label={translate('resources.medical_examinations.actions.not_done')}
    onClick={markAsNotDone}
    disabled={loading}
  />;
};
