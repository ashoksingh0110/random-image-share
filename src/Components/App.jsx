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
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageParam = urlParams.get("image");
    if (imageParam) {
      setImageUrl(decodeURIComponent(imageParam));
    }
  }, []);

  const generateRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/id/${randomId}/600/600`;
    setImageUrl(url);
    window.history.pushState(null, "", `?image=${encodeURIComponent(url)}`);
  };

  const shareText = encodeURIComponent("Check out this random image!");
  const shareUrl = `${window.location.href}`;
  const shareToWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  function shareToFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  }

  function shareToTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  }
  return (
    <div
      className="container"
      style={{ border: "2px solid black", borderRadius: "5px" }}
    >
      <div
        className="image-container"
      >
        {imageUrl && (
          <img src={imageUrl} alt="Random" className="random-image" />
        )}
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
            <DialogContent dividers>
              <CardMedia
                component="img"
                sx={{ height: "100%", width: "100%" }}
                src={imageUrl}
                alt="Random image"
              />
            </DialogContent>
            <DialogActions style={{ justifyContent: "flex-start" }}>
              <Button onClick={shareToFacebook}>
                <FacebookIcon fontSize="large" color="primary"></FacebookIcon>
              </Button>
              <Button onClick={shareToWhatsapp}>
                <WhatsAppIcon fontSize="large" color="success"></WhatsAppIcon>
              </Button>
              <Button onClick={shareToTwitter}>
                <TwitterIcon fontSize="large" color="primary"></TwitterIcon>
              </Button>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
      <div className="button-container">
        <button onClick={generateRandomImage} id="btn">
          {imageUrl ? "Refresh" : "Generate Image"}
        </button>
        {imageUrl && (
          <button onClick={handleClickOpen}>
            Share<ShareIcon color="light"></ShareIcon>
          </button>
        )}
      </div>
    </div>
  );
}
