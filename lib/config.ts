export interface Config {
  AUTHED_ROUTES: string[]
  API_ERRORS: apiErrors
}

interface apiErrors {
  [name: string]: string
}

export const values: Config = {
  AUTHED_ROUTES: ["thing"],
  API_ERRORS: {
    UNAUTHORISED: "UNAUTHORISED"
  }
}

