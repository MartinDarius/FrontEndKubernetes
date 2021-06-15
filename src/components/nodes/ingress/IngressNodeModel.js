import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class IngressNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(224, 98, 20)') {
    super('ingress');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'Serv'));
    this.name = name;
    this.color = color;
    this.ingressName="";
    this.serviceName="";
    this.servicePort="";
    this.serviceProp=[];
    
  }

  deSerialize =(object) => {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.ingressName=object.ingressName;
    this.serviceName=object.serviceName;
    this.servicePort=object.servicePort;
    this.serviceProp=object.serviceProp;
  }

  serialize = () => {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      ingressName: this.ingressName,
      serviceName: this.serviceName,
      servicePort: this.servicePort,
      serviceProp: this.serviceProp
    });
  }

  
  generateYAML = () =>{
    let template=
    `
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: ${this.ingressName}
      annotations:
        kubernetes.io/ingress.class: "nginx"
        nginx.ingress.kubernetes.io/rewrite-target: /$2
    spec:
      rules:`;
     // template=template+ this.serviceProp!==[] ? this.serviceProp.serviceName : null;
     let i;
     for(i=0;i<this.serviceProp.length;i++){
     template= template+ 
      ` 
       - host: ${this.serviceProp[i].serviceHost}
         http:
             paths:
              - pathType: Prefix
                path: ${this.serviceProp[i].servicePath}
                backend:
                  service:
                    name: ${this.serviceProp[i].serviceName}
                    port:
                      number: ${this.serviceProp[i].servicePort}
                    
                `;
     }
    return template;
        
  }

  getProperties = () =>{

    return {ingressName: this.ingressName, serviceProp: this.serviceProp}; 
  }

  getSomeProperties = () =>{

    return {ingressName: this.ingressName}; 
  }

  getInPort = () => {
    return this.ports.input;
  }

  getOutPort = () => {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    this.ingressName = properties.ingressName;
    //this.serviceName = properties.serviceName;
    //this.servicePort = properties.servicePort;
  }
}
