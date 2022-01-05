import React from 'react';
import Selector from './selector';

const BlackList = (props) => {
    let se = props.list.map((el,index)=>{
        return <Selector key={`selectormessages${index}`} path="listfriends" gmail={el.gmail} rule={el.rule} room={el.id_group} name={el.name}/>
    })
    return (
        <div>
            {se}
        </div>
    )
}

export default BlackList;
