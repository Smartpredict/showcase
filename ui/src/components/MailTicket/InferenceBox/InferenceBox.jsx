import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: 8,
  },
});

export default function InferenceBox({ handleChange, input }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          value={input.model}
          name="model"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="xgboost">XGBoost</MenuItem>
          <MenuItem value="random-forest">Random Forest</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
