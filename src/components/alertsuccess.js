import React from 'react'

const AlertSuccess = (props) => {
    let cls = (props.success===1)? "alert alert-success":"alert alert-success  d-none";
    return (
        <div className={cls}>
            <strong>Thành Công</strong> {props.message}
        </div>
    )
}
export default AlertSuccess;
