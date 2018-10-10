import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/post">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Post
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/like">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Like
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/comment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Comment
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
