import React from 'react'

const Rule = (props) => {
    let rule = '';
    if(props.rule === 0){
        rule = 'Trưởng nhóm';
    }
    if(props.rule === 1){
        rule = 'Phó nhóm';
    }
    
    return (
        <div className="role">{rule}</div>
    )
}

export default Rule;