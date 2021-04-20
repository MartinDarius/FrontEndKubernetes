import _ from 'lodash';
import * as RJD from 'react-js-diagrams';
import {store} from '../../store/store';
import {updateModel} from '../../store/actions/diagram';

export class DeploymentNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(224, 98, 20)') {
    super('deployment');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Serv'));
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'Pod'));
    this.name = name;
    this.color = color;
    this.deploymentName="";
    this.podName="";
    this.containerName="";
    this.containerPort="";
    this.image="";
    this.memory="";
    this.cpu="";
    this.imagePullPolicy=""
    this.replicas=0;
    this.model={}; 
  }

  deSerialize = (object) => {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.podName = object.podName;
    this.image=object.image;
    this.containerName=object.containerName;
    this.deploymentName=object.deploymentName;
    this.containerPort=object.containerPort;
    this.replicas=object.replicas;
    this.memory=object.memory;
    this.cpu=object.cpu;
    this.imagePullPolicy=object.imagePullPolicy;
    this.model=object.model;
  }

  serialize = () => {
    let serializedObj = super.serialize();
    return _.merge(serializedObj, {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      deploymentName: this.deploymentName,
      podName: this.podName,
      containerName: this.containerName,
      containerPort: this.containerPort,
      image: this.image,
      replicas: this.replicas,
      memory: this.memory,
      cpu: this.cpu,
      imagePullPolicy: this.imagePullPolicy,
      model : this.model
    });
  }

  generateYAML = () => {
    return `apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: ${this.deploymentName}
    spec:
      replicas: ${this.replicas}
      selector:
        matchLabels:
          app: ${this.podName}
      template:
        metadata:
          labels:
            app: ${this.podName}
        spec:
          containers:
          - name: ${this.containerName}
            image: ${this.image}
            resources:
              limits:
                memory: ${this.memory}
                cpu: ${this.cpu}
            imagePullPolicy: ${this.imagePullPolicy}
            ports:
            - containerPort: ${this.containerPort}`;
        
  }

  getProperties = () => {
    return {deploymentName: this.deploymentName, podName: this.podName, containerName: this.containerName, image: this.image, containerPort: this.containerPort, replicas: this.replicas, imagePullPolicy: this.imagePullPolicy};
  }

  getSomeProperties = () => {
    return {deploymentName: this.deploymentName, containerPort: this.containerPort, memory: this.memory, cpu: this.cpu}
  }

  getInPort = () => {
    return this.ports.input;
  }

  getOutPort = () => {
    return this.ports.output;
  }

  onSubmit = (properties) => {
 
    let deploymentNode = this.model.nodes.filter(item => item.id === this.id)[0];

    deploymentNode.deploymentName = properties.deploymentName;
    deploymentNode.containerPort = properties.containerPort;
    deploymentNode.memory= properties.memory;
    deploymentNode.cpu=properties.cpu;
    
    if(!(Object.keys(this.getOutPort().links).length === 0 && this.getOutPort().links.constructor === Object)){
       let serviceId1 = this.getOutPort().getLinks()[Object.keys(this.getOutPort().getLinks())[0]].getTargetPort().getParent().getID();
       let serviceId2 = this.getOutPort().getLinks()[Object.keys(this.getOutPort().getLinks())[0]].getSourcePort().getParent().getID();
       
       let serviceId;   
        if(serviceId1 === this.id){
          serviceId=serviceId2;
        }else {
          serviceId=serviceId1;
        }  
        
       let serviceNode = this.model.nodes.filter(item => item.id === serviceId)[0];
       
       serviceNode.deploymentName = properties.deploymentName;
       serviceNode.targetPort=properties.containerPort;
    }
    //globalConst.updateModel(this.model, {selectedNode: null});
    store.dispatch(updateModel(Object.assign({}, this.model), {selectedNode: null}))
    
  }


}
