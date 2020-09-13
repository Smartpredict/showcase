import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import ProductItem from "./ProductItem/ProductItem";
import RecDialog from "./RecommandationDialog/RecommandationDialog";
import LinearProgress from "@material-ui/core/LinearProgress";
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Grid container justify="center">
      {!products.length || products.length === 0 ? (
        <LinearProgress variant="indeterminate" />
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
  );
}
