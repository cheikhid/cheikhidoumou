import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import RouteFocus from './RouteFocus.jsx'

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <ScrollProgress />
      <RouteFocus />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
