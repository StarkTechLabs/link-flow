import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

import pkg from "@/package.json"

const Footer = (): JSX.Element => {
  return (
    <footer>
      <Box
        m={0}
        p={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1" component="p">
          by Stark Tech
        </Typography>
        <Typography variant="subtitle2" component="p">
          All Rights Reserved
        </Typography>
        <br />
        <Typography variant="subtitle2" component="p">
          <Link href="mailto:michael@starktech.dev">michael@starktech.dev</Link>
        </Typography>
        <br />
        <Typography variant="subtitle2" component="p">
          Version: {pkg.version}
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
