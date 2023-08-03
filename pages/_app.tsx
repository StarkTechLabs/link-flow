import type { AppProps } from "next/app"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"

import BusProvider from "@/lib/components/BusProvider/BusProvider"
import Notification from "@/lib/components/Notification/Notification"
import Header from "@/lib/components/Header/Header"
import Footer from "@/lib/components/Footer/Footer"
import theme from "@/lib/common/theme"

export default function App({ Component, pageProps }: AppProps) {
  const embed = pageProps && pageProps.shouldEmbed === true
  const user = pageProps && pageProps.user

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BusProvider>
        <div className="app-container">
          {!embed && <Header title="Linx" user={user} />}
          <Container disableGutters maxWidth="xl">
            <Component {...pageProps} />
          </Container>
          {!embed && <Footer />}
          <Notification />
        </div>
      </BusProvider>
    </ThemeProvider>
  )
}
