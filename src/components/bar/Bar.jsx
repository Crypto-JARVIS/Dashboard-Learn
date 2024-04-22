import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import BarChart from "../utility/BarChart";
import { fetchBar } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Bar = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [barData, setBarData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchBarData() {
      setIsFetching(true);
      try {
        const resData = await fetchBar();
        setBarData(resData);
      } catch (error) {
        setError(
          error.message || "Could not fetch Bar Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchBarData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
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
        <Box height="75vh">
          <BarChart barData={barData} />
        </Box>
      )}
    </Box>
  );
};

export default Bar;
