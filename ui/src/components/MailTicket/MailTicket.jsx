import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import InferenceBox from "./InferenceBox/InferenceBox";
import InputBox from "./InputBox/InputBox";
import InferenceResult from "./InferenceResult/InferenceResult";

const API_URL = "https://api.smartpredict.ai/services/5f6c8ad1289149c1f569b906";
const publicKey = "NGMyOWE2MzMtNDkzYy00M2U2LTlmYmYtYzYyZTE5ODI3MGQz";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //display: "flex",
  },
  paper: {
    padding: theme.spacing(1),
  },
  box: {
    marginRight: theme.spacing(2),
  },
}));

export default function Index() {
  const [input, setInput] = useState({
    model: "XGB",
    mode: "table",
    selectedRows: [],
    project:
      process.env.GATSBY_TICKETING_DEFAULT_PROJECT_URL ||
      "https://api.smartpredict.ai/services/5f6d8c21289149c1f569b9a9",
    token:
      process.env.GATSBY_TICKETING_DEFAULT_PROJECT_TOKEN ||
      "YjQwODlkNGYtNjYwYi00YjBkLWEwYzctZWJkNmM2ZWQyM2Iz",
  });

  const [output, setOutput] = useState({ predictions: [] });
  const [predictionLoading, setPredictionLoading] = useState(false);

  useEffect(() => {
    Axios.post(API_URL, {
      input: {
        data: { first: 1, last: 10 },
      },
      access_token: publicKey,
    })
      .then(({ data }) => {
        let result = data && data.output ? data.output.samples : [];
        setInput({ ...input, mails: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Table row selection
  const onRowSelection = (arr) => {
    // [1, 2]
    setInput({ ...input, selectedRows: arr });
  };

  // Process inference function
  const fireInference = () => {
    let inferenceInput = input.selectedRows.map((r) => input.mails[r]);
    if (input.mode) {
      inferenceInput = [{ id: "input", mail: input.emailManualInput }];
    } else {
      inferenceInput = inferenceInput.map((i) => ({ id: i.id, mail: i.mail }));
    }
    setPredictionLoading(true);
    // Fire inference from smartpredict
    // Project url
    Axios.post(input.project, {
      input: {
        mails: inferenceInput,
        model: input.model,
      },
      access_token: input.token,
    })
      .then(({ data }) => {
        setPredictionLoading(false);

        let result = data && data.output ? data.output.predictions : [];
        setOutput({ ...output, predictions: result });
      })
      .catch((error) => {
        setPredictionLoading(false);

        console.error(error);
      });
  };
  return (
    <div>
      <Box marginBottom={4} />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item md={6}>
            <InputBox
              handleChange={handleValueChange}
              input={input}
              onRowSelection={onRowSelection}
            />
          </Grid>
          <Grid item md={4}>
            <InferenceBox
              input={input}
              handleChange={handleValueChange}
              onSendClick={fireInference}
            />
            <Box>
              <InferenceResult
                predictionLoading={predictionLoading}
                predictions={output.predictions}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
