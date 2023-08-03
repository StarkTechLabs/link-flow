const config = {
  env: process.env.NODE_ENV,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "test-api-key",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "test.auth.domain",
    projectId: process.env.FIREBASE_PROJECT_ID || "linx-26190",
  },
  firebaseAdmin: {
    projectId: process.env.FIREBASE_PROJECT_ID || "linx-26190",
    // default key is fake
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAwgwPHZNQAyGrw61QT5qaA2MqC4NRoV6GoLT/HahKgVQGXEDK\nLA+1v/egQW4AFR8OsFEWpwDK+ivKdho/T7qhI48Uhi+/7mLA+GchGWMeDONvIuFZ\ne6ZOLS/mMd7F/qg93pWjDB81BhX0cRCtKqf0O2TrEtOZs/xkPraR0op9/Qn93DtO\n96sKZkw1X2Ij2pgGEpioieR4mA+ieQe/BdQ4VXbBUJvIhdYbJcKriiH92gf+8eiA\na9tGC7HzThevPsZ5PwTMIe8yyWjt8UyLEUC8ql0ODrf6sXKIO6VagzQlIrRcGJPt\nj/SkrXGUy/DM1ACApfXg4oJO1zth1Bc0yS6eZQIDAQABAoIBAE1DnfUpxe8pRgpJ\nBTRdG7wDjSc+Z494YuS0jOxTKS9rtIihJ575tmW0hLPox9GhJykfcISYtTl9nEUA\nWHs3lZfiDcsMUkDqQ2nlLnG8XKfHG2ZpEkdAxdoKO39Z875dYR0yudRGzMcakNVA\nTaMxcvb/TPaXGJlpAsVRzqhlipro4GbVoMqK4MvkFXjQ8/5Lpr0ge+z13fC4Q7MU\nFssJIzsKzn4DApdAZaL0JPDBd93nyBNigQo2gqVZJCB8gFhcHjiNFapt4wVxH2+P\nmfovHnukeQWN35N2d+RDWgbvBFHrHARyhk/CHHa+RTpqaDGYjwoi5VqJNAWrLQYL\nb1RV4lUCgYEA80JGvcNHA8507Kw5G1SYkUqxNLicSrAlwt5hJxWz31Ycy2crCH2M\nKtznAabJvjzebN5UjcM225aGgj266KvzwYHknWHCwUkxzh+ghGBTNPlvsIXlTYhk\nODyYQJe1oAhiXF+wlj1WYAstHoi4rKjhloQSHQuFAps0SEsHrPahJXcCgYEAzDXt\n3FIM77K47WVy25R4uJeG/LTI+FN4xq68CkQfdkyRZzkESAy7pqegturJZ3+8IwWr\nyGOP/f8OQFb7DAqrzenPBRJKT7N7iubSmFFEPyLsZb7UaVuoNAyi1UjAJf4U/8GJ\nEaqw589lv6WSN7GLReQk7hkvFuWn5MsCyIYRwgMCgYAITaHWhlzdL2XkUjicyzVt\n+Cu2TfrfvcV8MlUEnYQHQow3ES1x2782E1Y7QzMtsCwzcR9Xu2sa8bdjqLHBkWT/\nnOxtxtF8AYCWtZOoERWmAEGkt91M2TP6i27y/XqwnLimyIlhh3R0UM1Ydng/RIB2\nv8lSfnsqzJtrQExhxgVYHwKBgAx4VpgXopaYkVZd1Y+3F1AeYK3Z1FPltQBc9zqh\nQlKVBmQJRUupC2R35AaHe9kIIdL5q63G9qoKAzLGnPn1RNyEJJIotcT8LtUil0WZ\n4NMCLPFhn9L3N+RFyUPA94raYynjBZ3AkKD3Nz1mvPENtHWGIwMvIoMBbyk3hGn+\nVeNFAoGAKS19IRwHZu9T7hxO/aSX1MJH0aprd7lOO85nTY2hCV4HpobLzn0SPPP9\nppO4CoW1ZnBM+ygaOwecB4WbBbncKqCWzgJ/sIXCU/G0P9SoFf2Pg6C4hrkKiG1L\nF9R8OuuVGO8jzAoTfTzrRXPiDXAE0HPJbsUjLwXtwl+IReiopZ4=\n-----END RSA PRIVATE KEY-----\n",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "test-client-email",
  },
  datastore: {
    basePath:
      process.env.DATASTORE_CONFIG_PATH ||
      "",
  },
}

export default config
