import { mockDeep } from "jest-mock-extended"

import ClientProtect from "@/app/(frontend)/(protected)/client-protect"
import Home from "@/app/(frontend)/(protected)/page"
import RootProviders from "@/app/(frontend)/providers"
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
  route: "/",
  pathname: "/",
  query: "",
  asPath: "/",
}))

describe("Index", () => {
  beforeEach(() => {
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    })
    // Reset the count of calls to the mock function
    useRouterMock.mockClear()
  })

  it("redirects to sign-in page if user is not authenticated", () => {
    render(
      <RootProviders>
        <ClientProtect />
        <Home />
      </RootProviders>
    )

    expect(useRouterMock.mock.results[0].value.push).toHaveBeenCalledWith("/sign-in")
  })

  it("renders the home page if user is authenticated", () => {
    // Mock cookies
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value:
        "token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlkIjoiNjVmMmQyMzFiY2U2NTVhNjJjY2FhYjBlIiwibmFtZSI6IkxvdWlzIn0sImV4cCI6MTcxMTA5NDcyMDM5Mywic2lkIjoiNjVmNDAxNDBiODdhNDRmY2VjZGNlN2Q3In0.Fuowq6b4qqlhio0bSXjAMBL7dz0Y_hKcUvjdafQUYwA",
    })

    render(
      <RootProviders>
        <ClientProtect />
        <Home />
      </RootProviders>
    )

    expect(useRouterMock.mock.results[0].value.push).toHaveBeenCalledTimes(0)
  })

  it('renders "Popular movies"', () => {
    const { getByText } = render(
      <RootProviders>
        <ClientProtect />
        <Home />
      </RootProviders>
    )

    expect(getByText("Popular movies")).toBeInTheDocument()
  })
})
