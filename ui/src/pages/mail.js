import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MailTicket from "../components/MailTicket/MailTicket";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Index() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DFI Ticketing
          </Typography>
        </Toolbar>
      </AppBar>
      <Box marginBottom={4} />
      <Grid container justify="center">
        <Grid item md={11} sm={12} lg={11}>
          <MailTicket />
        </Grid>
      </Grid>
    </div>
  );
}
