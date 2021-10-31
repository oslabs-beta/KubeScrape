/**
 * ************************************
 *
 * @module  K8sContainerOverview.js
 * @description component that renders basic information about an individual container within a pod
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import * as actions from '../../actions/actions';

//fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as containerPromql from '../../utils/container-promql-utils';
import LineChart from '../charts/LineChart';

//TODO: Define the following in this component's state to pass to linecharts as props:
//CpuUtilization, MemoryUtilization, CpuSaturation, Memory Saturation

const K8sContainerOverview = (props) => {
  const [containerCpuUsage, setContainerCpuUsage] = useState([]);

  const getContainerCpuUsage = async (containerName) => {
    // setInterval(async (containerName) => {
      const data = await fetch(`http://localhost:30000/api/v1/query?query=rate(container_cpu_usage_seconds_total{container="${containerName}"}[10m])`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());
      
      const containerCpuUsage = data.data.result[0].value;
      console.log('timestamp and cpu usage', containerCpuUsage);
      setContainerCpuUsage(containerCpuUsage); 
    // }, 3000)
  }

  useEffect(async() => {
    await getContainerCpuUsage(props.containerName);
    const interval = setInterval(() => {
      getContainerCpuUsage(props.containerName)
    }, 3000)
    return () => clearInterval(interval);
  }, []);




  return (
    <Box
      key={props.containerName}
      sx={{
        border: '1px solid black',
        p: .3,
        m: .3,
        borderRadius: 1,
        // textAlign: 'center',
        fontSize: '0.75rem',
        maxWidth: 225
      }}
    >
      <h2> {props.containerName} </h2>
      <LineChart 
        key={props.containerName + 'cpuUsage'}
        metricName="CPU Usage"
        xAxis={['1', '2', '3', '4', '5', '6']}
        yAxis={['12', '19', '3', '5', '2', '3']}
        xAxisLabel='# of Votes'
      />

      {/* <li>Created On: {formatDate} {formatTime}</li> */}
    </Box>
  );
}


export default K8sContainerOverview;