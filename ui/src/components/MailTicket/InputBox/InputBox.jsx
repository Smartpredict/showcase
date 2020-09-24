import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MUIDataTable from "mui-datatables";

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
const options = {
  filterType: "checkbox",
};

export default function Index({ handleChange, input }) {
  const classes = useStyles();

  const oneMailRow = input.mails ? input.mails[0] : {};
  const columns = Object.keys(oneMailRow);
  let data = [];
  if (input.mails) {
    data = input.mails.map((m) => {
      const keys = Object.keys(m);
      let row = keys.map((k) => m[k]);

      return row;
    });
  }
  const handleValueChange = (e) => {
    handleChange(e);
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Box className={classes.box}>
            <TextField
              label="SP Project URL"
              name="project"
              value={input.project}
              onChange={handleValueChange}
              fullWidth
            />
          </Box>
          <Box className={classes.box}>
            <TextField
              label="Access token"
              name="token"
              value={input.token}
              onChange={handleValueChange}
              fullWidth
            />
          </Box>
          <Box className={classes.box}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Input mode</FormLabel>
              <RadioGroup
                name="mode"
                value={input.mode}
                onChange={handleValueChange}
              >
                <FormControlLabel
                  value="table"
                  control={<Radio />}
                  label="Table"
                />
                <FormControlLabel
                  value="input"
                  control={<Radio />}
                  label="Manual input"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {input.mode === "table" ? (
            <Box>
              <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
              />
            </Box>
          ) : (
            <Box>
              <TextField
                label="Enter email content here"
                name="emailManualInput"
                value={input.emailManualInput}
                onChange={handleValueChange}
                fullWidth
                multiline
              />
            </Box>
          )}
        </form>
      </Paper>
    </div>
  );
}
