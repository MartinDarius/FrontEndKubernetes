import _ from 'lodash';
import * as RJD from 'react-js-diagrams';
//import {globalConst} from './../../../App';

import { store } from './../../../store';
import { updateModel } from './../../../actions';

export class ServiceNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(224, 98, 20)') {
    super('service');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Ing'));
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'Depl'));
    this.name = name;
    this.color = color;
    this.serviceName=""
    this.typeOfService=""
    this.deploymentName=""
    this.port=""
    this.targetPort=""
    this.servicePath="";
    this.serviceHost="";
    this.model={};
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.deploymentName=object.deploymentName;
    this.serviceName=object.serviceName;
    this.typeOfService=object.typeOfService;
    this.port=object.port;
    this.targetPort=object.targetPort;
    this.servicePath=object.servicePath;
    this.serviceHost=object.serviceHost;
    this.model=object.model;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      serviceName: this.serviceName,
      typeOfService: this.typeOfService,
      deploymentName: this.deploymentName,
      port: this.port,
      targetPort: this.targetPort,
      servicePath: this.servicePath,
      serviceHost: this.serviceHost,
      model : this.model
    });
  }

  generateYAML(){
    return `apiVersion: v1
    kind: Service
    metadata:
      name: ${this.serviceName}
    spec:
      type: ${this.typeOfService}
      selector:
        app: ${this.deploymentName}
      ports:
        - port: ${this.port}
          targetPort: ${this.targetPort}
          ${this.servicePath}
          ${this.serviceHost}`;
        
  }
  
  getProperties(){
    return {serviceName: this.serviceName, typeOfService:this.typeOfService,port: this.port, servicePath: this.servicePath, serviceHost:this.serviceHost}; 
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {

    let serviceNode = this.model.nodes.filter(item => item.id === this.id)[0];
    serviceNode.serviceName = properties.serviceName;
    serviceNode.typeOfService = properties.typeOfService;
    serviceNode.port = properties.port;
    serviceNode.servicePath= properties.servicePath;
    serviceNode.serviceHost= properties.serviceHost;

    if(!(Object.keys(this.getOutPort().links).length === 0 && this.getOutPort().links.constructor === Object)){
       let ingressId1 = this.getOutPort().getLinks()[Object.keys(this.getOutPort().getLinks())[0]].getTargetPort().getParent().getID();
       let ingressId2 = this.getOutPort().getLinks()[Object.keys(this.getOutPort().getLinks())[0]].getSourcePort().getParent().getID();
       
       let ingressId;   
        if(ingressId1 === this.id){
          ingressId=ingressId2;
        }else {
          ingressId=ingressId1;
        }  
      let ingressNode = this.model.nodes.filter(item => item.id === ingressId)[0];
      
      let servProp=ingressNode.serviceProp;

      let newServProp=servProp.map(object =>{
        if(object.id===this.id){
          object.serviceName=properties.serviceName;
          object.servicePort=properties.port;
          object.servicePath=properties.servicePath;
          object.serviceHost=properties.serviceHost;
        }
        return object; 
      })
      console.log(newServProp);
      ingressNode.serviceProp=newServProp;
      //globalConst.updateModel(this.model, {selectedNode: null});
      
   }
   store.dispatch(updateModel(Object.assign({}, this.model), {selectedNode: null}))
  }
}
