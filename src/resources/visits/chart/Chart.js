import React from "react";
import {Pie} from "react-chartjs-2";
import {useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {VISIT_STATUS_DONE, VISIT_STATUS_EVALUATE, VISIT_STATUS_NOT_DONE} from "../status";
import {hex2rgba} from "../../../providers/color";

const getData = (visits, status) => visits.reduce((total, visit) => total + (visit.status === status ? 1 : 0), 0);

export const Chart = ({visits}) => {
  const translate = useTranslate();

  return <Pie data={{
    labels: [
      translate('resources.visits.chart.line.labels.to_achieve'),
      translate('resources.visits.chart.line.labels.achieved'),
      translate('resources.visits.chart.line.labels.not_achieved')
    ],
    datasets: [
      {
        data: [
          getData(visits, VISIT_STATUS_EVALUATE),
          getData(visits, VISIT_STATUS_DONE),
          getData(visits, VISIT_STATUS_NOT_DONE)
        ],
        backgroundColor: [
          hex2rgba(translate('resources.visits.colors.background.status.EVALUATE'), 1),
          hex2rgba(translate('resources.visits.colors.background.status.DONE'), 1),
          hex2rgba(translate('resources.visits.colors.background.status.NOT_DONE'), 1)
        ]
      },
    ]
  }}/>
};