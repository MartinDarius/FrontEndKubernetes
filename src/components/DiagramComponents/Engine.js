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
import { ConfigMapNodeFactory } from '../nodes/ConfigMap/ConfigMapInstanceFactories';
import { ConfigMapWidgetFactory } from '../nodes/ConfigMap/ConfigMapWidgetFactory';
import { SecretNodeFactory } from '../nodes/secret/SecretInstanceFactories';
import { SecretWidgetFactory } from '../nodes/secret/SecretWidgetFactory';



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
