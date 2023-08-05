import { useState } from "react"
import { useRouter } from "next/router"

import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"


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

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
        console.log("failed to parse error response", err)
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

    if (password !== confirmPassword) {
      setErrorCode("form/mismatch-password")
      return
    }

    fetch("/api/auth/register", {
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
        setConfirmPassword("")
        setIsLoading(false)
      })
  }

  const findErrorText = () => {
    switch (errorCode) {
      case "form/mismatch-password":
        return "Password and confirm password do not match."
      case "auth/wrong-password":
        return "Invalid password. Please try again."
      default:
        return "Failed to register in."
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1">
        Sign Up Today For Free
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Email"
            value={email}
            type="email"
            placeholder="name@domain.com"
            autoComplete="email-address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            value={password}
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            autoComplete="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        {isLoading && <CircularProgress />}
        {!success && !isLoading && (
          <FormActions>
            <Button type="submit" color="primary">
              Register
            </Button>
          </FormActions>
        )}
      </Form>
      {success && (
        <Typography color="primary">Success! Redirecting now...</Typography>
      )}
      {errorCode && <Typography color="error">{findErrorText()}</Typography>}
    </>
  )
}

export default Register
