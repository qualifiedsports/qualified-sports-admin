import React from "react";
import {Pie} from "react-chartjs-2";
import {useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {
  MEDICAL_EXAMINATION_STATUS_DONE,
  MEDICAL_EXAMINATION_STATUS_EVALUATE,
  MEDICAL_EXAMINATION_STATUS_NOT_DONE
} from "../status";
import {hex2rgba} from "../../../providers/color";

const getData = (medicalExaminations, status) => medicalExaminations.reduce((total, visit) => total + (visit.status === status ? 1 : 0), 0);

export const Chart = ({medicalExaminations}) => {
  const translate = useTranslate();

  return <Pie data={{
    labels: [
      translate('resources.medical_examinations.chart.line.labels.to_achieve'),
      translate('resources.medical_examinations.chart.line.labels.achieved'),
      translate('resources.medical_examinations.chart.line.labels.not_achieved')
    ],
    datasets: [
      {
        data: [
          getData(medicalExaminations, MEDICAL_EXAMINATION_STATUS_EVALUATE),
          getData(medicalExaminations, MEDICAL_EXAMINATION_STATUS_DONE),
          getData(medicalExaminations, MEDICAL_EXAMINATION_STATUS_NOT_DONE)
        ],
        backgroundColor: [
          hex2rgba(translate('resources.medical_examinations.colors.background.status.EVALUATE'), 1),
          hex2rgba(translate('resources.medical_examinations.colors.background.status.DONE'), 1),
          hex2rgba(translate('resources.medical_examinations.colors.background.status.NOT_DONE'), 1)
        ]
      },
    ]
  }}/>
};