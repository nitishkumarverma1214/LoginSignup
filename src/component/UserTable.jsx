import { Avatar, Box, LinearProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SideDrawer from "../component/SideDrawer";
import { toast } from "react-toastify";

function getFullName(params) {
  return `${params.row.firstName || ""} ${" "}  ${params.row.lastName || ""}`;
}
const columns = [
  {
    field: "image",
    headerName: "IMAGE",
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={params.row.image} />
        </>
      );
    },
  },
  {
    field: "fullName",
    headerName: "NAME",
    valueGetter: getFullName,
    minWidth: 250,
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          {params.row.firstName}
          {params.row.lastName}
        </>
      );
    },
  },
  {
    field: "gender",
    headerName: "GENDER",
    width: 120,
  },
  {
    field: "email",
    headerName: "EMAIL",
    flex: 1,
  },
];

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_USER_URL);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Unable to get users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (
    params // GridRowParams
  ) => {
    toggleDrawer();
    setSelectedUser(params.row);
  };

  return (
    <>
      <Box
        sx={{ width: "90%", margin: "auto", overflow: "auto", height: "400px" }}
      >
        <DataGrid
          onRowClick={handleRowClick}
          getRowId={(rows) => rows.id}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            ".MuiDataGrid-columnHeaders": {
              background: "#ACB1D6",
              borderRadius: "5px",
            },
            ".MuiDataGrid-row": {
              background: "#DBDFEA",
              marginTop: "0.4rem",
              borderRight: "1px solid #fff",
              borderLeft: "0.5rem solid #19A7CE",
              borderRadius: "5px",
            },
            ".MuiDataGrid-toolbarContainer": {
              flexDirection: "row-reverse",
              paddingBottom: "1rem",
            },
          }}
          {...users}
          initialState={{
            ...users,
            filter: {
              filterModel: {
                items: [],
              },
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          columns={columns}
          rows={users}
          slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
          loading={isLoading}
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
      <SideDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        user={selectedUser}
      />
    </>
  );
}
