import React from 'react';
import {Button, useTranslate, useMutation, useRefresh} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {VISIT_STATUS_DONE} from '../status';

export const MarkAsDone = ({record, result, disabled}) => {
  const translate = useTranslate();
  const refresh = useRefresh();

  const [markAsDone, {loading}] = useMutation({
    type: 'update',
    resource: 'visits',
    payload: {id: record.id, data: {status: VISIT_STATUS_DONE, result}}
  }, {
    onSuccess: refresh
  });

  return <Button
    label={translate('resources.visits.actions.done')}
    onClick={markAsDone}
    disabled={loading || disabled}
  />;
};
