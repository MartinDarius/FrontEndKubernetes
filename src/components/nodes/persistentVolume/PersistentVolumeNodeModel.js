import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class PersistentVolumeNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("persistentVolume");
    this.addPort(new RJD.DefaultPortModel(false, "output", "CfMap"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.persistentVolumeName = "";
    this.storageClassName="";
    this.storage="";
    this.accessModes="";
    this.path="";
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.persistentVolumeName = object.persistentVolumeName;
    this.storageClassName=object.storageClassName;
    this.storage=object.storage;
    this.accessModes=object.accessModes;
    this.path=object.path;
    this.model = object.model;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      persistentVolumeName: this.persistentVolumeName,
      storageClassName: this.storageClassName,
      storage: this.storage,
      accessModes: this.accessModes,
      path: this.path,
      model: this.model,
    });
  }

  generateYAML() {
    return `
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: ${this.persistentVolumeName}
    spec:
      storageClassName: ${this.storageClassName}
      capacity:
        storage: ${this.storage}
      accessModes:
        - ${this.accessModes}
      hostPath:
        path: ${this.path}`;
  }

  getProperties() {
    return {
      persistentVolumeName: this.persistentVolumeName,
      storageClassName: this.storageClassName,
      storage: this.storage,
      accessModes: this.accessModes,
      path: this.path
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let persistentVolumeNode = this.model.nodes.filter((item) => item.id === this.id)[0];

    persistentVolumeNode.persistentVolumeName = properties.persistentVolumeName;
    persistentVolumeNode.storageClassName = properties.storageClassName;
    persistentVolumeNode.storage = properties.storage;
    persistentVolumeNode.accessModes = properties.accessModes;
    persistentVolumeNode.path = properties.path;
    /*
    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      let confMapId =
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

      let confMapNode = this.model.nodes.filter(
        (item) => item.id === confMapId
      )[0];

      confMapNode.secretName = properties.secretName;
      confMapNode.secretKey = properties.key;
    }
    */
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
