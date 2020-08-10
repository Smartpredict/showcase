import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
const API_URL = "https://api.smartpredict.ai/services/5f217ce4289149c1f569b293";
const token = "NWI4ODI1MDUtNmYwZi00ZjFmLWIyMjEtODIxOWMyOGNmOTRl";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.post(API_URL, {
      input: {
        data: { first: 1, last: 10 },
      },
      access_token: token,
    })
      .then(({ data }) => {
        let result = data && data.output ? JSON.parse(data.output) : [];

        result = result.map((k) => {
          const images = k && k.image ? JSON.parse(k.image) : [];

          let re = {
            id: k.uniq_id,
            name: k.product_name,
            price: k.retail_price,
            image: images && images.length ? images[0] : null,
            description: k.description,
          };
          return re;
        });

        setProducts(result);
      })
      .catch((error) => {
        console.log("====================================");
        console.log("Error", error);
        console.log("====================================");
      });
  }, []);

  return (
    <Grid container justify="center">
      <Grid item md={8}>
        <Grid container>
          {products.map((pro) => {
            return (
              <Grid item md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={pro.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {pro.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
