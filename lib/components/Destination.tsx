import { Typography, TextField, Box, IconButton } from "@mui/material"
import { Public, Android, PhoneIphone, Delete } from "@mui/icons-material"

export interface DestinationProps {
  platform: "web" | "ios" | "android"
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export const Destination = ({ platform, value, onChange, onRemove }: DestinationProps) => {
  const PlatformIcon = () => {
    switch (platform) {
      case "web":
        return <Public />
      case "android":
        return <Android />
      case "ios":
        return <PhoneIphone />
    }
  }

  return (
    <Box m={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <PlatformIcon />
          <Typography variant="subtitle2">Platform: {platform}</Typography>
        </Box>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </Box>

      {platform === "web" && <Web value={value} onChange={onChange} />}
      {platform === "ios" && <IOSDestination value={value} onChange={onChange} />}
      {platform === "android" && <AndroidDestination value={value} onChange={onChange} />}
    </Box>
  )
}

const Web = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <TextField
      label="Destination"
      value={value}
      type="text"
      helperText="What URL should we send the user to?"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const IOSDestination = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <TextField
      label="Destination"
      value={value}
      type="text"
      helperText="Please provider the iOS Universal Link you would like to redirect to?"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const AndroidDestination = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <TextField
      label="Destination"
      value={value}
      type="text"
      helperText="Please provider the Android App Link you would like to redirect to?"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
