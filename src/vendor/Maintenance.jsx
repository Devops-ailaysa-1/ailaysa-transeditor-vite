import React from 'react'
import AilaysaLogo from '../assets/images/maintenance/ailaysa-logo.svg'

export const Maintenance = () => {
  return (
    <div className="main-section">
        <img id="ailaysa-logo" src={AilaysaLogo} alt="ailaysa logo" />
        <h1 className="heading">The site is currently down <br /> for maintenance</h1>
        <p>{`We'll be back up and running again shortly. If you need, you can always contact us on`} <a href="mailto:support@ailaysa.com">support@ailaysa.com</a></p>
        <img id="wire-connection-img" src="assets/images/maintenance/connection-pic.svg" alt="wire connection" />
    </div>
  )
}
