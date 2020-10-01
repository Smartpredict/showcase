import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: 8,
    //  display: "flex",
  },
});

export default function InferenceBox({ handleChange, input, onSendClick }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box marginRight={2} flexGrow={1}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Model</InputLabel>
          <Select
            value={input.model}
            name="model"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={1}>XGB</MenuItem>
            <MenuItem value={2}>Random Forest</MenuItem>
            <MenuItem value={3}>SVM</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box flexGrow={1} marginTop={2}>
        <Button fullWidth variant="contained" onClick={onSendClick}>
          Process
        </Button>
      </Box>
    </Paper>
  );
}
