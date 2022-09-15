import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = "http://localhost:9000/api/courses"

class App extends Component {
  state = {
    posts: []
  };


  //Connected to the Backend
  //get - get courses from api
  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
    console.log(posts);
  }

  //post - create new course
  handleAdd = async () => {
    const obj =  { id: '4', name: 'Lego course'}
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({posts});
  };

  //put - update course
  handleUpdate = async post => {
    post.name = "UPDATED";
    const { data } = await axios.put(apiEndpoint + '/' + post.id, post);
    
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({ posts});
  };

  handleDelete = async post => {
    await axios.delete(apiEndpoint + '/' + post.id);

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts});
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
