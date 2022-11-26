import React from 'react';
import PropTypes from 'prop-types';

const FullNameField = ({record = {}}) => <span>{null !== record.fullname ? record.fullname : record.email}</span>;

FullNameField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

export default FullNameField;