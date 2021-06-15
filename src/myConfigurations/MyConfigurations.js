import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { store } from "../components/store/store";
import { updateModel } from "../components/store/actions/diagram";
import history from "../history/history";
import { getCookie } from "../cookieHandler";

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
    paddingBottom: "10px",
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
    marginBottom: "30px",
  },
  button: {
    width: "300px",
  },
});

export default function MyConfigurations() {
  const classes = useStyles();

  const axios = require("axios");

  const [backendData, setBackendData] = React.useState([]);

  const [trigger, setTrigger] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  useEffect(() => {
    let token = {
      headers: {
        Authorization: "Bearer " + getCookie("userSession"),
      },
    };

    axios
      .get("http://127.0.0.1:5000/api/configurations", token)
      .then(function (response) {
        // handle success
        let allConfig = [];
        response.data.map((item) => {
          let model = JSON.retrocycle(JSON.parse(item.model));
          let name = item.name;
          const config = { id: item._id.$oid, name: name, config: model };
          allConfig.push(config);
        });
        console.log(allConfig);
        setBackendData(allConfig);
        console.log(backendData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [trigger]);

  const [configuration, setConfiguration] = React.useState({});

  const [nodes, setNodes] = React.useState([]);

  const handleNodes = (model) => {
    setConfiguration(model);
    setNodes(model.config.nodes);
  };

  const goToAllConfig = (nodes) => {
    setNodes(nodes);
  };

  const handleImport = () => {
    store.dispatch(
      updateModel(Object.assign({}, configuration.config), {
        selectedNode: null,
      })
    );
    history.push("/");

    // diagram Engine doesn't handle the regeneration of the links between the nodes that is why another render needs to be triggered after the first one.

    setTimeout(() => {
      history.push("/"); //
    }, 100);
  };

  const deleteConfiguration = () => {
    let token = {
      headers: {
        Authorization: "Bearer " + getCookie("userSession"),
      },
    };
    axios
      .delete(
        "http://127.0.0.1:5000/api/configurations/" + configuration.id,
        token
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    trigger === false ? setTrigger(true) : setTrigger(false);
    setNodes([]);
  };

  const pushConfigurations = () => {
    let token = {
      headers: {
        Authorization: "Bearer " + getCookie("userSession"),
      },
    };
    let payload = [];

    nodes.map((node) => {
      if (node.name !== "Pod") {
        payload.push(node.name);
      }
    });

    console.log(payload);

    axios
      .post("http://127.0.0.1:5000/api/configurations/run", payload, token)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const allConfig = (
    <div>
      <div className={classes.title}>My configurations:</div>
      <div className={classes.twoColumns}>
        {backendData !== []
          ? backendData.map((model) => {
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
                      onClick={handleNodes.bind(this, model)}
                    >
                      View Nodes
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );

  const downloadTemplates = () => {
    console.log(nodes);
    setDownloaded(true);
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
          onClick={goToAllConfig.bind(this, [])}
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
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={deleteConfiguration}
        >
          Delete configuration
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          onClick={pushConfigurations}
          disabled={!downloaded}
        >
          Push config to kubernetes
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
