/**
 * ************************************
 *
 * @module  NodeOverview
 * @description component that renders basic information about a node
 *
 * ************************************
 */


 import React, { useState, useEffect } from 'react';
 import GaugeChart from 'react-gauge-chart';
 import { Doughnut } from 'react-chartjs-2';
 import Container from '@mui/material/Container';
 import Box from '@mui/material/Box';

 import * as clusterPromql from '../../utils/cluster-promql-util';
