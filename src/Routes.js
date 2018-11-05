import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react"

import PageWrapper from "./components/layout/PageWrapper/PageWrapper";

import LoginPage from "./components/pages/LoginPage/LoginPage";
import Dashboard from "./components/pages/Dashboard/Dashboard";

class Routes extends Component {
    render() {

        console.log(this.props.store.user)
    
        const privateRoutes = [
            { path: "/dashboard", component: Dashboard },
        ];

        let pageRoutes = [];

        pageRoutes.push(<Route key="/" exact path="/" render={props => <LoginPage store={this.props.store}/>} />);
        //add redirect to referrer later https://reacttraining.com/react-router/web/example/auth-workflow
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    this.props.user ? (
                        <Component store={this.props.store} {...props} history={this.props.history}/>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );

        privateRoutes.forEach(route => {
            pageRoutes.push(
                <PrivateRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                />
            );
        });

        return (
            <div style={{ height: "100%", width: "100%" }}>
                <PageWrapper history={this.props.history}>
                    <Switch>{pageRoutes}</Switch>
                </PageWrapper>
            </div>
        );
    }
}

export default observer(Routes);
