/**
 * ************************************
 *
 * @module  ClusterViewContainer.js
 * @description component that renders cluster information on home page
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Box, Grid, Paper, Toolbar, Container, Typography } from '@mui/material';
import NodeOverview from '../NodeOverview/NodeOverview';
import ClusterOverview from '../ClusterOverview/ClusterOverview';
import DeploymentOverview from '../DeploymentContainer/DeploymentOverview';
import * as clusterPromql from '../../utils/cluster-promql-util';
import * as actions from '../../actions/actions';
import { styled } from '@mui/system';

const primaryColor = '#25274D';

const ClusterViewContainer = () => {
  // hooks
  const dispatch = useDispatch();

  // extract data from Redux store state
  const { deployments, nodes } = useSelector(state => state.cluster);

  // TODO: render deployments
  // TODO: prevent element from rerendering? useMemo? some optimization hook
  // TODO: add shadows to components

  useEffect(async () => {
    // initialize state when app loads
    const namespaces = await clusterPromql.fetchAllNamespaces();
    const nodes = await clusterPromql.fetchClusterNodes();
    const deployments = await clusterPromql.fetchTotalDeployments();
    const services = await clusterPromql.fetchAllServices();

    dispatch(actions.setClusterNamespaces(namespaces));
    dispatch(actions.setClusterNodes(nodes));
    dispatch(actions.setClusterDeployments(deployments));
    dispatch(actions.setClusterServices(services));
  }, []);

  const StyledTypography = styled(Typography)(({ theme }) => ({
    backgroundColor: primaryColor,
    display: 'box-sizing',
    padding: '10px 25px',
    borderRadius: '5px',
    marginBottom: '20px',
    flexGrow: 1,
  }));

  const nodeComponents = [];

  nodes.forEach(node => {
    nodeComponents.push(<NodeOverview key={node} nodeName={node} />);
  });

  const deploymentComponents = [];
  deployments.forEach((depl, i) => {
    deploymentComponents.push(
      <DeploymentOverview
        key={depl.metric.instance + i}
        deployment={depl.metric.deployment}
        instance={depl.metric.instance}
        job={depl.metric.job}
        namespace={depl.metric.namespace}
        createdOnDate={new Date(depl.value[1] * 1000).toLocaleString()}
      />
    );
  });

  return (
    <Box sx={{ flexGrow: 1, width: '90%' }}>
      <AppBar
        position="relative"
        sx={{
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Cluster View
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginBottom: '40px' }}>
        <ClusterOverview />
      </Container>

      <Container>
        <Paper elevation={3}>
          <StyledTypography variant='h6' component='div'>
            Running Nodes
          </StyledTypography>
        </Paper>
        
        <Container sx={{ display: 'flex', marginBottom: '40px' }}>
          {nodeComponents}
        </Container>
      </Container>

      <Container>
        <Paper elevation={3}>
          <StyledTypography variant='h6' component='div'>
          Deployments
          </StyledTypography>
        </Paper>

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {deploymentComponents}
        </Container>
      </Container>
    </Box>
  );
};

export default ClusterViewContainer;
