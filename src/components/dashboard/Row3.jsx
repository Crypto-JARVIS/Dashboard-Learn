import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BarChart from "../utility/BarChart";
import GeographyCharts from "../utility/GeographyCharts";
import ProgressCircle from "../utility/ProgressCircle";
import { fetchBar } from "../../http";
import { fetchGeography } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Row3 = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [barData, setBarData] = useState([]);
  const [geographyData, setGeographyData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const resData1 = await fetchBar();
        const resData2 = await fetchGeography();
        setGeographyData(resData2);
        setBarData(resData1);
      } catch (error) {
        setError(
          error.message ||
            "Could not fetch Transaction Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600">
          Campaign
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          mt="25px"
          alignItems="center"
        >
          <ProgressCircle size="125" />
          <Typography
            variant="h5"
            color={colors.greenAccent[500]}
            sx={{ mt: "15px" }}
          >
            $48,352 revenue generated
          </Typography>
          <Typography>Includes extra misc expenditures and costs</Typography>
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ p: "30px 30px 0 30px" }}
        >
          Sales Quantity
        </Typography>
        <Box height="250px" mt="-20px">
          <BarChart isDashboard={true} barData={barData} />
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
          Geography based Traffic
        </Typography>
        <Box height="200px">
          <GeographyCharts isDashboard={true} geoData={geographyData} />
        </Box>
      </Box>
    </>
  );
};

export default Row3;
