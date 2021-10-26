import * as types from '../constants/actionTypes';

const initialState = {
  nodeNames: [],
  nodeCpuUsage: 0,
  nodeMemoryUsage: 0,
  nodeTotalPods: 0,
  nodePodCapacity: 0
};

const nodeReducer = (
  state = initialState, 
  action
) => {
  const deepStateClone = JSON.parse(JSON.stringify(state));
  
  switch (action.type) {
    case types.GET_NODE_NAMES:
      return {
        ...state,
        nodeNames: action.payload
      }
    case types.GET_CPU_USAGE:
      return {
        ...deepStateClone,
        nodeCpuUsage: action.payload
      }
    case types.GET_MEMORY_USAGE:
      return {
        ...deepStateClone,
        nodeMemoryUsage: action.payload
      }
    case types.GET_TOTAL_PODS:
      return {
        ...deepStateClone,
        nodeTotalPods: action.payload
      }
    case types.GET_POD_CAPACITY:
      return {
        ...deepStateClone,
        nodePodCapacity: action.payload
      }
    default:
      return state
  }
};

export default nodeReducer;
