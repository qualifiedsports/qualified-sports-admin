import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import BaseDialog from '@material-ui/core/Dialog';
import React, {Fragment, useEffect, useState} from 'react';

import {useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MarkAsDone} from './MarkAsDone';
import {MarkAsNotDone} from './MarkAsNotDone';
import {VISIT_STATUS_EVALUATE} from '../status';

export const Dialog = ({visit, dialogOpened, onDialogCloseClick}) => {
  const translate = useTranslate();
  const [data, setData] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    if (visit) {
      setData(visit.data);
    }

    return () => {
      setData(undefined)
    };
  }, [visit]);

  if (!data) {
    return null;
  }

  return <BaseDialog open={dialogOpened}>
    <DialogTitle>{translate('resources.visits.details')}</DialogTitle>
    <DialogContent>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.visits.fields.created_by')}</InputLabel>
        <Input value={data.created_by} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.visits.fields.visit_date')}</InputLabel>
        <Input value={data.visit_date && moment(data.visit_date).format('DD-MM-YYYY')} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.visits.fields.preparing_instructions')}</InputLabel>
        <Input value={data.preparing_instructions} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.visits.fields.status')}</InputLabel>
        <Input value={translate(`resources.visits.values.status.${data.status}`)} readOnly disableUnderline/>
      </FormControl>
    </DialogContent>
    <DialogActions>
      {data.status === VISIT_STATUS_EVALUATE ? <Fragment>
        <MarkAsDone record={data}/>
        <MarkAsNotDone record={data}/>
      </Fragment> : null}
      <Button onClick={onDialogCloseClick} color="primary">
        {translate('resources.visits.close')}
      </Button>
    </DialogActions>
  </BaseDialog>;
};
