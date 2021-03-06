import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store/store'

import Header from '../components/Header'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
