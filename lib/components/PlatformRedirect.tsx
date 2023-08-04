
export interface PlatformRedirectProps {
  destinations: Array<{ platform: string, value: string }>
}

const PlatformRedirect = ({ destinations }: PlatformRedirectProps) => {
  if (navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
    console.log("on iOS")
    const dest = destinations.find(dest => dest.platform === "ios")
    window.location.href = dest?.value || "#"
    return
  }

  if (navigator && /Android/i.test(navigator.userAgent)) {
    console.log("on Android")
    const dest = destinations.find(dest => dest.platform === "android")
    window.location.href = dest?.value || "#"
    return
  }

  if (window && Array.isArray(destinations)) {
    console.log("on web")
    const web = destinations.find(dest => dest.platform === "web")
    if (web && web.value) {
      window.location.href = web.value || "#"
      return null
    }
  }

  return (
    <>
    </>
  )
}

export default PlatformRedirect
