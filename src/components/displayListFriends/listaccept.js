import React from 'react';
import SelectorAccept from './selectoraccept';

const ListAccept = (props) => {
    let se = props.list.map((el,index)=>{
        return <SelectorAccept key={`selectormessages${index}`} gmail={el.gmail} name={el.name}/>
    })
    return (
        <div>
            {se}
        </div>
    )
}

export default ListAccept;
