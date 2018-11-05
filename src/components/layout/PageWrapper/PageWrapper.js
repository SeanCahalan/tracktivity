import React, { Component } from 'react'
import styles from './PageWrapper.scss';

export default class PageWrapper extends Component {
    render(){
        return(
            <div className={styles.PageWrapper}>
                {this.props.children}
            </div>
        )
    }
}