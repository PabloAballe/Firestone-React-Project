import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../firebase';
import { Link } from 'react-router-dom';


class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('blog');
    this.state = {
      titulo: '',
      articulo: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { titulo, articulo} = this.state;

    this.ref.add({
      titulo,
      articulo
    }).then((docRef) => {
      this.setState({
        titulo: '',
        articulo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error al añadir el docuemento: ", error);
    });
  }

  render() {
    const { titulo, articulo} = this.state;
    return (

      <div class="container">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">
                Añadir Articulo
                  </h3>
                </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Lista de Articulos</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="titulo">Titulo:</label>
                <input type="text" class="form-control" name="titulo" value={titulo} onChange={this.onChange} placeholder="titulo" />
              </div>
              <div class="form-group">
                <label for="articulo">Articulo:</label>
                <textArea class="form-control" name="articulo" onChange={this.onChange} placeholder="articulo" cols="80" rows="3">{articulo}</textArea>
              </div>

              <button type="submit" class="btn btn-success">Añadir</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
