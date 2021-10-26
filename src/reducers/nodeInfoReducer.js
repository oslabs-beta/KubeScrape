import * as types from '../constants/actionTypes';

const initialState = {
  nodeNames = [],
  nodeCpuUsage = 0,
  nodeMemoryUsage = 0,
  nodeTotalPods = 0,
  nodePodCapacity = 0
};

export const nodeInforeducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NODE_NAME:
      return Object.assign({}, state, { nodeNames: action.payload })
  }
}