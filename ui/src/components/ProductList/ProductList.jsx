import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import ProductItem from "./ProductItem/ProductItem";
import RecDialog from "./RecommandationDialog/RecommandationDialog";
import { Typography } from "@material-ui/core";
const API_URL = "https://api.smartpredict.ai/services/5f217ce4289149c1f569b293";
const publicKey = "NWI4ODI1MDUtNmYwZi00ZjFmLWIyMjEtODIxOWMyOGNmOTRl"; // process.env.PRODUCT_LIST_API_TOKEN;

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
  const [openDiag, setOpenDiag] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState({});
  const openDialog = (item) => {
    setOpenDiag(true);
    setSelectedProduct(item);
  };
  const closeDialog = (bool) => {
    setOpenDiag(false);
  };

  useEffect(() => {
    Axios.post(API_URL, {
      input: {
        data: { first: 1, last: 10 },
      },
      access_token: publicKey,
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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          This demo shows how to use SmartPredict to develop and deploy a
          similar product recommandation based on NLP & Deep Learning in
          serverless manner
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          The flowchart project is in SmartPredict, and the repo is{" "}
          <a href="https://github.com/Smartpredict/showcase/"> HERE</a>
        </Typography>
      </div>
      <div>
        <Typography
          variant="overline"
          gutterBottom
          style={{ marginBottom: 50 }}
        >
          Just click on "view" button to see it in action!
        </Typography>
      </div>
      <Grid container justify="center">
        {loading ? (
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
              <Grid item md={4}>
                <Skeleton height={400} variant="rect" />
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        <Grid item md={12}>
          <Grid container spacing={1}>
            {products.map((pro) => {
              return (
                <Grid item md={4}>
                  <ProductItem
                    pro={pro}
                    key={pro.id}
                    onClick={() => {
                      openDialog(pro);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {openDiag && selectedProduct && selectedProduct.id && (
          <RecDialog
            open={openDiag}
            setOpen={closeDialog}
            selectedProduct={selectedProduct}
          />
        )}
      </Grid>
    </div>
  );
}
