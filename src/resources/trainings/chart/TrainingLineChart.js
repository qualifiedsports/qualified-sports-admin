import React from "react";
import {getListOfDaysBetweeen, isBetween} from "../../../providers/date";
import {Line as LineChart} from "react-chartjs-2";
import {useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {TRAINING_STATUS_DONE, TRAINING_STATUS_NOT_DONE} from "../status";
import {hex2rgba} from "../../../providers/color";

const getDataset = (days, trainings) => {
  return days.map(day => trainings.reduce((sum, training) => {
    return sum + (isBetween(training.at, training.ends, day) ? 1 : 0);
  }, 0));
};

export const TrainingLineChart = ({from, to, trainings}) => {
  const translate = useTranslate();

  const listOfDays = getListOfDaysBetweeen(from, to);

  return <LineChart type="line" data={{
    labels: listOfDays,
    datasets: [
      {
        label: translate('resources.trainings.chart.line.labels.to_achieve'),
        data: getDataset(listOfDays, trainings),
        backgroundColor: hex2rgba(translate('resources.trainings.colors.background.status.EVALUATE'), 0.2)
      },
      {
        label: translate('resources.trainings.chart.line.labels.achieved'),
        data: getDataset(listOfDays, trainings.filter(training => training.status === TRAINING_STATUS_DONE)),
        backgroundColor: hex2rgba(translate('resources.trainings.colors.background.status.DONE'), 0.4)
      },
      {
        label: translate('resources.trainings.chart.line.labels.not_achieved'),
        data: getDataset(listOfDays, trainings.filter(training => training.status === TRAINING_STATUS_NOT_DONE)),
        backgroundColor: hex2rgba(translate('resources.trainings.colors.background.status.NOT_DONE'), 0.6)
      }
    ]
  }}/>
};