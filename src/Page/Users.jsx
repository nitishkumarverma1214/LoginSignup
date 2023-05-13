import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserTable from "../component/UserTable";

function Users() {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h1" component="h2" fontSize="1.5rem">
            Users
          </Typography>
          <Typography variant="h1" component="h2" fontSize="1rem">
            Here are all the users of the project.
          </Typography>
        </Stack>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Stack>

      <UserTable />
    </>
  );
}

export default Users;
