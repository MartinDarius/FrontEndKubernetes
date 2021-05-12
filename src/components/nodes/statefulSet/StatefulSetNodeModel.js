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
    this.volumeMountsName = "";
    this.mountPath = "";
    this.accessModes = "";
    this.storageClassName = "";
    this.storage = "";
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
    this.volumeMountsName = object.volumeMountsName;
    this.mountPath = object.mountPath;
    this.accessModes = object.accessModes;
    this.storageClassName = object.storageClassName;
    this.storage = object.storage;
    this.model = object.model;
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
      volumeMountsName: this.volumeMountsName,
      mountPath: this.mountPath,
      accessModes: this.accessModes,
      storageClassName: this.storageClassName,
      storage: this.storage,
      model: this.model,
    });
  }

  generateYAML() {
    return `apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: ${this.statefulSetName}
    spec:
      selector:
        matchLabels:
          app: ${this.podName} 
      serviceName: ${this.serviceName}
      replicas: ${this.replicas}
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
            - containerPort: ${this.containerPort}
              name: ${this.portName}
            volumeMounts:
            - name: ${this.volumeMountsName}
              mountPath: ${this.mountPath}
      volumeClaimTemplates:
      - metadata:
          name: ${this.volumeMountsName}
        spec:
          accessModes: [ "${this.accessModes}" ]
          storageClassName: "${this.storageClassName}"
          resources:
            requests:
              storage: ${this.storage}`;
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
      volumeMountsName: this.volumeMountsName,
      mountPath: this.mountPath,
      accessModes: this.accessModes,
      storageClassName: this.storageClassName,
      storage: this.storage,
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
    statefulSetNode.podName = properties.podName;
    statefulSetNode.serviceName = properties.serviceName;
    statefulSetNode.seconds = properties.seconds;
    statefulSetNode.containerPort = properties.containerPort;
    statefulSetNode.volumeMountsName = properties.volumeMountsName;
    statefulSetNode.mountPath = properties.mountPath;
    statefulSetNode.accessModes = properties.accessModes;
    statefulSetNode.storageClassName = properties.storageClassName;
    statefulSetNode.storage = properties.storage;

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

      let serviceId;
      if (serviceId1 === this.id) {
        serviceId = serviceId2;
      } else {
        serviceId = serviceId1;
      }

      let serviceNode = this.model.nodes.filter(
        (item) => item.id === serviceId
      )[0];

      serviceNode.deploymentName = properties.statefulSetName;
      serviceNode.targetPort = properties.containerPort;
    }

    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
