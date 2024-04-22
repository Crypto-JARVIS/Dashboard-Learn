import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Error = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h4"
        color={colors.redAccent[500]}
        sx={{ position: "absolute", top: "50%" }}
      >
        {props.errorMsg}
      </Typography>
    </Box>
  );
};

export default Error;
