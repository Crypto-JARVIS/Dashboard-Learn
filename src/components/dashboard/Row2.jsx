import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../utility/LineChart";
import { fetchTransactions } from "../../http";
import { fetchLine } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Row2 = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const resData1 = await fetchTransactions();
        const resData2 = await fetchLine();
        setLineData(resData2);
        setTransactionData(resData1);
      } catch (error) {
        setError(
          error.message ||
            "Could not fetch Data, please try again later"
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
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Revenue Generated
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              $59,342,32
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
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
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} lineData={lineData} />
          </Box>
        )}
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography variant="h5" color={colors.grey[100]} fontWeight="600">
            Recent Transactions
          </Typography>
        </Box>
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
          <Box>
            {transactionData.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Row2;
