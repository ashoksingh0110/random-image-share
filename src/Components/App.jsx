import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "../assets/css/style.css";

// Dialogue Box
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function App() {
  var [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openbackdrop, setOpenbackdrop] = React.useState(false);
  useEffect(() => {
    getRandomImage();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBackdrop = () => {
    setOpenbackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenbackdrop(true);
  };

  function getRandomImage() {
    handleOpenBackdrop();
    // API call that returns a random image URL
    fetch("https://picsum.photos/600")
      .then((response) => {
        const imageUrl = response.url;
        setImageUrl(imageUrl);
        handleCloseBackdrop();
      })
      .catch((error) => console.log(error));
  }

  //Text to share with Image Url
  const shareText = encodeURIComponent("Check out this random image !");
  //Functions to share image url in whatsapp,facebook,twitter
  function shareToWhatsapp() {
    window.open(`whatsapp://send?text=${shareText} ${imageUrl} `, "_blank");
  }
  function shareToFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`,
      "_blank"
    );
  }
  function shareToTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${shareText}&url=${imageUrl}`,
      "_blank"
    );
  }
  return (
    <>
      <div className="main">
        <div
          className="box"
          style={{
            border: "5px solid black",
            borderRadius: "10px",
            position: "absolute",
          }}
        >
          <div className="div-img">
            <img src={imageUrl} height="100%" width="100%" alt="Random Image" />
            <div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}               
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  Preview
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{overflowY:"hidden"}}>
                  <CardMedia
                    component="img"
                    sx={{ height:"100%", width:"100%"}}
                    src={imageUrl}
                    alt="Random image"
                  />
                </DialogContent>
                <DialogActions style={{justifyContent: "flex-start"}}>
                  <Button onClick={shareToFacebook}>
                    <FacebookIcon
                      fontSize="large"
                      color="primary"
                    ></FacebookIcon>
                  </Button>
                  <Button onClick={shareToWhatsapp}>
                    <WhatsAppIcon
                      fontSize="large"
                      color="success"
                    ></WhatsAppIcon>
                  </Button>
                  <Button onClick={shareToTwitter}>
                    <TwitterIcon fontSize="large" color="primary"></TwitterIcon>
                  </Button>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>

              </BootstrapDialog>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openbackdrop}
                onClick={handleCloseBackdrop}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </div>
          <div
            className="text-center"
            style={{ position: "relative", bottom: "-5%" }}
          >
            <Button variant="outlined" onClick={handleClickOpen}>
              Share
              <ShareIcon color="primary"></ShareIcon>
            </Button>
            <Button sx={{ m: 1 }} variant="outlined" onClick={getRandomImage}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
