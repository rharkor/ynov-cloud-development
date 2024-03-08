import UIProvider from "./ui-provider"

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>
}
