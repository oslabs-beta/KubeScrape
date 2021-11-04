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
import { Container, Grid } from '@mui/material';
import * as clusterPromql from '../../utils/cluster-promql-util';
import { styled } from '@mui/system';

const primaryColor = '#25274D';

//create a functional component
const ClusterOverview = () => {
  // TO DO: get deployments from redux store using useSelector
  


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

  const PREFIX = 'ClusterOverview';

  const classes = {
    flex: `${PREFIX}-flex`,
    graphItem: `${PREFIX}-graphItem`,
    metricsItem: `${PREFIX}-metrixItem`,
  }

  const GridItem = styled(Grid)(({ theme }) => ({
    [`&.${classes.flex}`] : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    [`&.${classes.graphItem}`] : {
      backgroundColor: primaryColor,
      margin: '10px 20px 0',
      paddingBottom: '10px',
      borderRadius: '5px',
    },
    [`&.${classes.metricsItem}`] : {
      backgroundColor: primaryColor,
      paddingBottom: '15px',
      margin: '10px 20px',
      borderRadius: '5px',
    }
  }));

  const renderGauge = (title, value) => {
    return(
      <>          
        <h3>{title}</h3>
        <GaugeChart id="gauge-chart" 
          nrOfLevels={3} 
          colors={["#29648A", "#F8E9A1", "#F76C6C"]} 
          arcWidth={0.3} 
          arcPadding={0}
          percent={value} 
          textColor={"#FFF"}
          needleColor="#FFF"           
        />
      </>
    )
  }

  return(
    <Container>
    {/* <h2>Cluster Name: {nodeNames}</h2> */}
      <Grid container justifyContent='center'>
        <GridItem item xs={6} sm={2} className={`${classes.flex} ${classes.metricsItem}`}>          
          <h5>Total Nodes</h5>
          <span>{clusterTotalNodes}</span>
        </GridItem>
        <GridItem item xs={6} sm={2} className={`${classes.flex} ${classes.metricsItem}`}>          
          <h5>Total Deployments</h5>
          <span>{clusterTotalDeployments.length}</span>
        </GridItem>
        <GridItem item xs={6} sm={2} className={`${classes.flex} ${classes.metricsItem}`}>            
          <h5>Total Pods</h5>
          <span>{clusterTotalPods}</span>
        </GridItem>
        <GridItem item xs={6} sm={2} className={`${classes.flex} ${classes.metricsItem}`}>            
          <h5>Total Services</h5>
          <span>{clusterTotalServices}</span>
        </GridItem>

        <GridItem item xs={8} sm={4} className={`${classes.flex} ${classes.graphItem}`}>
          {renderGauge('CPU Usage', clusterCpuUsage / 100)}
        </GridItem>
        <GridItem item xs={8} sm={4} className={`${classes.flex} ${classes.graphItem}`}>
          {renderGauge('Memory Usage', clusterMemoryUsage)}
        </GridItem>
      </Grid>
      
    </Container>
  )
 }

export default ClusterOverview;
