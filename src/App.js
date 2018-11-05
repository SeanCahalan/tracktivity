import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from "mobx-react"
import { configure } from 'mobx';
import styles from './App.scss';

import Routes from './Routes';
import Store from './Store';

// configure({ enforceActions: true })

class App extends Component {
    constructor(){
        super()
        this.store = new Store()
    }

    componentDidMount(){
        console.log("USER:", this.store.user)
    }

    render() {
        return (
        <div className={styles.App}>
            <Router>
                <Routes store={this.store}/>
            </Router>
        </div>
        );
    }
}

export default observer(App);
