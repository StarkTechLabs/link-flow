import { Typography, TableCell, TableRow } from "@mui/material"

interface DisplayRowProps {
  label: string
  value?: string
}

const DisplayRow = ({ label, value }: DisplayRowProps): JSX.Element => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle1">{label}</Typography>
    </TableCell>
    <TableCell align="right">{value || ""}</TableCell>
  </TableRow>
)

export default DisplayRow
