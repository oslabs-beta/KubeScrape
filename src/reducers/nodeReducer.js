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
  switch (action.type) {
    case types.GET_NODE_NAMES:
      return Object.assign({}, state, { nodeNames: action.payload });
    default:
      return state
  }
};

export default nodeReducer;
