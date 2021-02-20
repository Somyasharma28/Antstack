import { Switch, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Coupons from './Components/Coupons';
import CreateCoupon from './Components/CreateCoupon';
import ApplyCoupon from "./Components/ApplyCoupon";
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <ApplyCoupon />
        </Route>
        <Route exact path="/coupon/add">
          <CreateCoupon />
        </Route>
        <Route exact path="/coupon/">
          <Coupons />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
