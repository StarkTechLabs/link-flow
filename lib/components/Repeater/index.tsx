import { Box, IconButton } from "@mui/material"
import { Add, Delete } from "@mui/icons-material"

export interface RepeaterProps {
  renderChild: (data: unknown, idx: number) => JSX.Element
  items: { id?: string }[]
  onAdd: () => void
  onRemove: (id: string) => void
}

const Repeater = ({ onAdd, onRemove, items, renderChild }: RepeaterProps): JSX.Element => {
  return (
    <>
      {items.map((item: { id?: string }, idx: number) => (
        <Box key={item.id} m={1} display="flex" alignItems="center">
          {renderChild(item, idx)}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => onRemove(item.id || "")}>
              <Delete color="warning" />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onAdd}>
          <Add color="primary" />
        </IconButton>
      </Box>
    </>
  )
}

export default Repeater
