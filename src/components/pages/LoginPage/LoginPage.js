import React, { Component } from 'react';
import styles from './LoginPage.scss';
import classnames from 'classnames';
import { observer } from "mobx-react"

class LoginPage extends Component{
    constructor(props){
        super();
        this.state = {
            mode: 'signup'
        }
    }

    handleChange = (e) => {
        this.props.store.user[e.target.name] = e.target.value;
    }

    toggleMode = () => {
        let newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({mode: newMode})
    }

    submit = () => {
        if(this.props.mode === 'login'){
            this.props.store.login()
        } else {
            this.props.store.signup()
        }
    }

    render(){
        const {store} = this.props;
        const formClass = classnames(
            "form-row", {'login': this.state.mode === 'login'}
        )
        const explClass = classnames(
            "expl", {'login': this.state.mode === 'login'}
        )
        return(
            <div className={styles.LoginPage}>
                <div className={formClass}>
                    <div className="empty"></div>
                    <div className="form">
                        <h1 className="title">
                            { this.state.mode === 'signup' ? 'Create an Account' : 'Sign in to Tractivity'}
                        </h1>
                        { this.state.mode === 'signup' && 
                            <input 
                                placeholder="Name"
                                name="name"
                                value={store.user.name}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                        }
                        <input 
                            placeholder="Email"
                            name="email"
                            value={store.user.email}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <input 
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={store.user.password}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <div className="btn login"
                            onClick={this.submit}
                        >
                            { this.state.mode === 'signup' ? 'SIGN UP' : 'LOGIN'}
                        </div>
                    </div>
                </div>

                <div className={explClass}>
                    <h1 className="title">
                        { this.state.mode === 'login' ? 'Welcome back!' : 'Join Tractivity!'}
                    </h1>
                    <div className="text">
                        { this.state.mode === 'signup' ? 
                            'Already have an account?' 
                            : 
                            'Don\'t have an account? Sign up to get Started'
                        }
                    </div>
                    <div className="btn login"
                        onClick={this.toggleMode}
                    >
                        { this.state.mode === 'login' ? 'SIGN UP' : 'LOGIN'}
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(LoginPage)