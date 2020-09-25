import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Axios from "axios";

import InferenceBox from "./InferenceBox/InferenceBox";
import InputBox from "./InputBox/InputBox";
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
  const [input, setInput] = useState({});

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
  const onRowSelection = (arr) => {
    setInput({ ...input, selectedRows: arr });
  };
  return (
    <div>
      <Box marginBottom={4} />
      <Container maxWidth="md">
        <Box marginBottom={2}>
          <InputBox
            handleChange={handleValueChange}
            input={input}
            onRowSelection={onRowSelection}
          />
        </Box>
        <Box>
          <InferenceBox input={input} handleChange={handleValueChange} />
        </Box>
      </Container>
    </div>
  );
}
