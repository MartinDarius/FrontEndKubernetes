import React from 'react';
import DragWrapper from './DragWrapper';
import { PodNodeWidget } from '../nodes/pod/PodNodeWidget';
import { DeploymentNodeWidget } from '../nodes/deployment/DeploymentNodeWidget';
import { ServiceNodeWidget } from '../nodes/service/ServiceNodeWidget';
import { IngressNodeWidget } from '../nodes/ingress/IngressNodeWidget';
import { ConfigMapNodeWidget } from '../nodes/configMap/ConfigMapNodeWidget';
import { StatefulSetNodeWidget } from '../nodes/statefulSet/StatefulSetNodeWidget';
import { SecretNodeWidget } from '../nodes/secret/SecretNodeWidget';
import { StorageClassNodeWidget } from '../nodes/storageClass/StorageClassNodeWidget';
import { PersistentVolumeClaimNodeWidget } from '../nodes/persistentVolumeClaim/PersistentVolumeClaimNodeWidget';
import { PersistentVolumeNodeWidget } from '../nodes/persistentVolume/PersistentVolumeNodeWidget';


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
    if (type === 'configMap') {
      return <ConfigMapNodeWidget node={{ name: 'ConfigMap' }} color={color} displayOnly />;
    }
    if (type === 'secret') {
      return <SecretNodeWidget node={{ name: 'Secret' }} color={color} displayOnly />;
    }
    if (type === 'statefulSet') {
      return <StatefulSetNodeWidget node={{ name: 'StatefulSet' }} color={color} displayOnly />;
    }
    if (type === 'storageClass') {
      return <StorageClassNodeWidget node={{ name: 'StorageClass' }} color={color} displayOnly />;
    }
    if (type === 'persistentVolumeClaim') {
      return <PersistentVolumeClaimNodeWidget node={{ name: 'PersVolClaim' }} color={color} displayOnly />;
    }
    if (type === 'persistentVolume') {
      return <PersistentVolumeNodeWidget node={{ name: 'PersVol' }} color={color} displayOnly />;
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
        <div className='node-wrapper'>
          <Node type='configMap' color='rgb(70, 120, 120)' />
        </div>
        <div className='node-wrapper'>
          <Node type='secret' color='rgb(150, 40, 120)' />
        </div>
        <div className='node-wrapper'>
          <Node type='statefulSet' color='rgb(150, 140, 170)' />
        </div>
        <div className='node-wrapper'>
          <Node type='storageClass' color='rgb(100, 140, 180)' />
        </div>
        <div className='node-wrapper'>
          <Node type='persistentVolumeClaim' color='rgb(10, 40, 180)' />
        </div>
        <div className='node-wrapper'>
          <Node type='persistentVolume' color='rgb(110, 240, 80)' />
        </div>
        
      </div>
    );
  }
}
