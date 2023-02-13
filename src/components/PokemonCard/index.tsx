import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

interface Pokemon {
  name: string;
  sprites?: {
    front_default: string;
  };
  image: string;
  types: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonCard({ name, image, types }: Pokemon) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const typeHandler = (types: any) => {
    if (types[1]) {
      return types[0].type.name + " " + types[1].type.name;
    } else return types[0].type.name;
  };
  return (
    <Card sx={{ maxWidth: 500, minHeight: 300 }} onClick={handleOpen}>
      <CardActionArea>
        <CardMedia component="img" image={image} alt={name} />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              {typeHandler(types)}
            </Typography>
          </Box>

          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>

      <Modal
        open={open}
        onClose={handleClose}
        onBackdropClick={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400, backgroundColor: "white" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {typeHandler(types)}
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
