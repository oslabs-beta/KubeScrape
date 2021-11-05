/**
 * ************************************
 *
 * @module  actions.js
 * @description actions
 *
 * ************************************
 */

import * as actionTypes from '../constants/actionTypes';

/* actions that are dispatched to the reducer */

// cluster actions
export const setClusterDeployments = (deployments) => ({
  type: actionTypes.SET_CLUSTER_DEPLOYMENTS,
  payload: deployments
});

export const setClusterNamespaces = (namespaces) => ({
  type: actionTypes.SET_CLUSTER_NAMESPACES,
  payload: namespaces
});

export const setClusterServices = (services) => ({
  type: actionTypes.SET_CLUSTER_SERVICES,
  payload: services
});

export const setClusterNodes = (nodes) => ({
  type: actionTypes.SET_CLUSTER_NODES,
  payload: nodes
});

// node actions
export const setCpuUsage = (nodeCpuUsage) => ({
  type: actionTypes.SET_CPU_USAGE,
  payload: nodeCpuUsage
});

export const setMemoryUsage = (nodeMemoryUsage) => ({
  type: actionTypes.SET_MEMORY_USAGE,
  payload: nodeMemoryUsage
});

export const setNodePods = (nodes) => ({
  type: actionTypes.SET_NODE_PODS,
  payload: nodes
});

export const setPodCapacity = (nodePodCapacity) => ({
  type: actionTypes.SET_POD_CAPACITY,
  payload: nodePodCapacity
});