import { AuthProvaider } from "context/auth/authContext"
import { RequireAuth } from "context/auth/requireAuth"
import type { AppProps } from "next/app"
import "styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvaider>
      <Component {...pageProps} />
    </AuthProvaider>
  )
}
