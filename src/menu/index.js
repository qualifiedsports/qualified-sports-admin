import React from 'react';
import {connect} from 'react-redux';
import {translate, MenuItemLink, getResources, Responsive} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {withRouter} from 'react-router-dom';
import {Label, Dashboard} from '@material-ui/icons';
import {Tune} from '@material-ui/icons';

const Menu = ({hasDashboard, translate, resources, onMenuClick, logout}) => {
  return (
    <div>
      {hasDashboard && <MenuItemLink
        key="dashboard"
        to={`/`}
        primaryText={translate('menu.dashboard.name')}
        leftIcon={<Dashboard/>}
        onClick={onMenuClick}
      />}

      <MenuItemLink
        key="chatList"
        to={`/chats`}
        primaryText={translate('menu.chats.name')}
        leftIcon={<Tune/>}
        onClick={onMenuClick}
      />

      <MenuItemLink
        key="dietCalculator"
        to={`/dietCalculator`}
        primaryText={translate('menu.dietCalculator.name')}
        leftIcon={<Tune/>}
        onClick={onMenuClick}
      />

      {resources.filter(resource => true === resource.hasList).map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={translate(`resources.${resource.name}.menu`)}
          leftIcon={<Label />}
          onClick={onMenuClick}
        />
      ))}

      <Responsive
        small={logout}
        medium={null} // Pass null to render nothing on larger devices
      />
    </div>
  );
};

const mapStateToProps = state => ({
  resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(translate(Menu)));
