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

export const setNodeNames = (nodeNames) => ({
  type: actionTypes.SET_NODE_NAMES,
  payload: nodeNames
});

export const setCpuUsage = (nodeCpuUsage) => ({
  type: actionTypes.SET_CPU_USAGE,
  payload: nodeCpuUsage
});

export const setMemoryUsage = (nodeMemoryUsage) => ({
  type: actionTypes.SET_MEMORY_USAGE,
  payload: nodeMemoryUsage
});

export const setPodTotal = (nodePodTotal) => ({
  type: actionTypes.SET_TOTAL_PODS,
  payload: nodePodTotal
});

export const setPodCapacity = (nodePodCapacity) => ({
  type: actionTypes.SET_POD_CAPACITY,
  payload: nodePodCapacity
});