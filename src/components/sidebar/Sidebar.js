/**
 * ************************************
 *
 * @module Sidebar.js
 * @author team KuberG8
 * @date
 * @description React Component to display Sidebar nav items
 *
 * ************************************
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { SidebarItems } from './SidebarItems';
import './sidebar.scss';

const Sidebar = () => {

  const menuItems = SidebarItems.map((item) => 
    <MenuItem key={item.title} className="sidebarMenuItem">
      <Link to={item.path}>
        <span className="menuIcon">{item.icon}</span>
        <span className="menuLink">{item.title}</span>
      </Link>
    </MenuItem> 
  );

  return (
    <>
      <ProSidebar className='sidebar'>
        <Menu iconShape='square'>
          {menuItems}
        </Menu>
      </ProSidebar>
    </>
  )
}

export default Sidebar;