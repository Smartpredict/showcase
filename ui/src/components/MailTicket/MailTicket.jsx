import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InferenceBox from "./InferenceBox/InferenceBox";
import InputBox from "./InputBox/InputBox";

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
  const classes = useStyles();
  const [input, setInput] = useState({});
  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Box marginBottom={4} />
      <Container maxWidth="md">
        <Box marginBottom={2}>
          <InputBox handleChange={handleValueChange} input={input} />
        </Box>
        <Box>
          <InferenceBox input={input} handleChange={handleValueChange} />
        </Box>
      </Container>
    </div>
  );
}
