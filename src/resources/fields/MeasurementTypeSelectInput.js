import React from 'react';

const MeasurementTypeSelectInput = ({record}) => <span>{record.name} [<b>{record.unit}</b>]</span>;

export default MeasurementTypeSelectInput;