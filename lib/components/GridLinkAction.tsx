import { GridActionsCellItem, GridActionsCellItemProps } from "@mui/x-data-grid"
import { RefAttributes } from "react"
import NextLink from "next/link"
import { Link } from "@mui/material"

type GridLinkActionProps = { href: string } & GridActionsCellItemProps &
  RefAttributes<HTMLButtonElement>

const GridLinkAction = ({ href, ...props }: GridLinkActionProps) => {
  return (
    <Link component={NextLink} href={href}>
      <GridActionsCellItem {...props} />
    </Link>
  )
}

export default GridLinkAction
