import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import ProductItem from "../ProductItem/ProductItem";

const API_URL = "https://api.smartpredict.ai/services/5f1fc3d5289149c1f569b233";
const publicKey = "NjEzYWU0NDktZWQyOS00NmIzLWExZGQtYzE1MDUyMGEwNWUw";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    width: "60%",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, selectedProduct, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, setOpen, selectedProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedProduct && selectedProduct.id) {
      Axios.post(API_URL, {
        input: {
          data: { productId: selectedProduct.id },
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
            setLoading(false);
            return re;
          });

          setProducts(result);
        })
        .catch((error) => {
          console.log("Error", error);
          setLoading(false);
        });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // className={classes.dialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Similar product
        </DialogTitle>
        <DialogContent dividers>
          <Box>
            <ProductItem pro={selectedProduct} />
          </Box>
          <Typography gutterBottom>Similar products</Typography>
          <Box>
            {loading && <LinearProgress variant="indeterminate" />}
            <Grid container spacing={1}>
              {products.map((pro) => {
                return (
                  <Grid item md={4}>
                    <ProductItem pro={pro} key={pro.id} onClick={() => {}} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
