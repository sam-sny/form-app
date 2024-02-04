import "@/styles/globals.css";
import GlobalState from "@/context/GlobalContext";


export default function App({ Component, pageProps }) {
  return <GlobalState><Component {...pageProps} /></GlobalState>
}
