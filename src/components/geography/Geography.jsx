import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import GeographyCharts from "../utility/GeographyCharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { fetchGeography } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Geography = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [geographyData, setGeographyData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchGeographyData() {
      setIsFetching(true);
      try {
        const resData = await fetchGeography();
        setGeographyData(resData);
      } catch (error) {
        setError(
          error.message ||
            "Could not fetch Geography Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchGeographyData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      {isFetching && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress
            color="secondary"
            sx={{ position: "absolute", top: "50%" }}
          />
        </Box>
      )}
      {!isFetching && error && <Error errorMsg={error} />}
      {!isFetching && !error && (
        <Box
          height="75vh"
          border={`1px solid ${colors.grey[100]}`}
          borderRadius="4px"
        >
          <GeographyCharts geoData={geographyData} />
        </Box>
      )}
    </Box>
  );
};

export default Geography;
