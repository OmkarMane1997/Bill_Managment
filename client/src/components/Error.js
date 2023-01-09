import React from 'react'
import {NavLink} from 'react-router-dom'

function Error() {
  return (
    <div className="container my-5 ">
    <div className="row">
      <div className="offset-md-4 col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="text-center">
              <h2>Session Expired </h2>
              <h2>Invalid OR</h2>
              <h2>, Login Again..</h2>
              <hr className="mt-0" />
            </div>
           
            <div className="d-flex justify-content-center">
                  <NavLink className="btn btn-success"  to={'/'}>Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Error