import "@/styles/globals.css";
import GlobalState from "@/context/GlobalContext";
import { toast, ToastContainer } from 'react-toastify'


export default function App({ Component, pageProps }) {
  return <GlobalState><Component {...pageProps} /> <ToastContainer/></GlobalState>
}
