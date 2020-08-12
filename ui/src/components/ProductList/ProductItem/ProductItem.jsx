import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: 400,
  },
  media: {
    height: 250,
  },
});
export default function MediaCard({ pro, onClick }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pro.image}
          title={pro.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            {pro.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
