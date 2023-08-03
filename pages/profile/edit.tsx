import { useState } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TextField,
} from "@mui/material"

import DisplayRow from "@/lib/components/DisplayRow"
import auth, { User, UserDetail } from "@/lib/services/auth"

interface HomeProps {
  user: User | null
  userId: string
  userDetails: UserDetail | null
}

export default function Home({ user, userDetails }: HomeProps): JSX.Element {
  const router = useRouter()
  const [name, setName] = useState(userDetails?.name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch("/api/auth/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      })
      if (!res || !res.ok) {
        return setError("Failed to save profile")
      }
      router.push("/")
    } catch (err) {
      setError("Failed to save profile")
    }
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Box m={8}>
        <Typography variant="h4" component="h1">
          Edit Profile
        </Typography>

        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="profile table">
            <TableBody>
              <DisplayRow label="User Id" value={userDetails?.id} />
              <DisplayRow label="Email" value={user?.email} />
              <InputRow
                label="Name"
                input={
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                }
              />
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={3} display="flex" justifyContent="flex-end">
          <Button disabled={isLoading} onClick={handleSave}>
            Save
          </Button>
        </Box>

        {isLoading && !error && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </Box>
    </>
  )
}

interface InputRowProps {
  label: string
  input: JSX.Element
}

const InputRow = ({ label, input }: InputRowProps): JSX.Element => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle1">{label}</Typography>
    </TableCell>
    <TableCell align="right">{input}</TableCell>
  </TableRow>
)

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
