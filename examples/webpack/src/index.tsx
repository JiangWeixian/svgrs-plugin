import { createRoot } from 'react-dom/client'

import App from './App'

const $ROOT = document.querySelector('#app')
const root = createRoot($ROOT)

const renderApp = (Component: any) => {
  root.render(
    <Component />,
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})
