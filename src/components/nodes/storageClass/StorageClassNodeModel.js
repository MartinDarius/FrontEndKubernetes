import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class StorageClassNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("storageClass");
    this.addPort(new RJD.DefaultPortModel(false, "output", "PVC"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.storageClassName="";
    this.provisioner="";
    this.storageAccount="";
    this.reclaimPolicy="";
    this.allowVolExp="";

  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.model=object.model;
    this.storageClassName=object.storageClassName;
    this.provisioner=object.provisioner;
    this.storageAccount=object.storageAccount;
    this.reclaimPolicy=object.reclaimPolicy;
    this.allowVolExp=object.allowVolExp;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      model: this.model,
      storageClassName: this.storageClassName,
      provisioner: this.provisioner,
      storageAccount: this.storageAccount,
      reclaimPolicy: this.reclaimPolicy,
      allowVolExp: this.allowVolExp
    });
  }

  generateYAML() {
    return `apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata:
    name: ${this.storageClassName}
  provisioner: ${this.provisioner}
  parameters:
    storageAccount: ${this.storageAccount}
  reclaimPolicy: ${this.reclaimPolicy}
  allowVolumeExpansion: ${this.allowVolExp}
 `;
  }

  getProperties() {
    return {
      storageClassName: this.storageClassName,
      provisioner: this.provisioner,
      storageAccount: this.storageAccount,
      reclaimPolicy: this.reclaimPolicy,
      allowVolExp: this.allowVolExp
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let storageClassNode = this.model.nodes.filter((item) => item.id === this.id)[0];
    storageClassNode.storageClassName=properties.storageClassName;
    storageClassNode.provisioner=properties.provisioner;
    storageClassNode.storageAccount=properties.storageAccount;
    storageClassNode.reclaimPolicy=properties.reclaimPolicy;
    storageClassNode.allowVolExp=properties.allowVolExp;


    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      for(let i=0; i<Object.keys(this.getOutPort().links).length;i++){
      let persVolClaimId =
        this.getOutPort()
          .getLinks()
          [Object.keys(this.getOutPort().getLinks())[i]].getTargetPort()
          .getParent()
          .getID() === this.id
          ? this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[i]].getSourcePort()
              .getParent()
              .getID()
          : this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[i]].getTargetPort()
              .getParent()
              .getID();

      let persVolClaimNode = this.model.nodes.filter(
        (item) => item.id === persVolClaimId
      )[0];

      persVolClaimNode.storageClassName = properties.storageClassName;
      }
    }
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    ); 
  };
 
}
