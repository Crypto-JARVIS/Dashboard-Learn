import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import { fetchContacts } from "../../http";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../Error";

const Contacts = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchContactsData() {
      setIsFetching(true);
      try {
        const resData = await fetchContacts();
        setContactsData(resData);
      } catch (error) {
        setError(
          error.message || "Could not fetch Contacts Data, please try again later"
        );
      }
      setIsFetching(false);
    }
    fetchContactsData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "ZipCode", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Refrence"
      />
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={contactsData}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Contacts;
