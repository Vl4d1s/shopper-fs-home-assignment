import type { ReactNode } from "react";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function BoxFrame({
  children,
  title = "",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <Box gap={2} my={4} padding={2} sx={{ border: "1px solid grey" }}>
      <Typography align="center" gutterBottom variant="h6">
        {title}
      </Typography>
      {children}
    </Box>
  );
}
