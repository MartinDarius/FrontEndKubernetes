import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class DeploymentNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("deployment");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Serv"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.deploymentName = "";
    this.podName = "";
    this.containerName = "";
    this.containerPort = "";
    this.image = "";
    this.memory = "";
    this.cpu = "";
    this.imagePullPolicy = "";
    this.replicas = 0;
    this.model = {};
    this.secretName = "";
    this.secretKey = "";
    this.configMapName = "";
    this.configMapKey = "";
    this.mountPath = "";
    this.volumeName = "";
    this.claimName = "";
  }

  deSerialize = (object) => {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.podName = object.podName;
    this.image = object.image;
    this.containerName = object.containerName;
    this.deploymentName = object.deploymentName;
    this.containerPort = object.containerPort;
    this.replicas = object.replicas;
    this.memory = object.memory;
    this.cpu = object.cpu;
    this.imagePullPolicy = object.imagePullPolicy;
    this.model = object.model;
    this.configMapName = object.configMapName;
    this.configMapKey = object.configMapKey;
    this.secretName = object.secretName;
    this.secretKey = object.secretKey;
    this.mountPath = object.mountPath;
    this.volumeName = object.volumeName;
    this.claimName = object.claimName;
  };

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
      model: this.model,
      secretName: this.secretName,
      secretKey: this.secretKey,
      configMapName: this.configMapName,
      configMapKey: this.configMapKey,
      mountPath: this.mountPath,
      volumeName: this.volumeName,
      claimName: this.claimName,
    });
  };

  generateYAML = () => {
    let template = `apiVersion: apps/v1
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
                - name: Trebuie sa il intreb pe domnul Zoltan
                  valueFrom:
                    configMapKeyRef:
                      name: ${this.configMapName}
                      key: ${this.configMapKey}`;
    }
    if (this.secretName !== "") {
      template =
        template +
        `  
                - name: Trebuie sa il intreb pe domnul Zoltan
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
  };

  getProperties = () => {
    return {
      deploymentName: this.deploymentName,
      podName: this.podName,
      containerName: this.containerName,
      image: this.image,
      containerPort: this.containerPort,
      replicas: this.replicas,
      imagePullPolicy: this.imagePullPolicy,
    };
  };

  getSomeProperties = () => {
    return {
      deploymentName: this.deploymentName,
      containerPort: this.containerPort,
      memory: this.memory,
      cpu: this.cpu,
    };
  };

  getInPort = () => {
    return this.ports.input;
  };

  getOutPort = () => {
    return this.ports.output;
  };

  onSubmit = (properties) => {
    let deploymentNode = this.model.nodes.filter(
      (item) => item.id === this.id
    )[0];

    deploymentNode.deploymentName = properties.deploymentName;
    deploymentNode.containerPort = properties.containerPort;
    deploymentNode.memory = properties.memory;
    deploymentNode.cpu = properties.cpu;
    deploymentNode.name=properties.deploymentName;

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

      serviceNode.deploymentName = properties.deploymentName;
      serviceNode.targetPort = properties.containerPort;
    }
    //globalConst.updateModel(this.model, {selectedNode: null});
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
