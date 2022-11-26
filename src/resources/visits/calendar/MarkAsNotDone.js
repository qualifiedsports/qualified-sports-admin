import React from 'react';
import {useMutation, Button, useTranslate, useRefresh} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {VISIT_STATUS_NOT_DONE} from '../status';

export const MarkAsNotDone = ({record, result, disabled = false}) => {
  const translate = useTranslate();
  const refresh = useRefresh();

  const [markAsNotDone, {loading}] = useMutation({
    type: 'update',
    resource: 'visits',
    payload: {id: record.id, data: {status: VISIT_STATUS_NOT_DONE, result}}
  }, {
    onSuccess: refresh
  });

  return <Button
    label={translate('resources.visits.actions.not_done')}
    onClick={markAsNotDone}
    disabled={loading || disabled}
  />;
};
