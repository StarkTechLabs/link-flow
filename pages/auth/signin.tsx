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
import Head from "next/head"

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      <Head>
        <title>Link Flow - Sign In</title>
        <meta name="description" content="Link Flow - the power of one link" />
      </Head>
      <Box
        p={6} display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        alignItems="center" justifyContent="center"
        width="100%" height={{ xs: "auto", sm: "auto", md: "90vh" }}
      >
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
        <br />
        <Box my={2} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width={{ xs: "100%", sm: "100%", md: "50%" }}>
          {showSignIn && <SignInController />}
          {!showSignIn && <RegisterController />}
          <Box m={2}>
            <Link component={ButtonBase} onClick={() => setShowSignIn(!showSignIn)}>{showSignIn ? "Register" : "Sign In"}</Link>
          </Box>
        </Box>
      </Box>
      {/* below the fold */}
      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2">How it works</Typography>
        <Typography variant="body1">Send your users one link: app.yourapp.example</Typography>
        <Typography variant="body1">Have that domain configured to point to your Link Flow link</Typography>
        <Typography variant="body1">Once a user follows that link, we will determine the best place to send them based on their platform and your configuration</Typography>
        <Typography variant="body1">If the user is on an iOS device and has your app installed, we will deep link them into your app</Typography>
        <Typography variant="body1">If the user is on an iOS device but has not installed your app, we sent them to your App Store listing</Typography>
        <Typography variant="body1">Same for Android devices</Typography>
      </Box> */}

      <Footer />
    </>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async () => {

  return { props: { shouldEmbed: true } }
}
