import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { store } from "../components/store/store";
import { updateModel } from "../components/store/actions/diagram";
import history from "../history/history";

const useStyles = makeStyles({
  background: {
    backgroundColor: "#DCE1E3",
    height: "100%",
  },
  root: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0.75fr))",
    paddingTop: "20px",
    backgroundColor: "#DCE1E3",
    //height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    paddingBottom: 20,
  },
  bold: {
    fontWeight: 700,
    paddingBottom: '10px'
  },
  rootCard: {
    minWidth: 275,
    maxWidth: 400,
    marginBottom: "12px",
    backGroundColor: "#FF00FF",
  },
  subTitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  twoColumns: {
    display: "grid",
    gridTemplateColumns: "0.33fr 0.33fr 0.33fr",
  },
  cardColor: {
    backgroundColor: "#F0F0F0",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0.35fr))",
    gridGap: "15px",
    marginBottom: '30px',
  },
  button: {
    width: "300px",
  },
});

export default function MyConfigurations() {
  const classes = useStyles();

  const [backendData, setBackendData] = React.useState([
    {
      name: "config2",
      config: {
        id: "487687f7-fcb3-49e8-a919-115e2ea3d953",
        offsetX: -1,
        offsetY: 0,
        zoom: 100,
        links: [],
        nodes: [
          {
            id: "6e3fe6b8-6795-4dfe-a7fa-c7abff7e13a9",
            _class: "DeploymentNodeModel",
            selected: false,
            type: "deployment",
            x: 365.0198917388916,
            y: 227.24431228637695,
            extras: {},
            ports: [
              {
                id: "48b7aba9-725e-4dd8-afd2-ac32b94776dc",
                _class: "DefaultPortModel",
                selected: false,
                name: "output",
                parentNode: "6e3fe6b8-6795-4dfe-a7fa-c7abff7e13a9",
                links: [],
                in: false,
                label: "Serv",
              },
              {
                id: "39d7d724-d627-42f7-8abd-5877cb681fc8",
                _class: "DefaultPortModel",
                selected: false,
                name: "input",
                parentNode: "6e3fe6b8-6795-4dfe-a7fa-c7abff7e13a9",
                links: [],
                in: true,
                label: "In",
              },
            ],
            name: "Deployment",
            color: "rgb(157, 13, 193)",
            temp: "apiVersion: apps/v1\n    kind: Deployment\n    metadata:\n      name: \n    spec:\n      replicas: 0\n      selector:\n        matchLabels:\n          app: \n      template:\n        metadata:\n          labels:\n            app: \n        spec:\n          containers:\n            - name: \n              image: \n              resources:\n                limits:\n                  memory: \n                  cpu: \n              imagePullPolicy: \n              ports:\n              - containerPort: ",
            deploymentName: "",
            podName: "",
            containerName: "",
            containerPort: "",
            image: "",
            replicas: 0,
            memory: "",
            cpu: "",
            imagePullPolicy: "",
            model: { $ref: "$" },
            secretName: "",
            secretKey: "",
            configMapName: "",
            configMapKey: "",
            mountPath: "",
            volumeName: "",
            claimName: "",
          },
          {
            id: "d1ed3292-b881-4833-964d-f8eb22b16e2d",
            _class: "IngressNodeModel",
            selected: false,
            type: "ingress",
            x: 601.0198917388916,
            y: 102.74431228637695,
            extras: {},
            ports: [
              {
                id: "77b389b2-31ad-4624-873f-a62ab7272605",
                _class: "DefaultPortModel",
                selected: false,
                name: "output",
                parentNode: "d1ed3292-b881-4833-964d-f8eb22b16e2d",
                links: [],
                in: false,
                label: "Out",
              },
              {
                id: "814bdeb7-5690-490c-8547-88848c0b18a6",
                _class: "DefaultPortModel",
                selected: false,
                name: "input",
                parentNode: "d1ed3292-b881-4833-964d-f8eb22b16e2d",
                links: [],
                in: true,
                label: "Serv",
              },
            ],
            name: "Ingress",
            color: "rgb(50, 100, 180)",
            temp: 'apiVersion: extensions/v1beta1\n    kind: Ingress\n    metadata:\n      name: \n      annotations:\n        kubernetes.io/ingress.class: "nginx"\n        nginx.ingress.kubernetes.io/rewrite-target: /$2\n    spec:\n      rules:',
            ingressName: "",
            serviceName: "",
            servicePort: "",
            serviceProp: [],
            model: { $ref: "$" },
          },
        ],
      },
    },
  ]);

  const [configuration, setConfiguration] = React.useState({});

  const [nodes, setNodes] = React.useState([]);

  const handleNodes = (config) => {
    setConfiguration(config);
    setNodes(config.nodes);
  };

  const handleImport = () => {
    const json = JSON.stringify(configuration);
    const model = JSON.retrocycle(JSON.parse(json));
    store.dispatch(
      updateModel(Object.assign({}, model), { selectedNode: null })
    );
    history.push("/");
  };

  const allConfig = (
    <div>
      <div className={classes.title}>My configurations:</div>
      <div className={classes.twoColumns}>
        {backendData.map((model) => {
          const nrNodes = model.config.nodes.length;
          return (
            <Card key={model.id} className={classes.rootCard}>
              <CardContent className={classes.cardColor}>
                <Typography
                  className={classes.bold}
                  color="textPrimary"
                  gutterBottom
                >
                  Name: {model.name}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textPrimary"
                  gutterBottom
                >
                  ID:{model.config.id}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textPrimary"
                  gutterBottom
                >
                  This configuration has {nrNodes} nodes.
                </Typography>
              </CardContent>
              <CardActions className={classes.cardColor}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleNodes.bind(this, model.config)}
                >
                  View Nodes
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const downloadTemplates = () => {
    console.log(nodes);
    nodes.map((node) => {
      const element = document.createElement("a");
      const file = new Blob([node.temp], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = node.name + ".yaml";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  };

  const templates = (
    <div>
      <div className={classes.title}>Templates:</div>
      <div className={classes.twoColumns}>
        {nodes.length !== 0
          ? nodes.map((node) => {
              return (
                <Card key={node.id} className={classes.rootCard}>
                  <CardContent>
                    <Typography
                      className={classes.bold}
                      color="textPrimary"
                      gutterBottom
                    >
                      Name: {node.name}
                    </Typography>
                    <Typography
                      className={classes.subTitle}
                      color="textPrimary"
                      gutterBottom
                    >
                      ID: {node.id}
                    </Typography>
                    Template:
                    {node.temp.split("\n").map((str) => (
                      <Typography
                        key={str}
                        className={classes.subTitle}
                        color="textPrimary"
                        gutterBottom
                      >
                        {str}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              );
            })
          : null}
      </div>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleNodes.bind(this, [])}
        >
          View All Configurations
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={downloadTemplates}
        >
          Download templates
        </Button>

        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleImport}
        >
          Import configuration
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.background}>
      <div className={classes.root}>
        {nodes.length === 0 ? allConfig : templates}
      </div>
    </div>
  );
}
