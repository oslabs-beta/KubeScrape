import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NodeActionCreators from '../../action-creators/NodeActionCreators';
import fetchNodeNames from '../../actions/actions';

export const NodeOverview = () => {

  const nodeNames = useSelector(state => state.node.nodeNames);
  const dispatch = useDispatch();

  const { getNodeNames } = bindActionCreators(NodeActionCreators, dispatch);

  useEffect(async () => {
    await actions.fetchNodeNames();
    dispatch(getNodeNames());
    console.log(nodeNames)
  }, [dispatch]);

  return (
    <div className="node-info-div">
      <h2>{nodeNames}</h2>
    </div>
  )
}

// export default NodeOverview;
