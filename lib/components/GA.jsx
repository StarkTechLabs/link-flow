import Script from "next/script"

const GA = () => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZS8DH79JJ7"></Script>
      <Script id="ga" defer={false}>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZS8DH79JJ7');
        `}
      </Script>
    </>
  )
}

export default GA
