import './App.css';
import {Switch , Route} from 'react-router-dom';
import React from 'react';
import routes from './route/route';

//
function App() {
  let listroute = routes.map((el,index)=>{
    return <Route key={`route+${index}`} path={el.path} exact={el.exact} component={el.component} />
  })
  return (
    <div className="App">
      <Switch>
        {listroute}
      </Switch>
    </div>
  );
}

export default App;
