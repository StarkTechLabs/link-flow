import { useState } from "react"
import { useRouter } from "next/router"
import NLink from "next/link"

import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const BoxContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}) as typeof Box

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const FormControl = styled(Box)({
  margin: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "320px",
}) as typeof Box

const FormActions = styled(Box)({
  margin: 16,
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
}) as typeof Box

const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)

  const handleErrorResponse = (res: Response) => {
    res
      .json()
      .then((data) => {
        if (data && data.errorCode) {
          setErrorCode(data.errorCode)
        }
      })
      .catch((err) => {
        console.log('failed to parse error response', err)
        setErrorCode("failed/unknown")
      })
    console.error("failed to sign in", {
      statusText: res.statusText,
      status: res.status,
    })
  }

  const handleSubmit = async (e: any) => {
    e && e.preventDefault()
    setIsLoading(true)
    setErrorCode(null)
    console.log("signing in user...")

    fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("successful sign in")
          setSuccess(true)
          router.push("/")
          return
        }
        handleErrorResponse(res)
      })
      .catch((err) => {
        console.error("failed to sign in", err)
        setErrorCode("failed/unknown")
      })
      .finally(() => {
        setPassword("")
        setIsLoading(false)
      })
  }

  const findErrorText = () => {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Invalid password. Please try again."
      default:
        return "Failed to sign in."
    }
  }

  return (
    <BoxContainer>
      <Typography variant="h4" component="h1">
        Sign In
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Email"
            value={email}
            type="email"
            placeholder="name@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {isLoading && <CircularProgress />}
        {!success && !isLoading && (
          <FormActions>
            <Button type="submit" color="primary">
              Sign In
            </Button>
          </FormActions>
        )}
      </Form>
      {success && (
        <Typography color="primary">Success! Redirecting now...</Typography>
      )}
      {errorCode && <Typography color="error">{findErrorText()}</Typography>}
      <Box m={2}>
        <Link component={NLink} href="/auth/register">Register</Link>
      </Box>
    </BoxContainer>
  )
}

export default SignIn
