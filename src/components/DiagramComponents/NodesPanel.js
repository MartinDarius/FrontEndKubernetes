import React from 'react';
import DragWrapper from './DragWrapper';
import { PodNodeWidget } from '../nodes/pod/PodNodeWidget';
import { DeploymentNodeWidget } from '../nodes/deployment/DeploymentNodeWidget';
import { ServiceNodeWidget } from '../nodes/service/ServiceNodeWidget';
import { IngressNodeWidget } from '../nodes/ingress/IngressNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color } = this.props;

    if (type === 'pod') {
      return <PodNodeWidget node={{ name: 'Pod' }} color={color} displayOnly />;
    }
    if (type === 'deployment') {
      return <DeploymentNodeWidget node={{ name: 'Deployment' }} color={color} displayOnly />;
    }
    if (type === 'service') {
      return <ServiceNodeWidget node={{ name: 'Service' }} color={color} displayOnly />;
    }
    if (type === 'ingress') {
      return <IngressNodeWidget node={{ name: 'Ingress' }} color={color} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color } = this.props;

    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
    return (
      <div className='nodes-panel'>
        <div className='node-wrapper'>
          <Node type='pod' color='rgb(224, 98, 20)' />
        </div>
        <div className='node-wrapper'>
          <Node type='deployment' color='rgb(157, 13, 193)'/>
        </div>
        <div className='node-wrapper'>
          <Node type='service' color='rgb(12, 193, 180)' />
        </div>
        <div className='node-wrapper'>
          <Node type='ingress' color='rgb(50, 100, 180)' />
        </div>
      </div>
    );
  }
}
