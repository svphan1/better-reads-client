import React, { Component } from "react";
import "./BookModal.css";
import { Card, Image, Divider, Button } from "semantic-ui-react";

class BookEditModal2 extends Component {
  state = {
    title: "",
    genre: "",
    authors: "",
    description: "",
    coverUrl: ""
  };

  componentDidMount() {
    if (this.props.book) {
      this.setState({
        id: this.props.book.id,
        title: this.props.book.title,
        genre: this.props.book.genre,
        authors: this.props.book.authors,
        description: this.props.book.description,
        coverUrl: this.props.book.coverUrl
      });
    }
  }

  titleListener = e => {
    this.setState({ title: e.target.value });
  };

  genreListener = e => {
    this.setState({ genre: e.target.value });
  };

  authorsListener = e => {
    this.setState({ authors: e.target.value });
  };

  descriptionListener = e => {
    this.setState({ description: e.target.value });
  };

  coverUrlListener = e => {
    this.setState({ coverUrl: e.target.value });
  };

  updateBook = e => {
    e.preventDefault();
    const id = e.target.id;
    fetch(`https://sleepy-dawn-91272.herokuapp.com/books/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        genre: this.state.genre,
        authors: this.state.authors,
        description: this.state.description,
        coverUrl: this.state.coverUrl
      })
    })
      .then(res => res.json())
      .then(this.props.fetchBooks)
      .then(this.props.hideModal);
  };

  render() {
    const { book, hideModal, show, fetchBooks, children } = this.props;

    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";
    const style = {
      cardWidth: {
        width: "50%"
      }
    };

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <Card style={style.cardWidth}>
            <Image
              floated="left"
              size="small"
              src={this.props.book.coverUrl}
              className="authorbook-modal-book"
            />
            <Card.Content>
              <Card.Header className="modal-header">Title</Card.Header>
              <input
                className="input-header-modal"
                value={this.state.title}
                onChange={this.titleListener}
                placeholder="Title"
                id={book.id}
              />
              <Divider />
              <Card.Content>
                <h5>Authors:</h5>
                <input
                  className="input-authors"
                  value={this.state.authors}
                  onChange={this.authorsListener}
                  placeholder="Authors"
                />
                <h5>Genre:</h5>
                <input
                  className="input-body"
                  value={this.state.genre}
                  onChange={this.genreListener}
                  placeholder="Genre"
                />
                <h5>Description:</h5>
                <textarea
                  className="input-body"
                  value={this.state.description}
                  onChange={this.descriptionListener}
                  placeholder="Description"
                />
                <h5>CoverUrl:</h5>
                <input
                  className="input-body"
                  value={this.state.coverUrl}
                  onChange={this.coverUrlListener}
                  placeholder="Cover Url"
                />
              </Card.Content>
            </Card.Content>
            <Card.Content extra>
              <Button className="modal-btn" onClick={hideModal}>
                Close
              </Button>
              <Button
                className="modal-btn"
                id={book.id}
                onClick={this.updateBook}
              >
                Update
              </Button>
            </Card.Content>
          </Card>
        </section>
      </div>
    );
  }
}

export default BookEditModal2;
