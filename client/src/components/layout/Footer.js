import React, { Fragment } from 'react'

const Footer = () => {

  const currentDate = new Date()
  const year = currentDate.getFullYear()

    return (
        <Fragment>
            <footer className="py-1">
                <p className="text-center mt-1">
                &copy; {year}, All Rights Reserved
                </p>
            </footer>
        </Fragment>
    )
}

export default Footer