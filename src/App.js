import React, {Component} from 'react';

export default class App extends Component {
    render () {
        return (
            <div className='app'>
                <h1>top ui</h1>
                {this.props.children}
                <h1>top ui</h1>
            </div>
        );
    }
}
