import { useState } from "react"

import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material"
import { Android, Close, PhoneIphone, Public } from "@mui/icons-material"

import { LinkConfig } from "@/lib/services/linkConfig"
import { ConfirmButton } from "../ConfirmButton"
import { Destination } from "../Destination"

export interface EditModalProps {
  open: boolean
  onClose: () => void
  config: LinkConfig
}

const EditModal = ({ open, onClose, config }: EditModalProps): JSX.Element => {
  const [name, setName] = useState(config?.name || "")
  const [seoTitle, setSeoTitle] = useState(config?.seo?.title || "")
  const [seoDescription, setSeoDescription] = useState(config?.seo?.description || "")
  const [seoMedia, setSeoMedia] = useState(config?.seo?.media || "")
  const [webDestValue, setWebDestValue] = useState(config?.destinations?.find(dest => dest.platform === "web")?.value || "")
  const [webEnabled, setWebEnabled] = useState(!!config?.destinations?.find(dest => dest.platform === "web")?.value)
  const [iosDestValue, setIosDestValue] = useState(config?.destinations?.find(dest => dest.platform === "ios")?.value || "")
  const [iosEnabled, setIosEnabled] = useState(!!config?.destinations?.find(dest => dest.platform === "ios")?.value)
  const [androidDestValue, setAndroidDestValue] = useState(config?.destinations?.find(dest => dest.platform === "android")?.value || "")
  const [androidEnabled, setAndroidEnabled] = useState(!!config?.destinations?.find(dest => dest.platform === "android")?.value)

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setName("")
    setError("")
    setIsLoading(false)
    onClose && onClose()
  }

  const buildDestinations = () => {
    const destinations = []
    if (webDestValue) {
      destinations.push({
        platform: "web",
        value: webDestValue,
      })
    }
    if (iosDestValue) {
      destinations.push({
        platform: "ios",
        value: iosDestValue,
      })
    }
    if (androidDestValue) {
      destinations.push({
        platform: "android",
        value: androidDestValue,
      })
    }
    return destinations
  }

  const createNewConfig = async (): Promise<string | undefined> => {
    try {
      const res = await fetch("/api/linkConfigs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: config?.id || "",
          name,
          seo: {
            title: seoTitle || "",
            description: seoDescription || "",
            media: seoMedia || "",
          },
          destinations: buildDestinations(),
        }),
      })

      if (!res || !res.ok) {
        console.error("Failed to submit data")
        setError("Failed to submit data")

        return
      }
      const data = await res.json()
      return data.docId
    } catch (err) {
      console.error("Failed to submit data", err)
      setError("Failed to submit data")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!name) {
      setError("Name is required.")
      setIsLoading(false)
      return
    }
    const result = await createNewConfig()
    if (result) {
      handleClose()
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/linkConfigs/${config.id}`, { method: "DELETE" })
    if (res && res.ok) {
      handleClose()
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {config?.id ? "Edit" : "New"} Link Config
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          type="text"
          helperText="What should it be called? (not public)"
          onChange={(e) => setName(e.target.value)}
        />

        <Box my={2}>
          <Typography variant="subtitle1">Destinations</Typography>
          {!webEnabled && <IconButton onClick={() => { setWebEnabled(true); setWebDestValue("https://") }}><Public color="primary" /></IconButton>}
          {!iosEnabled && <IconButton onClick={() => { setIosEnabled(true); setIosDestValue("https://") }}><PhoneIphone color="primary" /></IconButton>}
          {!androidEnabled && <IconButton onClick={() => { setAndroidEnabled(true); setAndroidDestValue("https://") }}><Android color="primary" /></IconButton>}

          {(webDestValue || webEnabled) && <Destination platform="web" value={webDestValue} onRemove={() => { setWebEnabled(false); setWebDestValue("") }} onChange={val => setWebDestValue(val)} />}
          {(iosDestValue || iosEnabled) && <Destination platform="ios" value={iosDestValue} onRemove={() => { setIosEnabled(false); setIosDestValue("") }} onChange={val => setIosDestValue(val)} />}
          {(androidDestValue || androidEnabled) && <Destination platform="android" value={androidDestValue} onRemove={() => { setAndroidEnabled(false); setAndroidDestValue("") }} onChange={val => setAndroidDestValue(val)} />}

        </Box>

        <Box my={2}>
          <Typography variant="subtitle1">SEO Settings</Typography>

          <TextField
            label="Title"
            value={seoTitle}
            type="text"
            // helperText="Title"
            onChange={(e) => setSeoTitle(e.target.value)}
          />
          <TextField
            label="Description"
            value={seoDescription}
            type="text"
            // helperText="Description"
            onChange={(e) => setSeoDescription(e.target.value)}
          />
          <TextField
            label="Media"
            value={seoMedia}
            type="text"
            helperText="A public url to an image"
            onChange={(e) => setSeoMedia(e.target.value)}
          />
        </Box>

        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            {config?.id && (
              <ConfirmButton color="warning" onConfirm={handleDelete}>
                Delete
              </ConfirmButton>
            )}
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
