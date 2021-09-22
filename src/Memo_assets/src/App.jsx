import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AddMemo from "./components/add-memo.component";
import MemosList from "./components/memo-list.component";
import Memo from "./components/memo.component";
import MyMemosList from "./components/my-memo-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/memos"} className="navbar-brand">
            Memos
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/my-memos"} className="nav-link">
                My Memos
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/memos"]} component={MemosList} />
            <Route exact path="/add" component={AddMemo} />
            <Route exact path="/my-memos" component={MyMemosList} />
            <Route path="/memo/:id" component={Memo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
