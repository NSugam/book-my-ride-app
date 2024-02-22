import React from 'react'

export default function Alerts(props) {
  return (
    <>
    <div className="container col-sm-3 mt-2" style={{height:"20px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} fade show`} role="alert">
        <strong>{props.alert.msg}</strong> </div>}
    </div>
    </>
  )
}
