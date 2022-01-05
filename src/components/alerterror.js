import React from 'react'

const AlertError = (props) => {
    let cls = (props.error===1)? "alert alert-danger":"alert alert-danger  d-none";
    return (
        <div className={cls}>
            <strong>Thất bại</strong> {props.message}
        </div>
    )
}
export default AlertError;
