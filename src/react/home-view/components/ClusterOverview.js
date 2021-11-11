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
import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as clusterPromql from '../../../utils/cluster-promql-util';
 
const primaryColor = '#25274D';
 
const ClusterOverview = () => {
 
  // initialize state that is rendered only in this component
  const [clusterCpuUsage, setClusterCpuUsage] = useState(0);
  const [clusterMemoryUsage, setClusterMemoryUsage] = useState(0);
  const [clusterTotalDeployments, setClusterTotalDeployments] = useState(0);
  const [clusterTotalPods, setClusterTotalPods] = useState(0);
  // const [clusterTotalServices, setClusterTotalServices] = useState();
  const { services, nodes } = useSelector(state => state.cluster);
 
  // function to fetch prometheus data and update redux store
  const fetchToStore = async () => {
    const currentClusterCpuUsage = await clusterPromql.fetchClusterCpuUsage();
    const currentClusterMemoryUsage = await clusterPromql.fetchClusterMemoryUsage();
    const currentTotalDeployments = await clusterPromql.fetchTotalDeployments();
    const currentTotalPods = await clusterPromql.fetchTotalPods();
    setClusterCpuUsage(currentClusterCpuUsage);
    setClusterMemoryUsage(currentClusterMemoryUsage);
    setClusterTotalDeployments(currentTotalDeployments);
    setClusterTotalPods(currentTotalPods);
  };
 
  // fetch data, then fetch again in 30 seconds
  // when component unmounts, cancel setInterval in a cleanup function
  useEffect(() => {
    fetchToStore();
    const interval = setInterval(() => 
      fetchToStore(), 30000);
    return () => clearInterval(interval);
  }, []);

  const PREFIX = 'ClusterOverview';
 
  const classes = {
    flex: `${PREFIX}-flex`,
    graphItem: `${PREFIX}-graphItem`,
    metricsItem: `${PREFIX}-metricsItem`,
  };
 
  const GridItem = styled(Grid)(({ theme }) => ({
    [`&.${classes.flex}`] : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    [`&.${classes.graphItem}`] : {
      margin: '10px 20px 0',
      paddingBottom: '10px',
      borderRadius: '5px',
      textAlign: 'center',
    },
    [`&.${classes.metricsItem}`] : {
      margin: '10px 20px',
      borderRadius: '5px',
      textAlign: 'center',
    }
  }));
 
  const renderGauge = (title, value) => (
    <Grid item xs={12}>          
      <h3>{title}</h3>
      <GaugeChart id="gauge-chart" 
        nrOfLevels={3} 
        colors={['#29648A', '#F8E9A1', '#F76C6C']} 
        arcWidth={0.3} 
        arcPadding={0}
        cornerRadius={0}
        percent={value} 
        textColor="#FFF"
        needleColor="#FFF"
        animate={false}
      />
    </Grid>
  );

 
  return(
    <Container sx={{width: '100%'}}>
      <Grid container justifyContent='center'>
               
        <GridItem item xs={12} sm={4} className={`${classes.flex} ${classes.metricsItem}`}>
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            <h5>Total Nodes</h5>
            <span>{nodes.length}</span>
          </Paper>
        </GridItem>

        <GridItem item xs={12} sm={4} className={`${classes.flex} ${classes.metricsItem}`}> 
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            <h5>Total Deployments</h5>
            <span>{clusterTotalDeployments.length}</span>
          </Paper>
        </GridItem>

        <GridItem item container xs={12} sm={4} className={`${classes.flex} ${classes.metricsItem}`}>   
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            <h5>Total Pods</h5>
            <span>{clusterTotalPods}</span>
          </Paper>
        </GridItem>
        <GridItem item xs={12} sm={4} className={`${classes.flex} ${classes.metricsItem}`}>  
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            <h5>Total Services</h5>
            <span>{services.length}</span>
          </Paper>
        </GridItem>
 
        <GridItem item xs={12} sm={4} className={`${classes.flex} ${classes.graphItem}`}>
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            {renderGauge('CPU Usage', clusterCpuUsage / 100)}
          </Paper>
        </GridItem>
        <GridItem item xs={12} sm={4} className={`${classes.flex} ${classes.graphItem}`}>
          <Paper elevation={5} sx={{width: '100%', pb: '15px' }}>
            {renderGauge('Memory Usage', clusterMemoryUsage / 100)}
          </Paper>
        </GridItem>
      </Grid>
       
    </Container>
  );
};
 
export default ClusterOverview; 