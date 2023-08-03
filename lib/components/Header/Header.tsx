import Link from "next/link"

import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material"
import ProfileIcon from "@mui/icons-material/AccountCircle"
import MuiLink from "@mui/material/Link"

export interface HeaderProps {
  title: string
  user?: any
}

const Header = ({ title, user }: HeaderProps): JSX.Element => {
  return (
    <>
      <AppBar color="transparent" position="static" elevation={0}>
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <MuiLink
              component={Link}
              href="/"
              title="Home"
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              <Typography variant="subtitle1">{title}</Typography>
            </MuiLink>
            {user && (
              <IconButton component={Link} href="/profile" title="Sign Out">
                <ProfileIcon color="secondary" />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
