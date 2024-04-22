import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import LineChart from "../utility/LineChart";
import { fetchLine } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Line = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchLineData() {
      setIsFetching(true);
      try {
        const resData = await fetchLine();
        setLineData(resData);
      } catch (error) {
        setError(
          error.message || "Could not fetch Line Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchLineData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
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
          <LineChart lineData={lineData} />
        </Box>
      )}
    </Box>
  );
};

export default Line;
