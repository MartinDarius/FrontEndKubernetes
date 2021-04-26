import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class SecretNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("secret");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Depl"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.secretName=" ";
    this.data="";
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.secretName= object.secretName;
    this.data= object.data;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      secretName: this.secretName,
      data: this.data
    });
  }

  generateYAML() {
    return `apiVersion: v1
    kind: Secret
    metadata:
      name:${this.secretName}
    data: ${this.data} `;
  }

  getProperties() {
    return {
      secretName: this.secretName,
      data: this.data
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let secretNode = this.model.nodes.filter((item) => item.id === this.id)[0];
    secretNode.secretName=properties.secretName;
    secretNode.data=properties.data;
/*
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
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    ); */
  };
 
}
