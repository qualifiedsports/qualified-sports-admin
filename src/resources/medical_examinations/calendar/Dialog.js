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
import {MEDICAL_EXAMINATION_STATUS_EVALUATE} from "../status";

export const Dialog = ({medicalExamination, dialogOpened, onDialogCloseClick}) => {
  const translate = useTranslate();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (medicalExamination) {
      setData(medicalExamination.data);
    }

    return () => {
      setData(undefined)
    };
  }, [medicalExamination]);

  if (!data) {
    return null;
  }

  return <BaseDialog open={dialogOpened}>
    <DialogTitle>{translate('resources.medical_examinations.details')}</DialogTitle>
    <DialogContent>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.medical_examinations.fields.created_by')}</InputLabel>
        <Input value={data.created_by} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.medical_examinations.fields.at')}</InputLabel>
        <Input value={data.at && moment(data.at).format('DD-MM-YYYY')} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.medical_examinations.fields.procedure')}</InputLabel>
        <Input value={data.procedure} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.medical_examinations.fields.description')}</InputLabel>
        <Input value={data.description} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.medical_examinations.fields.status')}</InputLabel>
        <Input value={translate(`resources.medical_examinations.values.status.${data.status}`)} readOnly disableUnderline/>
      </FormControl>
    </DialogContent>
    <DialogActions>
      {data.status === MEDICAL_EXAMINATION_STATUS_EVALUATE ? <Fragment>
        <MarkAsDone record={data}/>
        <MarkAsNotDone record={data}/>
      </Fragment> : null}
      <Button onClick={onDialogCloseClick} color="primary">
        {translate('resources.medical_examinations.close')}
      </Button>
    </DialogActions>
  </BaseDialog>;
};
