import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductList from "../components/ProductList/ProductList";

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

  return (
    <div>
      <ProductList />
    </div>
  );
}
