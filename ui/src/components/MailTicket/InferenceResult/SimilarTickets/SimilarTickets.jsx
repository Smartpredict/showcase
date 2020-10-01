import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles({
  root: {
    //minWidth: 275,
  },
  first: {
    backgroundColor: "#4aedc4",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function SimilarTickets({ similarTickets }) {
  const classes = useStyles();
  if (!similarTickets) {
    return null;
  }
  return (
    <div>
      <Typography variant="h6">Similar tickets</Typography>
      <Grid container>
        {similarTickets.map((sim, index) => {
          return (
            <Grid item xs={12} sim={sim.score}>
              <Card
                className={index === 0 ? classes.first : classes.root}
                variant="outlined"
              >
                <CardContent>
                  <Box>
                    <Box>
                      <Chip label={sim.equipe} color="secondary" />:
                      <Typography variant="overline">
                        {" "}
                        Score: {sim.score * 100} %
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ textOverflow: "" }}
                      >
                        {sim.mail}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        <Grid item></Grid>
      </Grid>
    </div>
  );
}
