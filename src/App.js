import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('blog');
    this.unsubscribe = null;
    this.state = {
      blog: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const blog = [];
    querySnapshot.forEach((doc) => {
      const { titulo, articulo} = doc.data();
      blog.push({
        key: doc.id,
        doc, // DocumentSnapshot
        titulo,
        articulo,
      });
    });
    this.setState({
      blog
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Blog React FireStone      <i class="fab fa-react"></i>  </h1>

        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
          <div class="panel-body">
            <h1 id="anadir"><Link to="/create"><i  class="fas fa-plus-square"></i></Link></h1>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>titulo</th>
                  <th>articulo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.blog.map(blog =>
                  <tr>
                    <td>{blog.titulo}</td>

                    <td>{blog.articulo}</td>
                    <button type="button" class="btn btn-info">  <Link to={`/show/${blog.key}`}>Ir al Articulo</Link></button>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
