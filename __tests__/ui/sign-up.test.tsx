import { mockDeep } from "jest-mock-extended"

import RootProviders from "@/app/(frontend)/providers"
import SignUpPage from "@/app/(frontend)/sign-up/page"
import { PrismaClient } from "@prisma/client"
import { render } from "@testing-library/react"

import "@testing-library/jest-dom"

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"))
jest.mock("../../src/lib/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouterMock = jest.spyOn(require("next/navigation"), "useRouter")
useRouterMock.mockImplementation(() => ({
  route: "/sign-up",
  pathname: "/sign-up",
  query: "",
  asPath: "/sign-up",
}))

describe("Sign up", () => {
  beforeEach(() => {
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    })
    // Reset the count of calls to the mock function
    useRouterMock.mockClear()
  })

  it('renders "Signup"', () => {
    const { getByText } = render(
      <RootProviders>
        <SignUpPage />
      </RootProviders>
    )

    expect(getByText("Sign up")).toBeInTheDocument()
  })
})
