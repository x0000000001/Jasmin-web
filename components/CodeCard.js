import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import InterpreterTextField from "./InterpreterTextField";
import styles from "./CodesAccordion.module.css";

export default function CodeCard({ codeObj, handleLoadCode }) {
  return (
    <Card variant="soft" sx={{ display: "flex" }} className={`${styles.card}`}>
      {/* sx={{ width: 800 }} */}
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }} textAlign={"left"}>
        {codeObj.title}
      </Typography>
      {/* <Typography level="body2">April 24 to May 02, 2021</Typography> */}
      <InterpreterTextField
        placeHolder="There's not much happening here..."
        disabled={false}
        minRows={4}
        maxRows={4}
        default_code={codeObj.code}
      ></InterpreterTextField>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Owner:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {codeObj.profiles.username}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
          onClick={() => handleLoadCode(codeObj)}
        >
          Load
        </Button>
      </Box>
    </Card>
  );
}
