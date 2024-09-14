import * as React from "react";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  const styles = (props) => ({
    colorPrimary: {
      backgroundColor: "#3ABE88",
    },
    barColorPrimary: {
      backgroundColor: "#3ABE88",
    },
  });
  const styles2 = {
    colorPrimary: {
      backgroundColor: "#3ABE88",
    },
    barColorPrimary: {
      backgroundColor: "#3ABE88",
    },
  };
  return (
    <Box className="my-2" sx={{ width: "100%" }}>
      <LinearProgress style={styles2} />
    </Box>
  );
}
