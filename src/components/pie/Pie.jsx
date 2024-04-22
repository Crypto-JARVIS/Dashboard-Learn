import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import PieChart from "../utility/PieChart";
import { fetchPie } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Pie = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pieData, setPieData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPieData() {
      setIsFetching(true);
      try {
        const resData = await fetchPie();
        setPieData(resData);
      } catch (error) {
        setError(
          error.message || "Could not fetch Pie Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchPieData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
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
          <PieChart pieData={pieData} />
        </Box>
      )}
    </Box>
  );
};

export default Pie;
