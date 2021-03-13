export interface ConfigI {
  AUTHED_ROUTES: string[]
  API_ERRORS: apiErrors
}

interface apiErrors {
  [name: string]: string
}

export const config: ConfigI = {
  AUTHED_ROUTES: ["thing"],
  API_ERRORS: {
    UNAUTHORISED: "UNAUTHORISED"
  }
}

