import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import { fetchInvoices } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Invoices = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [invoicesData, setInvoicesData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchInvoicesData() {
      setIsFetching(true);
      try {
        const resData = await fetchInvoices();
        setInvoicesData(resData);
      } catch (error) {
        setError(
          error.message || "Could not fetch Invoices Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchInvoicesData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography color={colors.greenAccent[500]}>
            ${params.row.cost}
          </Typography>
        );
      },
    },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Invoices" subtitle="List of Invoice Balances" />
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
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& div div div div >.MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column--cell": { color: colors.greenAccent[300] },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={invoicesData} columns={columns} />
        </Box>
      )}
    </Box>
  );
};

export default Invoices;
