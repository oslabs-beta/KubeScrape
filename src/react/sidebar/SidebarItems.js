/**
 * ************************************
 *
 * @module SidebarItems.js
 * @author team KubeScrape
 * @date
 * @description an Array containing sidebar item icons and paths
 *
 * ************************************
 */

import React from 'react';
import {
  AiFillHome,
  AiFillCodepenCircle,
  AiFillEye,
  AiFillCodeSandboxSquare,
} from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';

const SidebarItems = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome className="sidebarMenuItemIcons" />,
  },
  {
    title: 'Node',
    path: '/node',
    icon: <AiFillCodepenCircle className="sidebarMenuItemIcons" />,
  },
  {
    title: 'Pod',
    path: '/pod',
    icon: <AiFillCodeSandboxSquare className="sidebarMenuItemIcons" />,
  },
  {
    title: 'Alerts',
    path: '/alerts',
    icon: <GoAlert className="sidebarMenuItemIcons" />,
  },
  {
    title: 'Visualizer',
    path: '/visualizer',
    icon: <AiFillEye className="sidebarMenuItemIcons" />,
  },
];

export default SidebarItems;