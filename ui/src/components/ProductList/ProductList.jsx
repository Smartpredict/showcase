import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import ProductItem from "./ProductItem/ProductItem";
const API_URL = "https://api.smartpredict.ai/services/5f217ce4289149c1f569b293";
const token = "NWI4ODI1MDUtNmYwZi00ZjFmLWIyMjEtODIxOWMyOGNmOTRl";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: 400,
  },
  media: {
    height: 250,
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
        <Grid container spacing={1}>
          {products.map((pro) => {
            return (
              <Grid item md={4}>
                <ProductItem pro={pro} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
