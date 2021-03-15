import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import rentals from "./components/rentals";
import notFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";
import movieForm from "./components/movieForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar />
          <Switch>
            <Route path="/movies/:id" component={movieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={rentals} />
            <Route path="/not-found" component={notFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
