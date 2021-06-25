import React from "react";
//import _ from 'lodash';
import { DropTarget } from "react-dnd";
import * as RJD from "react-js-diagrams";
import { PodNodeModel } from "../nodes/pod/PodNodeModel";
import { DeploymentNodeModel } from "../nodes/deployment/DeploymentNodeModel";
import { ServiceNodeModel } from "../nodes/service/ServiceNodeModel";
import { IngressNodeModel } from "../nodes/ingress/IngressNodeModel";
import { ConfigMapNodeModel } from "../nodes/configMap/ConfigMapNodeModel";
import { SecretNodeModel } from "../nodes/secret/SecretNodeModel";
import { StatefulSetNodeModel } from "../nodes/statefulSet/StatefulSetNodeModel";
import { StorageClassNodeModel } from "../nodes/storageClass/StorageClassNodeModel";
import { PersistentVolumeClaimNodeModel } from "../nodes/persistentVolumeClaim/PersistentVolumeClaimNodeModel";
import { PersistentVolumeNodeModel } from "../nodes/persistentVolume/PersistentVolumeNodeModel";



import { diagramEngine } from "./Engine";

// Setup the diagram model
let diagramModel = new RJD.DiagramModel();

const nodesTarget = {
  drop(props, monitor, component) {
    const { x: pageX, y: pageY } = monitor.getSourceClientOffset();
    const { left = 0, top = 0 } = diagramEngine.canvas.getBoundingClientRect();
    const { offsetX, offsetY } = diagramEngine.diagramModel;
    const x = pageX - left - offsetX;
    const y = pageY - top - offsetY;
    const item = monitor.getItem();

    let node;
    if (item.type === "pod") {
      node = new PodNodeModel("Pod", item.color);
    }
    if (item.type === "deployment") {
      node = new DeploymentNodeModel("Deployment", item.color);
    }
    if (item.type === "service") {
      node = new ServiceNodeModel("Service", item.color);
    }
    if (item.type === "ingress") {
      node = new IngressNodeModel("Ingress", item.color);
    }
    if (item.type === "configMap") {
      node = new ConfigMapNodeModel("ConfigMap", item.color);
    }
    if (item.type === "secret") {
      node = new SecretNodeModel("Secret", item.color);
    }
    if (item.type === "statefulSet") {
      node = new StatefulSetNodeModel("StatefulSet", item.color);
    }
    if (item.type === "storageClass") {
      node = new StorageClassNodeModel("StorageClass", item.color);
    }
    if (item.type === "persistentVolumeClaim") {
      node = new PersistentVolumeClaimNodeModel("PersVolClaim", item.color);
    }
    if (item.type === "persistentVolume") {
      node = new PersistentVolumeNodeModel("PersVol", item.color);
    }


    node.x = x;
    node.y = y;
    diagramModel.addNode(node);
    props.updateModel(diagramModel.serializeDiagram());
  },
};

