import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    paddingBottom: 20,
  },
  bold: {
    fontWeight: 700,
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
    gridTemplateRows: "1fr",
    gridGap: "15px",
  },
  button: {
    width: "300px",
  },
});

export default function MyConfigurations() {
  const classes = useStyles();

  const [backendData, setBackendData] = React.useState([
    {
      id: "1",
      name: "First Config",
      nodes: [
        {
          id: "10",
          template: `apiVersion: storage.k8s.io/v1 
                          kind: StorageClass 
                          metadata:
                            name: StorageClass1
                          provisioner: provisioner
                          parameters:
                            storageAccount: storageAccount1
                          reclaimPolicy: reclaimPolicy
                          allowVolumeExpansion: allowVolume
                         `,
        },
        {
          id: "11",
          template: `apiVersion: v1
                          kind: Secret
                          metadata:
                            name: secretName
                          data: 
                            key: value`,
        },
      ],
    },
    {
      id: "2",
      name: "Second Config",
      nodes: [
        {
          id: "20",
          template: `apiVersion: storage.k8s.io/v1 
                            kind: StorageClass 
                            metadata:
                              name: StorageClass1
                            provisioner: provisioner
                            parameters:
                              storageAccount: storageAccount1
                            reclaimPolicy: reclaimPolicy
                            allowVolumeExpansion: allowVolume
                           `,
        },
        {
          id: "21",
          template: `apiVersion: v1
                            kind: Secret
                            metadata:
                              name: secretName
                            data: 
                              key: value`,
        },
      ],
    },
    {
      id: "3",
      name: "Third Config",
      nodes: [
        {
          id: "30",
          template: `apiVersion: storage.k8s.io/v1 
                          kind: StorageClass 
                          metadata:
                            name: StorageClass1
                          provisioner: provisioner
                          parameters:
                            storageAccount: storageAccount1
                          reclaimPolicy: reclaimPolicy
                          allowVolumeExpansion: allowVolume
                         `,
        },
        {
          id: "31",
          template: `apiVersion: v1
                          kind: Secret
                          metadata:
                            name: secretName
                          data: 
                            key: value`,
        },
      ],
    },
    {
      id: "4",
      name: "Forth Config",
      nodes: [
        {
          id: "40",
          template: `
          apiVersion: storage.k8s.io/v1 
          kind: StorageClass 
          metadata:
            name: StorageClass1
          provisioner: provisioner
          parameters:
            storageAccount: storageAccount1
          reclaimPolicy: reclaimPolicy
          allowVolumeExpansion: allowVolume
          `,
        },
        {
          id: "41",
          template: `  
          apiVersion: v1
          kind: Secret
          metadata:
            name: secretName
          data: 
            key: value`,
        },
      ],
    },
  ]);

  const [nodes, setNodes] = React.useState([]);

  const handleNodes = (nodes) => {
    console.log(nodes);
    setNodes(nodes);
  };

  const allConfig = (
    <div>
      <div className={classes.title}>My configurations:</div>
      <div className={classes.twoColumns}>
        {backendData.map((model) => {
          const nrNodes = model.nodes.length;
          return (
            <Card key={model.id} className={classes.rootCard}>
              <CardContent className={classes.cardColor}>
                <Typography
                  className={classes.bold}
                  color="textPrimary"
                  gutterBottom
                >
                  {model.name}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textPrimary"
                  gutterBottom
                >
                  ID:{model.id}
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
                  onClick={handleNodes.bind(this, model.nodes)}
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
    nodes.map((node) => {
      const element = document.createElement("a");
      const file = new Blob([node.template], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "TemplateWithId"+node.id+".yaml";
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
                      className={classes.subTitle}
                      color="textPrimary"
                      gutterBottom
                    >
                      ID: {node.id}
                    </Typography>
                    {node.template.split("\n").map((str) => (
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
