import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class PodNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("pod");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Depl"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.podName = "";
    this.image = "";
    this.containerName = "";
    this.imagePullPolicy = "";
    this.command = "";
    this.secretName="";
    this.secretKey="";
    this.configMapName="";
    this.configMapKey="";
    this.model = {};
  }

  deSerialize(object) {
    super.deSerialize(object);
    console.log("2");

    this.name = object.name;
    this.color = object.color;
    this.podName = object.podName;
    this.image = object.image;
    this.containerName = object.containerName;
    this.imagePullPolicy = object.imagePullPolicy;
    this.command = object.command;
    this.configMapName=object.configMapName;
    this.configMapKey=object.configMapKey;
    this.secretName=object.secretName;
    this.secretKey=object.secretKey;
    this.model = object.model;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      podName: this.podName,
      image: this.image,
      containerName: this.containerName,
      imagePullPolicy: this.imagePullPolicy,
      command: this.command,
      secretName: this.secretName,
      secretKey: this.secretKey,
      configMapName: this.configMapName,
      configMapKey: this.configMapKey,
      model: this.model,
    });
  }

  generateYAML() {
    let template= `apiVersion: v1
    kind: Pod
    metadata:
      name:${this.podName}
    spec:
      containers:
        - image: ${this.image}
          name: ${this.containerName}
          command: ${this.command}
          imagePullPolicy: ${this.imagePullPolicy}
          env: `;

      if(this.configMapName !==""){
        template=template+ 
        `  
          - name: Trebuie sa il intreb pe domnul Zoltan
            valueFrom:
              configMapKeyRef:
                name: ${this.configMapName}
                key: ${this.configMapKey}
        `
      }
      if(this.secretName !==""){
        template=template+ 
        `  
          - name: Trebuie sa il intreb pe domnul Zoltan
            valueFrom:
             secretKeyRef:
                name: ${this.secretName}
                key: ${this.secretKey}
        `
      }
      return template;
  }

  getProperties() {
    return {
      podName: this.podName,
      image: this.image,
      containerName: this.containerName,
      imagePullPolicy: this.imagePullPolicy,
      command: this.command,
      secretName: this.secretName,
      secretKey: this.secretKey,
      configMapName: this.configMapName,
      configMapKey: this.configMapKey
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let podNode = this.model.nodes.filter((item) => item.id === this.id)[0];

    podNode.podName = properties.podName;
    podNode.image = properties.image;
    podNode.containerName = properties.containerName;
    podNode.imagePullPolicy = properties.imagePullPolicy;
    podNode.command = properties.command;

    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      let deploymentId =
        this.getOutPort()
          .getLinks()
          [Object.keys(this.getOutPort().getLinks())[0]].getTargetPort()
          .getParent()
          .getID() === this.id
          ? this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[0]].getSourcePort()
              .getParent()
              .getID()
          : this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[0]].getTargetPort()
              .getParent()
              .getID();

      let deploymentNode = this.model.nodes.filter(
        (item) => item.id === deploymentId
      )[0];
      deploymentNode.podName = properties.podName;
      deploymentNode.image = properties.image;
      deploymentNode.containerName = properties.containerName;
      deploymentNode.imagePullPolicy = properties.imagePullPolicy;

      if (deploymentNode.name === "Deployment") {
        let links = deploymentNode.ports[1].links;
        let allLinks = this.model.links;
        console.log(allLinks);

        let podNode;
        for (let i = 0; i < links.length; i++) {
          for (let j = 0; j < allLinks.length; j++) {
            if (links[i] === allLinks[j].id) {
              podNode = this.model.nodes.filter(
                (item) => item.id === allLinks[j].source
              )[0];
              podNode.podName = properties.podName;
              podNode.image = properties.image;
              podNode.containerName = properties.containerName;
              podNode.imagePullPolicy = properties.imagePullPolicy;
              podNode.command = properties.command;
            }
          }
        }
      }
    }
    //globalConst.updateModel(this.model, {selectedNode: null});
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
