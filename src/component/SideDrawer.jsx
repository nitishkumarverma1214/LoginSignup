import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Avatar, Stack, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function SideDrawer({ isDrawerOpen, toggleDrawer, user }) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ borderLeft: "1px solid #FFF", borderTopLeftRadius: "20px" }}
        PaperProps={{ elevation: 0, style: { borderTopLeftRadius: "20px" } }}
      >
        <Box
          sx={{
            width: "80vw",
            "@media (min-width: 780px)": {
              width: "40vw",
            },
          }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          p={2}
        >
          <Typography variant="h4" gutterBottom>
            User details
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
            p={1}
          >
            <Avatar
              alt="Profile picture"
              src={user.image}
              sx={{
                width: 75,
                height: 75,
                border: "1px solid",
                borderRadius: 50,
              }}
            />
            <Stack direction="column" spacing={2}>
              <Typography variant="h5" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
            </Stack>
          </Stack>

          <Divider />
          <Box component="div" p={1}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <Typography variant="h4" gutterBottom>
                Basics & account details
              </Typography>
            </Stack>
            <Typography variant="h5" gutterBottom>
              Full name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Gender: {user.gender}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {user.email}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

SideDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.object,
};
