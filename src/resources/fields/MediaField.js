import React from 'react';
import AppConfig from './../../AppConfig';
import get from 'lodash/get';

const MediaField = ({record, source, title}) => <a target="_blank" href={`${AppConfig.endpoint}public/media/${get(record, source)}`} style={{ color: '#00bcd4' }}>
  {get(record, title)}
</a>;

export default MediaField;
