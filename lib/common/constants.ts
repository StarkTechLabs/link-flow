const constants = {
  cookie: {
    authTokenName: "app.auth.token",
    options: {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: true,
      httpOnly: false,
      domain: process.env.NODE_ENV === "production" ? "starktech.dev" : "localhost"
    }
  }
}

export default constants
