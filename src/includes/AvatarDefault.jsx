import { Avatar } from "@mui/material";
import React, { useState } from "react";

import NotInterestedIcon from "@mui/icons-material/NotInterested";

export default function AvatarDefault({ src }) {
  return (
    <Avatar src={src}>
      <NotInterestedIcon
        style={{
          color: "red",
        }}
      />
    </Avatar>
  );
}
