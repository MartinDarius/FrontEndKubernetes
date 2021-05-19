import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class PersistentVolumeClaimNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("persistentVolumeClaim");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Depl"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "SC"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.persistentVolumeClaimName = "";
    this.storage = "";
    this.storageClassName = "";
    this.accessModes = "";
    this.volumeName = "";
    this.mountPath = "";
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.model = object.model;
    this.persistentVolumeClaimName = object.persistentVolumeClaimName;
    this.storage = object.storage;
    this.storageClassName = object.storageClassName;
    this.accessModes = object.accessModes;
    this.volumeName = object.volumeName;
    this.mountPath = object.mountPath;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      model: this.model,
      persistentVolumeClaimName: this.persistentVolumeClaimName,
      storage: this.storage,
      storageClassName: this.storageClassName,
      accessModes: this.accessModes,
      volumeName: this.volumeName,
      mountPath: this.mountPath,
    });
  }

  generateYAML() {
    return `apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: ${this.persistentVolumeClaimName}
    spec:
      accessModes:
        - ${this.accessModes}
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
      storageClassName: this.storageClassName,
      accessModes: this.accessModes,
      volumeName: this.volumeName,
      mountPath: this.mountPath,
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let persistentVolumeClaimNode = this.model.nodes.filter(
      (item) => item.id === this.id
    )[0];
    persistentVolumeClaimNode.persistentVolumeClaimName =
      properties.persistentVolumeClaimName;
    persistentVolumeClaimNode.storage = properties.storage;
    persistentVolumeClaimNode.storageClassName = properties.storageClassName;
    persistentVolumeClaimNode.accessModes = properties.accessModes;

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
      deploymentNode.mountPath = properties.mountPath;
      deploymentNode.volumeName = properties.volumeName;
      deploymentNode.claimName = properties.persistentVolumeClaimName;
    }
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
