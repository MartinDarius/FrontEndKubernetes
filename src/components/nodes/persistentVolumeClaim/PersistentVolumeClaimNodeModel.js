import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class PersistentVolumeClaimNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("persistentVolumeClaim");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Depl"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.persistentVolumeClaimName="";
    this.storage="";
    this.storageClassName="";

  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.model=object.model;
    this.persistentVolumeClaimName=object.persistentVolumeClaimName;
    this.storage=object.storage;
    this.storageClassName=object.storageClassName;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      model: this.model,
      persistentVolumeClaimName: this.persistentVolumeClaimName,
      storage: this.storage,
      storageClassName: this.storageClassName
    });
  }

  generateYAML() {
    return `apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: ${this.persistentVolumeClaimName}
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: ${this.storage}
      storageClassName: ${this.storageClassName}

 `;
  }

  getProperties() {
    return {
      persistentVolumeClaimName: this.persistentVolumeClaimName,
      storage: this.storage,
      storageClassName: this.storageClassName
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let persistentVolumeClaimNode = this.model.nodes.filter((item) => item.id === this.id)[0];
    persistentVolumeClaimNode.persistentVolumeClaimName=properties.persistentVolumeClaimName;
    persistentVolumeClaimNode.storage=properties.storage;
    persistentVolumeClaimNode.storageClassName=properties.storageClassName;
/*

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
    }*/
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    ); 
  };
 
}
