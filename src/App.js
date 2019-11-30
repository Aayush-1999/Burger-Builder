import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
  render(){
    return (
      <div>
        <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
