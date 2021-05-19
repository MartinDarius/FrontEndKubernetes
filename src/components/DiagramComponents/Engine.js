//import React from 'react';
import * as RJD from 'react-js-diagrams';
import { ConnectionWidgetFactory } from '../nodes/connection/ConnectionWidgetFactory';
import { ConnectionNodeFactory } from '../nodes/connection/ConnectionInstanceFactories';
import { PodWidgetFactory } from '../nodes/pod/PodWidgetFactory';
import { PodNodeFactory } from '../nodes/pod/PodInstanceFactories';
import { DeploymentWidgetFactory } from '../nodes/deployment/DeploymentWidgetFactory';
import { DeploymentNodeFactory } from '../nodes/deployment/DeploymentInstanceFactories';
import { ServiceWidgetFactory } from '../nodes/service/ServiceWidgetFactory';
import { ServiceNodeFactory } from '../nodes/service/ServiceInstanceFactories';
import { IngressWidgetFactory } from '../nodes/ingress/IngressWidgetFactory';
import { IngressNodeFactory } from '../nodes/ingress/IngressInstanceFactories';
import { ConfigMapNodeFactory } from '../nodes/configMap/ConfigMapInstanceFactories';
import { ConfigMapWidgetFactory } from '../nodes/configMap/ConfigMapWidgetFactory';
import { SecretNodeFactory } from '../nodes/secret/SecretInstanceFactories';
import { SecretWidgetFactory } from '../nodes/secret/SecretWidgetFactory';
import { StatefulSetNodeFactory } from '../nodes/statefulSet/StatefulSetInstanceFactories';
import { StatefulSetWidgetFactory } from '../nodes/statefulSet/StatefulSetWidgetFactory';
import { StorageClassNodeFactory } from '../nodes/storageClass/StorageClassInstanceFactories';
import { StorageClassWidgetFactory } from '../nodes/storageClass/StorageClassWidgetFactory';
import { PersistentVolumeClaimNodeFactory } from '../nodes/persistentVolumeClaim/PersistentVolumeClaimInstanceFactories';
import { PersistentVolumeClaimWidgetFactory } from '../nodes/persistentVolumeClaim/PersistentVolumeClaimWidgetFactory';
import { PersistentVolumeNodeFactory } from '../nodes/persistentVolume/PersistentVolumeInstanceFactories';
import { PersistentVolumeWidgetFactory } from '../nodes/persistentVolume/PersistentVolumeWidgetFactory';




// Setup the diagram engine
export const diagramEngine = new RJD.DiagramEngine();
diagramEngine.registerNodeFactory(new RJD.DefaultNodeFactory());
diagramEngine.registerLinkFactory(new RJD.DefaultLinkFactory());
diagramEngine.registerNodeFactory(new ConnectionWidgetFactory());
diagramEngine.registerNodeFactory(new PodWidgetFactory());
diagramEngine.registerNodeFactory(new DeploymentWidgetFactory());
diagramEngine.registerNodeFactory(new ServiceWidgetFactory());
diagramEngine.registerNodeFactory(new IngressWidgetFactory());
diagramEngine.registerNodeFactory(new ConfigMapWidgetFactory());
diagramEngine.registerNodeFactory(new SecretWidgetFactory());
diagramEngine.registerNodeFactory(new StatefulSetWidgetFactory());
diagramEngine.registerNodeFactory(new StorageClassWidgetFactory());
diagramEngine.registerNodeFactory(new PersistentVolumeClaimWidgetFactory());
diagramEngine.registerNodeFactory(new PersistentVolumeWidgetFactory());





// Register instance factories
diagramEngine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.LinkInstanceFactory());
diagramEngine.registerInstanceFactory(new ConnectionNodeFactory());
diagramEngine.registerInstanceFactory(new PodNodeFactory());
diagramEngine.registerInstanceFactory(new DeploymentNodeFactory());
diagramEngine.registerInstanceFactory(new ServiceNodeFactory());
diagramEngine.registerInstanceFactory(new IngressNodeFactory());
diagramEngine.registerInstanceFactory(new ConfigMapNodeFactory());
diagramEngine.registerInstanceFactory(new SecretNodeFactory());
diagramEngine.registerInstanceFactory(new StatefulSetNodeFactory());
diagramEngine.registerInstanceFactory(new StorageClassNodeFactory());
diagramEngine.registerInstanceFactory(new PersistentVolumeClaimNodeFactory());
diagramEngine.registerInstanceFactory(new PersistentVolumeNodeFactory());

