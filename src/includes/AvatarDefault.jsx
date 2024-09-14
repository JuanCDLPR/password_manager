import { Avatar } from "@mui/material";
import React, { useState } from "react";

import NotInterestedIcon from "@mui/icons-material/NotInterested";

export default function AvatarDefault({ src, w = 42, h = 42 }) {
  return (
    <Avatar src={src} sx={{ width: w, height: h }}>
      <NotInterestedIcon
        style={{
          color: "red",
        }}
      />
    </Avatar>
  );
}
