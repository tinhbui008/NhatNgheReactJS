import React, { Component } from 'react';
import { Home } from './Home';
import { DemoPage } from './Demo';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            dem: 0
        };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    tangDem() {
        this.setState({
            dem: this.state.dem + 2
        });
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
                <h3>Đếm: {this.state.dem}</h3>
                <button className="btn btn-success" onClick={() => this.tangDem()}>Tăng đếm</button>

                <Home />
                <DemoPage />
            </div>
        );
    }
}
