import React from 'react';
import Popular from './Popular';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import { Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route
              render={() => {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
