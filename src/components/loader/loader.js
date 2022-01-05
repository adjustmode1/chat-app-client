import React from 'react';
import './loader.scss';

const Loader = (props) => {
    let cls = props.turnon? {'display':'block'}:{'display':'none'};
    return (
        <div className='contain-loader' style={cls} >
		    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>	
	    </div>
    )
}

export default Loader;
