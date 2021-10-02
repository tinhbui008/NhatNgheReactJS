import React, { Component } from 'react'
export default {
    "ten": "Nhất Nghệ", "nam": 2003
}
export class Demo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                Copyright&copy; 2021 {this.props.name}
            </div>
        )
    }
}
export const Hello = ({ name }) => {
    return (
        <div>Hello {name}</div>
    );
}