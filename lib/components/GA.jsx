import Script from "next/script"

const GA = () => {
  return (
    <div id="ga">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZS8DH79JJ7"></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZS8DH79JJ7');
        `}
      </Script>
    </div>
  )
}

export default GA
