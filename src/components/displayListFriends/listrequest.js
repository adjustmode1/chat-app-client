import React from 'react';
import SelectorRequest from './selectorrequest';

const ListRequest = (props) => {
    let se = props.list.map((el,index)=>{
        return (
            <SelectorRequest key={`selectormessages${index}`} gmail={el.gmail} name={el.name}/>
        )
    })
    return (
        <div>
            {se}
        </div>
    )
}

export default ListRequest;