class Diagram extends React.Component {
  componentDidMount() {
    const { model } = this.props;
    if (model) {
      this.decorateEachNodeWithModel(model);
      this.setModel(model);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.decorateEachNodeWithModel(nextProps.model);
    this.setModel(nextProps.model);
  }

  setModel(model) {
    diagramModel = new RJD.DiagramModel();
    if (model) {
      diagramModel.deSerializeDiagram(model, diagramEngine);
    }
    diagramEngine.setDiagramModel(diagramModel);
  }

  decorateEachNodeWithModel = (model) => {
    if (model) {
      model.nodes.forEach((node) => (node.model = model));
    }
  };

  linkBetweenPodAndDeployment = (model, node1, node2) => {
    let deploymentNode = {};
    let podProps = {};
    let deploymentProps = {};
    let podNode = {};
    let pod = {};
    let depl = {};
    if (node1.nodeType === "pod") {
      pod = node1;
      depl = node2;
    } else {
      pod = node2;
      depl = node1;
    }
    deploymentNode = model.nodes.filter((item) => item.id === depl.id)[0];
    podNode = model.nodes.filter((item) => item.id === pod.id)[0];

    if (depl.podName === "") {
      podProps = pod.getProperties();
      deploymentNode.podName = podProps.podName;
      deploymentNode.image = podProps.image;
      deploymentNode.containerName = podProps.containerName;
      deploymentNode.imagePullPolicy = podProps.imagePullPolicy;
    } else {
      deploymentProps = depl.getProperties();
      podNode.podName = deploymentProps.podName;
      podNode.image = deploymentProps.image;
      podNode.containerName = deploymentProps.containerName;
      podNode.imagePullPolicy = deploymentProps.imagePullPolicy;
    }
    let replicas = deploymentNode.ports[1].links.length;
    deploymentNode.replicas = replicas;
  };

  linkBetweenPodAndStatefulSet = (model, node1, node2) => {
    let statefulSetNode = {};
    let podProps = {};
    let pod = {};
    let stateful = {};

    if (node1.nodeType === "pod") {
      pod = node1;
      stateful = node2;
    } else {
      pod = node2;
      stateful = node1;
    }

    statefulSetNode = model.nodes.filter((item) => item.id === stateful.id)[0];
    podProps = pod.getProperties();
    statefulSetNode.podName = podProps.podName;
    statefulSetNode.image = podProps.image;
    statefulSetNode.containerName = podProps.containerName;
    let replicas = statefulSetNode.ports[1].links.length;
    statefulSetNode.replicas = replicas;
  };

  linkBetweenDeploymentAndService = (model, node1, node2) => {
    let serviceNode = {},
      serv = {},
      depl = {};

    if (node1.nodeType === "service") {
      serv = node1;
      depl = node2;
    } else {
      serv = node2;
      depl = node1;
    }
    serviceNode = model.nodes.filter((item) => item.id === serv.id)[0];
    if (depl.nodeType === "deployment") {
      serviceNode.podName = depl.podName;
      serviceNode.targetPort = depl.containerPort;
    } else {
      serviceNode.podName = depl.podName;
      serviceNode.targetPort = depl.containerPort;
    }
  };

  linkBetweenStatefulSetAndService = (model, node1, node2) => {
    let setNode={}, serv={}, set={};

    if(node1.nodeType === "service"){
      serv = node1;
      set = node2;
    } else {
      serv = node2;
      set = node1;
    }
    setNode = model.nodes.filter((item) => item.id === set.id)[0];
    setNode.serviceName=serv.serviceName;
  }

  linkBetweenServiceAndIngress = (model, node1, node2) => {
    let ingressNode = {},
      serv = {},
      ingr = {};
    if (node1.nodeType === "service") {
      serv = node1;
      ingr = node2;
    } else {
      serv = node2;
      ingr = node1;
    }
    ingressNode = model.nodes.filter((item) => item.id === ingr.id)[0];
    let prop = {
      id: serv.id,
      serviceName: serv.serviceName,
      servicePort: serv.port,
      servicePath: serv.servicePath,
      serviceHost: serv.serviceHost,
    };
    console.log(prop);
    ingressNode.serviceProp.push(prop);
  };

  linkBetweenSecretAndConfigMap = (model, node1, node2) => {
    let configMapNode = {},
      secr = {},
      confMap = {};
    if (node1.nodeType === "secret") {
      secr = node1;
      confMap = node2;
    } else {
      secr = node2;
      confMap = node1;
    }
    configMapNode = model.nodes.filter((item) => item.id === confMap.id)[0];
    let secretProps = secr.getProperties();
    configMapNode.secretName = secretProps.secretName;
    configMapNode.secretKey = secretProps.key;
    configMapNode.secretKey2 = secretProps.key2;
    configMapNode.nameInDeployment= secretProps.nameInDeployment;
    configMapNode.nameInDeployment2= secretProps.nameInDeployment2;
  };

  linkBetweenSecretAndDepl = (model, node1, node2) => {
    let deplNode = {},
      secr = {},
      depl = {};
    if (node1.nodeType === "secret") {
      secr = node1;
      depl = node2;
    } else {
      secr = node2;
      depl = node1;
    }
    deplNode = model.nodes.filter((item) => item.id === depl.id)[0];
    let secretProps = secr.getProperties();
    deplNode.secretName = secretProps.secretName;
    deplNode.secretKey = secretProps.key;
    deplNode.secretKey2 = secretProps.key2;
    deplNode.nameInDeployment= secretProps.nameInDeployment;
    deplNode.nameInDeployment2= secretProps.nameInDeployment2;
  };

  linkBetweenConfigMapAndDepl = (model, node1, node2) => {
    let deplNode = {},
      depl = {},
      confMap = {};
    if (node1.nodeType === "deployment" || node1.nodeType === "statefulSet") {
      depl = node1;
      confMap = node2;
    } else {
      depl = node2;
      confMap = node1;
    }
    deplNode = model.nodes.filter((item) => item.id === depl.id)[0];
    let configMapProps = confMap.getAllProperties();
    deplNode.secretName = configMapProps.secretName;
    deplNode.secretKey = configMapProps.secretKey;
    deplNode.configMapName = configMapProps.configMapName;
    deplNode.configMapKey = configMapProps.configMapKey;
    deplNode.nameInDeployment = configMapProps.nameInDeployment;
    deplNode.nameInDepl = configMapProps.nameInDepl;
    deplNode.secretKey2 = configMapProps.secretKey2;
    deplNode.nameInDeployment2 = configMapProps.nameInDeployment2;



  };

  linkBetweenSCAndPVC = (model, node1, node2) => {
    let PVCNode = {},
      pvc = {},
      sc = {};
    if (node1.nodeType === "storageClass") {
      sc = node1;
      pvc = node2;
    } else {
      sc = node2;
      pvc = node1;
    }
    PVCNode = model.nodes.filter((item) => item.id === pvc.id)[0];
    let SCProps = sc.getProperties();
    PVCNode.storageClassName = SCProps.storageClassName;

  };

  linkBetweenSCAndPV = (model, node1, node2) => {
    let PVNode = {},
      pv = {},
      sc = {};
    if (node1.nodeType === "storageClass") {
      sc = node1;
      pv = node2;
    } else {
      sc = node2;
      pv = node1;
    }
    PVNode = model.nodes.filter((item) => item.id === pv.id)[0];
    let SCProps = sc.getProperties();
    PVNode.storageClassName = SCProps.storageClassName;

  };

  linkBetweenPVCAndDepl = (model, node1, node2) => {
    let deplNode = {},
      pvc = {},
      depl = {};
    if ((node1.nodeType === "deployment") || (node1.type === "statefulSet")) {
      depl = node1;
      pvc = node2;
    } else {
      depl = node2;
      pvc = node1;
    }
    deplNode = model.nodes.filter((item) => item.id === depl.id)[0];
    let PVCProps = pvc.getProperties();
    deplNode.mountPath = PVCProps.mountPath;
    deplNode.volumeName=PVCProps.volumeName;
    deplNode.claimName= PVCProps.persistentVolumeClaimName;

  };

  

  onChange(model, action) {
    console.log("ON DIAGRAM CHANGE");
    console.log(action);

    // Ignore some events
    if (["items-copied"].indexOf(action.type) !== -1) {
      return;
    }

    // Check for single selected items
    if (["node-selected", "node-moved"].indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    // Check for canvas events
    const deselectEvts = [
      "canvas-click",
      "canvas-drag",
      "items-selected",
      "items-drag-selected",
      "items-moved",
    ];
    if (deselectEvts.indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: null });
    }

    // Check if this is a deselection and a single node exists
    const isDeselect =
      ["node-deselected", "link-deselected"].indexOf(action.type) !== -1;
    if (isDeselect && action.items.length < 1 && action.model.nodeType) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    if (["link-connected"].indexOf(action.type) !== -1) {
      let node1 = action.linkModel.sourcePort.parentNode;
      let node2 = action.linkModel.targetPort.parentNode;

      if (
        (node1.nodeType === "pod" && node2.nodeType === "deployment") ||
        (node1.nodeType === "deployment" && node2.nodeType === "pod")
      ) {
        this.linkBetweenPodAndDeployment(model, node1, node2);
      } else if (
        (node1.nodeType === "service" && node2.nodeType === "deployment") ||
        (node1.nodeType === "deployment" && node2.nodeType === "service")
      ) {
        this.linkBetweenDeploymentAndService(model, node1, node2);
      } else if (
        (node1.nodeType === "service" && node2.nodeType === "statefulSet") ||
        (node1.nodeType === "statefulSet" && node2.nodeType === "service")
      ) {
        this.linkBetweenDeploymentAndService(model, node1, node2);
        this.linkBetweenStatefulSetAndService(model,node1,node2);
      } else if (
        (node1.nodeType === "pod" && node2.nodeType === "statefulSet") ||
        (node1.nodeType === "statefulSet" && node2.nodeType === "pod")
      ) {
        this.linkBetweenPodAndStatefulSet(model, node1, node2);
      } else if (
        (node1.nodeType === "service" && node2.nodeType === "ingress") ||
        (node1.nodeType === "ingress" && node2.nodeType === "service")
      ) {
        this.linkBetweenServiceAndIngress(model, node1, node2);
      } else if (
        (node1.nodeType === "secret" && node2.nodeType === "configMap") ||
        (node1.nodeType === "configMap" && node2.nodeType === "secret")
      ) {
        this.linkBetweenSecretAndConfigMap(model, node1, node2);
      } else if (
        (node1.nodeType === "deployment" && node2.nodeType === "configMap") ||
        (node1.nodeType === "configMap" && node2.nodeType === "deployment")
      ) {
        this.linkBetweenConfigMapAndDepl(model, node1, node2);
      }else if (
        (node1.nodeType === "statefulSet" && node2.nodeType === "configMap") ||
        (node1.nodeType === "configMap" && node2.nodeType === "statefulSet")
      ) {
        this.linkBetweenConfigMapAndDepl(model, node1, node2);
      }  else if (
        (node1.nodeType === "storageClass" && node2.nodeType === "persistentVolumeClaim") ||
        (node1.nodeType === "persistentVolumeClaim" && node2.nodeType === "storageClass")
      ) {
        this.linkBetweenSCAndPVC(model, node1, node2);
      } else if (
        (node1.nodeType === "deployment" && node2.nodeType === "persistentVolumeClaim") ||
        (node1.nodeType === "persistentVolumeClaim" && node2.nodeType === "deployment")
      ) {
        this.linkBetweenPVCAndDepl(model, node1, node2);
      } else if (
        (node1.nodeType === "statefulSet" && node2.nodeType === "persistentVolumeClaim") ||
        (node1.nodeType === "persistentVolumeClaim" && node2.nodeType === "statefulSet")
      ) {
        this.linkBetweenPVCAndDepl(model, node1, node2);
      } else if (
        (node1.nodeType === "storageClass" && node2.nodeType === "persistentVolume") ||
        (node1.nodeType === "persistentVolume" && node2.nodeType === "storageClass")
      ) {
        this.linkBetweenSCAndPV(model, node1, node2);
      } else if (
        (node1.nodeType === "secret" && node2.nodeType === "deployment") ||
        (node1.nodeType === "deployment" && node2.nodeType === "secret")
      ) {
        this.linkBetweenSecretAndDepl(model, node1, node2);
      } else if (
        (node1.nodeType === "secret" && node2.nodeType === "statefulSet") ||
        (node1.nodeType === "statefulSet" && node2.nodeType === "secret")
      ) {
        this.linkBetweenSecretAndDepl(model, node1, node2);
      } 
      
    }
    
    this.props.updateModel(model);
  }

  render() {
    const { connectDropTarget } = this.props;

    // Render the canvas
    return connectDropTarget(
      <div className="diagram-drop-container">
        <RJD.DiagramWidget
          diagramEngine={diagramEngine}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default DropTarget("node-source", nodesTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Diagram);
