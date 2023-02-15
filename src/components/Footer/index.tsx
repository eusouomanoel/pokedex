import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Footer() {
  return (
    <Paper square>
      <Container maxWidth="lg" sx={{ height: 40, alignItems: "center" }}>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            m: 2,
          }}
        >
          <Typography variant="caption" color="white">
            Copyright ©2023. Manoel Neto Rodrigues Leite
          </Typography>
          <IconButton
            href="https://github.com/eusouomanoel"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Container>
    </Paper>
  );
}
