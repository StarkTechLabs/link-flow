import { useState } from "react"
import { GetServerSideProps } from "next"

import {
  Box,
  Typography,
  Link,
  List, ListItem,
  ButtonBase,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import { Android, PhoneIphone, Public } from "@mui/icons-material"

import SignInController from "@/lib/controllers/SignIn"
import RegisterController from "@/lib/controllers/Register"

import Footer from "@/lib/components/Footer/Footer"

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      <Box display="flex" p={6} alignItems="center" justifyContent="center" width="100%" height="100vh">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={{ xs: "100%", sm: "100%", md: "50%" }}>
          <Typography variant="h2" component="h1">Link Flow</Typography>
          <Typography variant="subtitle1">the power of one link</Typography>
          <br />
          <br />
          <Typography variant="body1">send your users to the right destination no matter what platform they are on</Typography>
          <br />
          <br />
          <Box display="block" width={{ xs: "100%", sm: "100%", md: "50%" }}>
            <Typography variant="subtitle1">Route to:</Typography>
            <List>
              <ListItem>
                <ListItemIcon><Public color="primary" /></ListItemIcon>
                <ListItemText primary="Your Website" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Android color="primary" /></ListItemIcon>
                <ListItemText primary="Your Android App" />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIphone color="primary" /></ListItemIcon>
                <ListItemText primary="Your iOS app" />
              </ListItem>
            </List>
          </Box>
          <br /><br />
          <Box display="block" width={{ xs: "100%", sm: "100%", md: "70%" }}>
            <Typography variant="body1">Beautiful link previews that you control. Built in SEO settings to customize the link title, description, and image.</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width={{ xs: "100%", sm: "100%", md: "50%" }}>
          {showSignIn && <SignInController />}
          {!showSignIn && <RegisterController />}
          <Box m={2}>
            <Link component={ButtonBase} onClick={() => setShowSignIn(!showSignIn)}>{showSignIn ? "Register" : "Sign In"}</Link>
          </Box>
        </Box>
      </Box>
      {/* below the fold */}
      <Footer />
    </>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async () => {

  return { props: { shouldEmbed: true } }
}
