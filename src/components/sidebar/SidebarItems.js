/**
 * ************************************
 *
 * @module SidebarItems.js
 * @author team KuberG8
 * @date
 * @description an Array containing sidebar item icons and paths 
 *
 * ************************************
 */

import React from 'react';
import { AiFillHome, AiFillCodepenCircle, AiFillEye, AiFillCodeSandboxSquare} from 'react-icons/ai';

export const SidebarItems = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome className='sidebarMenuItemIcons'/>
  },
  {
    title: 'Node',
    path: '/node',
    icon: <AiFillCodepenCircle className='sidebarMenuItemIcons'/>
  },
  {
    title: 'Visualizer',
    path: '/visualizer',
    icon: <AiFillEye className='sidebarMenuItemIcons'/>
  },
  {
    title: 'Pod',
    path: '/pod',
    icon: <AiFillCodeSandboxSquare className='sidebarMenuItemIcons'/>
  },
];
