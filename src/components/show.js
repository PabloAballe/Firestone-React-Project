import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('blog').doc(this.props.match.params.id)
    .get().then((doc) => {
      if (doc) {
        this.setState({
          blog: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No existe el docuemento!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('blog').doc(id).delete().then(() => {
      console.log("Documento borrado");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error al borrar el documento: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Listado de Articulos</Link></h4>
            <h3 class="panel-titulo">
              {this.state.blog.titulo}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Articulo:</dt>
              <dd>{this.state.blog.articulo}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Borrar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
