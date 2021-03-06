/**
 * ************************************
 *
 * @module  podReducer
 * @description reducer for pod data
 *
 * ************************************
 */

import * as types from '../../redux/constants/actionTypes';

const initialState = {
  podInfo: [],
};

const podReducer = (state = initialState, action) => {
  const deepStateClone = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.SET_POD_INFO:
      return {
        ...deepStateClone,
        podInfo: action.payload,
      };
    case types.SET_CPU_USAGE:
      return {
        ...deepStateClone,
        podCpuUsage: action.payload,
      };
    case types.SET_MEMORY_USAGE:
      return {
        ...deepStateClone,
        podMemoryUsage: action.payload,
      };
    // case types.SET_TOTAL_PODS:
    //   return {
    //     ...deepStateClone,
    //     podTotalPods: action.payload
    //   }
    case types.SET_POD_CAPACITY:
      return {
        ...deepStateClone,
        podPodCapacity: action.payload,
      };
    default:
      return state;
  }
};

export default podReducer;
