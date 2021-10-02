import React, { Component } from 'react';

export class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }

    componentDidMount() {
        this.fetchBlogFromApi();
    }

    fetchBlogFromApi() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json,
                    isLoading: false
                });
            });
    }

    render() {
        return (
            <div>
                <h2>My blogs</h2>
                <table>
                    <tr>
                        <td>id</td>
                        <td>userId</td>
                        <td>title</td>
                        <td>body</td>
                    </tr>
                    {this.state.isLoading ? '' : (
                        <tbody>
                            {this.state.data.map(blog => {
                                return (
                                    <tr>
                                        <td>{blog.id}</td>
                                        <td>{blog.userId}</td>
                                        <td>{blog.title}</td>
                                        <td>{blog.body}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        );
    }

}