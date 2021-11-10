/**
 * ************************************
 *
 * @module  NodeOverview.js
 * @description component that renders basic information about a node
 *
 * ************************************
 */


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import { 
  Container, Grid, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as actions from '../../actions/actions';
 
// fetch requests to the Prometheus server are stored as functions in utils/promql-requests.js
import * as nodePromql from '../../utils/node-promql-util';
 
const primaryColor = '#25274D';
 
// create a functional component
const NodeOverview = (props) => {
 
  // useSelector allows you to extract data from the Redux store state, using a selector function
  // this function accesses the state from the nodeReducer by subscribing to the store through sseSelector
  const { nodeCpuUsage, nodeMemoryUsage, pods, nodePodCapacity } = useSelector(state => state.node);
  const [nodeNetworkUtilization, setNodeNetworkUtilization] = useState(0);
  const [nodeNetworkErrors, setNodeNetworkErrors] = useState(0);
 
  // the useDispatch hook returns a reference to the dispatch function from the Redux store.
  // dispatch can now be used to dispatch actions as needed
  const dispatch = useDispatch();
 
  const history = useHistory();
 
  // function to fetch prometheus data and store using redux
  const fetchDataToStore = async () => {
    const nodeCpuUsagePercentage = await nodePromql.fetchCpuUsage();
    const nodeMemoryUsagePercentage = await nodePromql.fetchMemoryUsage(props.nodeName);
    const pods = await nodePromql.fetchNodePods(props.nodeName);
    const nodePodCapacity = await nodePromql.fetchPodCapacity();
    const currentNetworkUtilization = await nodePromql.fetchNetworkUtilization();
    const currentNetworkErrors = await nodePromql.fetchNetworkErrors();
 
    dispatch(actions.setCpuUsage(nodeCpuUsagePercentage));
    dispatch(actions.setMemoryUsage(nodeMemoryUsagePercentage));
    dispatch(actions.setNodePods(pods));
    dispatch(actions.setPodCapacity(nodePodCapacity));
    setNodeNetworkUtilization(currentNetworkUtilization);
    setNodeNetworkErrors(currentNetworkErrors);
  };
 
  // fetch data, then fetch again in 30 seconds
  useEffect(async () => {
    fetchDataToStore();
    setInterval(() => {
      fetchDataToStore();
    }, 30000);
  }, []);
 
  // Styles
  const PREFIX = 'NodeOverview';
  const classes = {
    flex: `${PREFIX}-flex`,
    graphItem: `${PREFIX}-graphItem`,
    metricsItem: `${PREFIX}-metrixItem`,
  };
  const StyledContainer = styled(Container)(({ theme }) => ({
    ':hover': {
      filter: 'brightness(150%)'
    }
  }));
  const GridItem = styled(Grid)(({ theme }) => ({
    [`&.${classes.flex}`] : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    [`&.${classes.graphItem}`] : {
      marginTop: '-15px'
    },
    [`&.${classes.metricsItem}`] : {
      marginTop: '25px'
    }
  }));
 
  // function to handle node click
  const goToNode = (nodeName) => {
    history.push({
      pathname:'/node',
      nodeName
    });
  };
 
  // function to render a gauge
  const renderGauge = (title, value) => (
    <>          
      <h6>{title}</h6>
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
    </>
  );
 
  return (
    <StyledContainer maxWidth="xs" 
      onClick={() => goToNode(props.nodeName)}
      sx={{
        backgroundColor: primaryColor,
        borderRadius: '5px',
        paddingBottom: '10px'
      }}>
      <Typography 
        variant='h6' 
        component='div' 
        align='center'
        sx={{
          paddingTop: '20px'
        }}>
         Node: {props.nodeName}
      </Typography>
      <Grid container justifyContent='center'>
        <GridItem item sm={6} lg={3} className={`${classes.flex} ${classes.metricsItem}`}>
          <span>{pods.length}</span>            
          <h6>Active Pods</h6>
        </GridItem>
        <GridItem item sm={6} lg={3} className={`${classes.flex} ${classes.metricsItem}`}>
          <span>{nodePodCapacity - pods.length}</span>            
          <h6>Available Pods</h6>
        </GridItem>
        <GridItem item sm={6} lg={3} className={`${classes.flex} ${classes.metricsItem}`}>            
          <span>{nodeNetworkUtilization} kb/s</span> 
          <h6>Network Utilization</h6>
        </GridItem>
        <GridItem item sm={6} lg={3} className={`${classes.flex} ${classes.metricsItem}`}>            
          <span>{nodeNetworkErrors}</span> 
          <h6>Errors</h6>
        </GridItem>
        <GridItem item lg={6} className={`${classes.flex} ${classes.graphItem}`}>
          {renderGauge('Node CPU Usage', nodeCpuUsage / 100)}
        </GridItem>
        <GridItem item lg={6} className={`${classes.flex} ${classes.graphItem}`}>          
          {renderGauge('Node Memory Usage', nodeMemoryUsage / 100)}
        </GridItem>
      </Grid>
    </StyledContainer>
  );
};
 
export default NodeOverview;
 