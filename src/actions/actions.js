/**
 * ************************************
 *
 * @module  actions.js
 * @description actions
 *
 * ************************************
 */


import * as actionTypes from '../constants/actionTypes';
import regeneratorRuntime from "regenerator-runtime";


/* actions that are dispatched to the reducer */

export const getNodeNames = (nodeNames) => ({
  type: actionTypes.GET_NODE_NAMES,
  payload: nodeNames
});

export const getCpuUsage = (nodeCpuUsage) => ({
  type: actionTypes.GET_CPU_USAGE,
  payload: nodeCpuUsage
});

export const getMemoryUsage = (nodeMemoryUsage) => ({
  type: actionTypes.GET_MEMORY_USAGE,
  payload: nodeMemoryUsage
});

export const getPodTotal = (nodePodTotal) => ({
  type: actionTypes.GET_TOTAL_PODS,
  payload: nodePodTotal
});

export const getPodCapacity = (nodePodCapacity) => ({
  type: actionTypes.GET_POD_CAPACITY,
  payload: nodePodCapacity
});