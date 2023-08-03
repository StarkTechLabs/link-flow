import { GetServerSideProps } from "next"
import Head from "next/head"
import NLink from "next/link"

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material"

import DisplayRow from "@/lib/components/DisplayRow"
import auth, { User, UserDetail } from "@/lib/services/auth"

interface HomeProps {
  user: User | null
  userId: string
  userDetails: UserDetail | null
}

export default function Home({ user, userDetails }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box m={8}>
        <Box my={3} display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h1">
            Profile
          </Typography>
          <Box sx={{ "& a": { ml: 3 } }}>
            <Button component={NLink} href="/profile/edit" title="Edit Profile">
              Edit
            </Button>
            <Button component={NLink} href="/api/auth/logout" title="Sign Out">
              Sign Out
            </Button>
          </Box>
        </Box>

        <br />
        <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
          <Table sx={{ minWidth: 350 }} aria-label="profile table">
            <TableBody>
              <DisplayRow label="User Id" value={userDetails?.id} />
              <DisplayRow label="Email" value={user?.email} />
              <DisplayRow label="Name" value={userDetails?.name || ""} />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const user = await auth.getUserWithContext(ctx)
  if (user) {
    const userDetails = await auth.fetchUserDetails(user.id || "")

    return { props: { user, userDetails, userId: user.id || "" } }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth/signin",
    },
  }
}
