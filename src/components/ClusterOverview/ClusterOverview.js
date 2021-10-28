/**
 * ************************************
 *
 * @module  ClusterOverview
 * @description component that renders basic information about the user's cluster
 *
 * ************************************
 */


 import React, { useState, useEffect } from 'react';
 import GaugeChart from 'react-gauge-chart';
 import { Doughnut } from 'react-chartjs-2';
 import Container from '@mui/material/Container';
 import Box from '@mui/material/Box';

 import * as clusterPromql from '../../utils/cluster-promql-util';

 //create a functional component
const ClusterOverview = () => {
  
  //initialize state that is rendered only in this component
  const [clusterCpuUsage, setClusterCpuUsage] = useState(0);
  const [clusterMemoryUsage, setClusterMemoryUsage] = useState(0);
  const [clusterTotalNodes, setClusterTotalNodes] = useState(0);
  const [clusterTotalDeployments, setClusterTotalDeployments] = useState(0);
  const [clusterTotalPods, setClusterTotalPods] = useState(0);
  const [clusterTotalServices, setClusterTotalServices] = useState(0);

  //fetch data from promQL server to update state
  useEffect(async() => {
    const currentClusterCpuUsage = await clusterPromql.fetchClusterCpuUsage();
    const currentClusterMemoryUsage = await clusterPromql.fetchClusterMemoryUsage();
    const currentTotalNodes = await clusterPromql.fetchTotalNodes();
    const currentTotalDeployments = await clusterPromql.fetchTotalDeployments();
    const currentTotalPods = await clusterPromql.fetchTotalPods();
    const currentTotalServices = await clusterPromql.fetchTotalServices();
    setClusterCpuUsage(currentClusterCpuUsage);
    setClusterMemoryUsage(currentClusterMemoryUsage);
    setClusterTotalNodes(currentTotalNodes);
    setClusterTotalDeployments(currentTotalDeployments);
    setClusterTotalPods(currentTotalPods);
    setClusterTotalServices(currentTotalServices);
  }, []);

  return(
    <div className="cluster-info-div">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row'
        }}
      > 
        <Box sx={{border: '1px solid red'}}>
          <h2>CPU Usage (percent of total)</h2>
          <GaugeChart id="gauge-chart" 
            nrOfLevels={30} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.3} 
            percent={clusterCpuUsage / 100} 
            textColor={"#000"}
          />
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Memory Usage (percent of allocatable memory)</h2>
          <GaugeChart id="gauge-chart" 
            nrOfLevels={30} 
            colors={["#FF5F6D", "#FFC371"]} 
            arcWidth={0.3} 
            percent={clusterMemoryUsage} 
            textColor={"#000"}
          />
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Total Nodes in Cluster</h2>
          <span>{clusterTotalNodes}</span>
        </Box>
       <Box sx={{border: '1px solid red'}}>
          <h2>Total Deployments in Cluster</h2>
          <span>{clusterTotalDeployments}</span>
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Total Pods in Cluster</h2>
          <span>{clusterTotalPods}</span>
        </Box>
        <Box sx={{border: '1px solid red'}}>
          <h2>Total Services in Cluster</h2>
          <span>{clusterTotalServices}</span>
        </Box>
        
      </Box>
    </div>
  )
 }

export default ClusterOverview;
