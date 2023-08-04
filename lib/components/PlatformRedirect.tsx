
export interface PlatformRedirectProps {
  destinations: Array<{ platform: string, value: string }>
}

const PlatformRedirect = ({ destinations }: PlatformRedirectProps) => {

  if (window && Array.isArray(destinations)) {
    const web = destinations.find(dest => dest.platform === "web")
    if (web && web.value) {
      window.location.href = web.value
      return null
    }
  }

  return (
    <>
    </>
  )
}

export default PlatformRedirect
