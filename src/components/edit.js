import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      titulo: '',
      articulo: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('blog').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const blog = doc.data();
        this.setState({
          key: doc.id,
          titulo: blog.titulo,
          articulo: blog.articulo
        });
      } else {
        console.log("No existe el documento!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({blog:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { titulo, articulo} = this.state;

    const updateRef = firebase.firestore().collection('blog').doc(this.state.key);
    updateRef.set({
      titulo,
      articulo
    }).then((docRef) => {
      this.setState({
        key: '',
        titulo: '',
        articulo: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error al actualizar el docuemnto: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-titulo">
        Editar Blog
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Lista de Articulos</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="titulo">Titulo:</label>
                <input type="text" class="form-control" name="titulo" value={this.state.titulo} onChange={this.onChange} placeholder="titulo" />
              </div>
              <div class="form-group">
                <label for="articulo">Articulo:</label>
                <input type="text" class="form-control" name="articulo" value={this.state.articulo} onChange={this.onChange} placeholder="articulo" />
              </div>

              <button type="submit" class="btn btn-success">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
