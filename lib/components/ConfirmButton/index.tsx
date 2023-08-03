import { useState, useEffect } from "react"
import { Button, ButtonProps } from "@mui/material"

export interface ConfirmButtonProps extends ButtonProps {
  onConfirm: () => void
}

export const ConfirmButton = ({ onConfirm, children, color, ...props }: ConfirmButtonProps): JSX.Element => {
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (confirm) {
      setTimeout(() => {
        setConfirm(false)
      }, 2000)
    }
  }, [confirm])

  const handleClick = () => {
    if (confirm) {
      setConfirm(false)
      onConfirm && onConfirm()
    } else {
      setConfirm(true)
    }
  }

  return (
    <Button {...props} onClick={handleClick} color={confirm ? "warning" : color}>
      {confirm ? "Click to Confirm" : children}
    </Button>
  )
}
