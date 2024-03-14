export const SignUpResponse = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
}

export const SignUp = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
  },
}

export const SignIn = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
}

export const SignInResponse = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
}

export const SignOutResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
  },
}
