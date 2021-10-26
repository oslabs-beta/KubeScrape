import * as actionTypes from '../constants/actionTypes';

export const getNodeNames = nodeNames => ({
  type: actionTypes.GET_NODE_NAME,
  payload: nodeNames
});

export const getNodeName = async() => {
  const data = await fetch('http://localhost:9090/api/v1/query?query=kube_node_info', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
  const result = data.data.result;
  const nodeNames = result.map(result => {
    return result.metric.node;
  })
  return nodeNames;
}