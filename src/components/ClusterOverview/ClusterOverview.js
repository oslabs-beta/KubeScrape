/**
 * ************************************
 *
 * @module  ClusterOverview
 * @description component that renders basic information about the user's cluster
 *
 * ************************************
 */


 import React, { useState, useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import GaugeChart from 'react-gauge-chart';
 import { Doughnut } from 'react-chartjs-2';
 import Container from '@mui/material/Container';
 import Box from '@mui/material/Box';

 import * as clusterPromql from '../../utils/cluster-promql-util';

 //create a functional component
const ClusterOverview = () => {
  
  //initialize state that is rendered only in this component
  const { nodeNames } = useSelector(state => state.node);
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
    <Container>
      <h2>Cluster Overview</h2>
      <div className="object-info-div">
        <Box 
            sx={{
              border: '1px solid black',
              display: "flex",
              flexWrap: "wrap",
              justifyContent: 'center',
              p: 1,
              m: 1,
              width: '90%'
            }}
        > 
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%'
            }}
          >          
          <h2>CPU Usage (percent of total)</h2>
            <GaugeChart id="gauge-chart" 
              nrOfLevels={3} 
              colors={["#29648A", "#F8E9A1", "#F76C6C"]} 
              arcWidth={0.3} 
              arcPadding={0}
              percent={clusterCpuUsage / 100} 
              textColor={"#FFF"}
              needleColor="#FFF"           
            />
          </Box>
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%'
            }}
          >          
          <h2>Memory Usage (percent of allocatable memory)</h2>
            <GaugeChart id="gauge-chart" 
              nrOfLevels={3} 
              colors={["#29648A", "#F8E9A1", "#F76C6C"]} 
              arcWidth={0.3} 
              arcPadding={0}
              percent={clusterMemoryUsage / 100} 
              textColor={"#FFF"}
              needleColor="#FFF"           
            />
          </Box>
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%',
            textAlign: 'center'
            }}
          >          
          <h2>Total Nodes in Cluster</h2>
            <span>{clusterTotalNodes}</span>
          </Box>
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%',
            textAlign: 'center'
            }}
          >          
          <h2>Total Deployments in Cluster</h2>
            <span>{clusterTotalDeployments}</span>
          </Box>
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%',
            textAlign: 'center'
            }}
          >            
          <h2>Total Pods in Cluster</h2>
            <span>{clusterTotalPods}</span>
          </Box>
          <Box sx={{
            border: '1px solid black',
            minWidth: 300,
            maxWidth: '45%',
            textAlign: 'center'
            }}
          >            
          <h2>Total Services in Cluster</h2>
            <span>{clusterTotalServices}</span>
          </Box>
          
        </Box>
      </div>
    </Container>
  )
 }

export default ClusterOverview;
