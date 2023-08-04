import { Typography, TextField, Box } from "@mui/material"
import { Public, Android, PhoneIphone } from "@mui/icons-material"

export interface DestinationProps {
  platform: "web" | "ios" | "android"
  value: string
  onChange: (value: string) => void
}

export const Destination = ({ platform, value, onChange }: DestinationProps) => {

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
        <Typography variant="subtitle2">Platform: {platform}</Typography>
        <PlatformIcon />
      </Box>


      {platform === "web" && <Web value={value} onChange={onChange} />}
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
