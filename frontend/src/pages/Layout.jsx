import React from 'react'
import { Navbar } from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
            <div className="column is-2">
                <Sidebar/>
            </div>
            <div className="column has-background-night">
                <main>
                    {children}
                </main>
            </div>
        </div>
    </React.Fragment>
  );
};

export default Layout