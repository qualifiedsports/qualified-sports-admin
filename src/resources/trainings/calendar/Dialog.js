import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import moment from 'moment';
import AppConfig from '../../../AppConfig';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import BaseDialog from '@material-ui/core/Dialog';
import React, {Fragment, useEffect, useState} from 'react';

import {useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MarkAsDone} from './MarkAsDone';
import {MarkAsNotDone} from './MarkAsNotDone';
import {TRAINING_STATUS_EVALUATE} from '../status';

export const Dialog = ({training, dialogOpened, onDialogCloseClick}) => {
  const translate = useTranslate();
  const [data, setData] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    if (training) {
      setData(training.data);
    }

    return () => {
      setData(undefined)
    };
  }, [training]);

  if (!data) {
    return null;
  }

  return <BaseDialog open={dialogOpened}>
    <DialogTitle>{translate('resources.trainings.details')}</DialogTitle>
    <DialogContent>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.value')}</InputLabel>
        <Input value={data.value} readOnly multiline disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.resultAchieved')}</InputLabel>
        <Input value={data.resultAchieved} readOnly multiline disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.created_by')}</InputLabel>
        <Input value={data.created_by} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.at')}</InputLabel>
        <Input value={data.at && moment(data.at).format('DD-MM-YYYY')} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.ends')}</InputLabel>
        <Input value={data.ends && moment(data.ends).format('DD-MM-YYYY')} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.status')}</InputLabel>
        <Input value={translate(`resources.trainings.values.status.${data.status}`)} readOnly disableUnderline/>
      </FormControl>
      <FormControl fullWidth style={{margin: '14px 0'}}>
        <InputLabel>{translate('resources.trainings.fields.result')}</InputLabel>
        <Input
          value={result}
          onChange={e => setResult(e.target.value)}
          placeholder={translate('resources.trainings.placeholders.result')}
          readOnly={data.status !== TRAINING_STATUS_EVALUATE}
          disableUnderline={data.status !== TRAINING_STATUS_EVALUATE}
          required
        />
      </FormControl>
      {data.attachment && (
        <FormControl fullWidth style={{margin: '14px 0'}}>
          <InputLabel shrink>{translate('resources.trainings.fields.attachment')}</InputLabel>
          <div style={{marginTop: '16px'}}>
            <a target="_blank" style={{padding: '6px 0 7px', display: 'inline-block', color: '#00bcd4'}}
               href={`${AppConfig.endpoint}public/media/${data.attachment.content_url}`}>
              {data.attachment.name}
            </a>
          </div>
        </FormControl>
      )}
    </DialogContent>
    <DialogActions>
      {data.status === TRAINING_STATUS_EVALUATE ? <Fragment>
        <MarkAsDone record={data} result={result} disabled={!result}/>
        <MarkAsNotDone record={data} result={result} disabled={!result}/>
      </Fragment> : null}
      <Button onClick={onDialogCloseClick} color="primary">
        {translate('resources.trainings.close')}
      </Button>
    </DialogActions>
  </BaseDialog>;
};
