import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import _orderBy from "lodash/orderBy";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function InferenceResults({ predictions, predictionLoading }) {
  const classes = useStyles();
  //{"output":{"predictions":[{"best_bet":"CDS - SAUVEGARDE","classes":[{"class_name":"COB","score":0.05201868712902069},{"class_name":"LOR","score":0.18153895437717438},{"class_name":"RE","score":0.07391989976167679},{"class_name":"QD","score":0.05848430469632149},{"class_name":"QFF","score":0.03339875489473343},{"class_name":"SQ","score":0.07186667621135712},{"class_name":"fdfdfd","score":0.05099067836999893},{"class_name":"fdfdfd","score":0.10280917584896088},{"class_name":"lorem","score":0.027417851611971855},{"class_name":"lorde","score":0.06150694191455841},{"class_name":"saa","score":0.10100327432155609},{"class_name":"sasa","score":0.049674779176712036},{"class_name":"sasaasas","score":0.09433868527412415},{"class_name":"sasas","score":0.04103133827447891}],"id":90423},{"best_bet":"SUPPORT BT TOOLS","classes":[{"class_name":"COB","score":0.1256715953350067},{"class_name":"LOR","score":0.11758166551589966},{"class_name":"RE","score":0.03889955207705498},{"class_name":"QD","score":0.02411571331322193},{"class_name":"QFF","score":0.026707462966442108},{"class_name":"SQ","score":0.07714270055294037},{"class_name":"fdfdfd","score":0.0710190087556839},{"class_name":"fdfdfd","score":0.08248402178287506},{"class_name":"lorem","score":0.031701259315013885},{"class_name":"lorde","score":0.11121002584695816},{"class_name":"saa","score":0.14160722494125366},{"class_name":"sasa","score":0.046865444630384445},{"class_name":"sasaasas","score":0.03932458907365799},{"class_name":"sasas","score":0.0656697079539299}],"id":92914}]},"status":200}
  if (predictionLoading) {
    return (
      <div className={classes.root}>
        <Box marginTop={2} marginBottom={2}>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Skeleton height={100} variant="rect" />
            </Grid>
            <Grid item md={12}>
              <Skeleton height={100} variant="rect" />
            </Grid>
            <Grid item md={12}>
              <Skeleton height={100} variant="rect" />
            </Grid>
            <Grid item md={12}>
              <Skeleton height={100} variant="rect" />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      {predictions
        ? predictions.map((pre) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Box>
                    <Box>
                      <Typography className={classes}>
                        Ticket #{pre.id}
                      </Typography>
                    </Box>
                    <Box>
                      <Chip label={pre.best_bet} color="secondary" />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <List component="nav" aria-label="main mailbox folders">
                      {_orderBy(pre.classes, ["score"], ["desc"])
                        .slice(0, 5)
                        .map((oneClass) => {
                          return (
                            <ListItem>
                              <ListItemText
                                primary={oneClass.class_name}
                                secondary={`${(
                                  oneClass.score.toFixed(3) * 100
                                ).toFixed(2)}%`}
                              />
                            </ListItem>
                          );
                        })}
                    </List>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })
        : null}
    </div>
  );
}
