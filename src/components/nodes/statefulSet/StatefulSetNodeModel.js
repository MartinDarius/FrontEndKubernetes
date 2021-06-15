import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class StatefulSetNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("statefulSet");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Serv"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "Pod"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.statefulSetName = " ";
    this.podName = "";
    this.containerName = "";
    this.portName = "";
    this.serviceName = "";
    this.replicas = 0;
    this.seconds = 0;
    this.image = "";
    this.containerPort = "";
    this.volumeName = "";
    this.mountPath = "";
    this.accessModes = "";
    this.storageClassName = "";
    this.storage = "";
    this.secretName = "";
    this.secretKey = "";
    this.configMapName = "";
    this.configMapKey = "";
    this.claimName = "";
    this.nameInDeployment = "";
    this.nameInDepl = "";
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.statefulSetName = object.statefulSetName;
    this.podName = object.podName;
    this.containerName = object.containerName;
    this.portName = object.portName;
    this.serviceName = object.serviceName;
    this.replicas = object.replicas;
    this.seconds = object.seconds;
    this.image = object.image;
    this.containerPort = object.containerPort;
    this.volumeName = object.volumeName;
    this.mountPath = object.mountPath;
    this.accessModes = object.accessModes;
    this.storageClassName = object.storageClassName;
    this.storage = object.storage;
    this.model = object.model;
    this.secretName = object.secretName;
    this.secretKey = object.secretKey;
    this.configMapName = object.configMapName;
    this.configMapKey = object.configMapKey;
    this.claimName = object.claimName;
    this.nameInDeployment= object.nameInDeployment;
    this.nameInDepl = object.nameInDepl;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      statefulSetName: this.statefulSetName,
      podName: this.podName,
      containerName: this.containerName,
      portName: this.portName,
      serviceName: this.serviceName,
      replicas: this.replicas,
      seconds: this.seconds,
      image: this.image,
      containerPort: this.containerPort,
      volumeName: this.volumeName,
      mountPath: this.mountPath,
      accessModes: this.accessModes,
      storageClassName: this.storageClassName,
      storage: this.storage,
      model: this.model,
      secretName: this.secretName,
      secretKey: this.secretKey,
      configMapName: this.configMapName,
      configMapKey: this.configMapKey,
      claimName: this.claimName,
      nameInDeployment: this.nameInDeployment,
      nameInDepl: this.nameInDepl
    });
  }

  generateYAML() {
    let template= `
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: ${this.statefulSetName}
    spec:
      selector:
        matchLabels:
          app: ${this.podName} 
      replicas: ${this.replicas}
      serviceName: ${this.serviceName}
      template:
        metadata:
          labels:
            app: ${this.podName}
        spec:
          terminationGracePeriodSeconds: ${this.seconds}
          containers:
          - name: ${this.containerName}
            image: ${this.image}
            ports:
            - containerPort: ${this.containerPort}`;

    if (this.claimName !== "") {
      template =
        template +
        `
            volumeMounts:
              - name: ${this.volumeName}
                mountPath: ${this.mountPath}`;
    }

    if (this.configMapName !== "") {
      template =
        template +
        `   
            env:
              - name: ${this.nameInDepl}
                valueFrom:
                  configMapKeyRef:
                    name: ${this.configMapName}
                    key: ${this.configMapKey}`;
    }
    if (this.secretName !== "") {
      template =
        template +
        `  
              - name: ${this.nameInDeployment}
                valueFrom:
                  secretKeyRef:
                    name: ${this.secretName}
                    key: ${this.secretKey}`;
    }

    if (this.claimName !== "") {
      template =
        template +
        `    
          volumes:
            - name: ${this.volumeName}
              persistentVolumeClaim:
                claimName: ${this.claimName}
      `;
    }

    return template;
  }

  getProperties() {
    return {
      statefulSetName: this.statefulSetName,
      podName: this.podName,
      serviceName: this.serviceName,
      replicas: this.replicas,
      seconds: this.seconds,
      image: this.image,
      containerPort: this.containerPort,
      portName: this.portName,
      volumeName: this.volumeName,
      mountPath: this.mountPath,
      accessModes: this.accessModes,
      storageClassName: this.storageClassName,
      storage: this.storage,
    };
  }

  getSomeProperties() {
    return {
      statefulSetName: this.statefulSetName,
      seconds: this.seconds,
      containerPort: this.containerPort,
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let statefulSetNode = this.model.nodes.filter(
      (item) => item.id === this.id
    )[0];

    statefulSetNode.statefulSetName = properties.statefulSetName;
    statefulSetNode.seconds = properties.seconds;
    statefulSetNode.containerPort = properties.containerPort;

    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      let serviceId1 = this.getOutPort()
        .getLinks()
        [Object.keys(this.getOutPort().getLinks())[0]].getTargetPort()
        .getParent()
        .getID();
      let serviceId2 = this.getOutPort()
        .getLinks()
        [Object.keys(this.getOutPort().getLinks())[0]].getSourcePort()
        .getParent()
        .getID();

      let serviceId,setId;
      if (serviceId1 === this.id) {
        serviceId = serviceId2;
        setId= serviceId1;
      } else {
        serviceId = serviceId1;
        setId= serviceId2;
      }

      let serviceNode = this.model.nodes.filter(
        (item) => item.id === serviceId
      )[0];
      let setNode = this.model.nodes.filter(
        (item) => item.id === setId
      )[0];
  
      serviceNode.podName = setNode.podName;
      serviceNode.targetPort = properties.containerPort;
    }

    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
