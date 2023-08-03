import { useState } from "react"

import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

import { useSubscribe } from "@/lib/components/BusProvider/BusProvider"

export type NotificationEvent = {
  content: string
  style: "default" | "error" | "success"
  duration: number
}

const Notification = () => {
  const [active, setActive] = useState<NotificationEvent | null>(null)

  useSubscribe(
    "show-notification",
    ({ content, style = "default", duration = 3000 }: NotificationEvent) => {
      !active && setActive({ content, style, duration })
    }
  )

  const handleClose = () => setActive(null)

  if (!active) {
    return null
  }

  return (
    <Snackbar
      open={!!active}
      autoHideDuration={active.duration}
      onClose={handleClose}
      message={active.content || ""}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default Notification
