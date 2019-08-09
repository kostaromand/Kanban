import React from 'react';
import Modal from './Modal';
import Welcome from './Welcome';
import '../css/common.css'
import Column from './Column';
import Card from './Card';

const INITIAL_STATE = {
  data: {
    userName: "",
    columns: [
      { title: "TODO", id: 0 },
      { title: "In Progress", id: 1 },
      { title: "Testing", id: 2 },
      { title: "Done", id: 3 }
    ],
    cards: [],
    comments: []
  },
  isCardOpened: false,
  openedCardId: null,
  columnTitleIdEdit: -1
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  getUserName = (userName) => {
    this.setState((prevState) => {
      const data = { ...prevState.data }
      data.userName = userName;
      this.updateStorage(data);
      return { data }
    });
  }

  handleOpenCard = (id) => {
    this.setState({ openedCardId: id, isCardOpened: true })
  }

  handleChangeColumnTitle = (id, newTitle) => {
    if (newTitle.trim() === "") {
      this.setState({ columnTitleIdEdit: -1 })
      return;
    }
    const oldColumn = this.state.data.columns.find(card => card.id === id);
    const newColumn = { ...oldColumn, title: newTitle };
    this.setState((prevState) => {
      const columns = this.state.data.columns.map((column) => {
        if (newColumn.id === column.id)
          return newColumn;
        else
          return column;
      });
      const data = { ...prevState.data, columns }
      this.updateStorage(data);
      return { data, columnTitleIdEdit: -1 }
    });
  }

  handleEditColumnTitle = (id) => {
    this.setState({ columnTitleIdEdit: id })
  }


  addNewCard = (title, columnId) => {
    if (title.trim() === "")
      return;
    const card = {
      title,
      columnId: columnId,
      description: "",
      id: this.state.data.cards.length + 1
    }
    const cards = [...this.state.data.cards, card];
    this.setState((prevState) => {
      const data = { ...prevState.data }
      data.cards = cards;
      this.updateStorage(data);
      return { data }
    });
  }

  changeCard = (changedCard) => {
    if (changedCard.title.trim() === "") {
      return;
    }
    this.setState((prevState) => {
      const cards = this.state.data.cards.map((card) => {
        if (changedCard.id === card.id)
          return changedCard;
        else
          return card;
      });
      const data = { ...prevState.data, cards }
      this.updateStorage(data);
      return { data }
    });
  }
  removeCard = (id) => {
    this.setState((prevState) => {
      const comments = prevState.data.comments.filter((comment) => comment.cardId !== id);
      const cards = prevState.data.cards.filter((card) => card.id !== id);
      const data = { ...prevState.data }
      data.cards = cards;
      data.comments = comments;
      this.updateStorage(data);
      return { data, isCardOpened: false }
    });
  }


  addComment = (cardId, text) => {
    if (text.trim() === "") {
      return;
    }
    const comment = {
      id: this.state.data.comments.length + 1,
      cardId,
      text,
      autor: this.state.data.userName
    }
    const comments = [...this.state.data.comments, comment];
    this.setState((prevState) => {
      const data = { ...prevState.data }
      data.comments = comments;
      this.updateStorage(data);
      return { data }
    });
  }

  changeComment = (id, text) => {
    if (text.trim() === "") {
      return;
    }
    const comment = this.state.data.comments.filter(comment => comment.id === id)[0];
    const changedComment = { ...comment, text }
    this.setState((prevState) => {
      const comments = this.state.data.comments.map((comment) => {
        if (id === comment.id)
          return changedComment;
        else
          return comment;
      });
      const data = { ...prevState.data, comments }
      this.updateStorage(data);
      return { data }
    });
  }

  removeComment = (id) => {
    this.setState((prevState) => {
      const comments = prevState.data.comments.filter((comment) => comment.id !== id);
      const data = { ...prevState.data }
      data.comments = comments;
      this.updateStorage(data);
      return { data }
    });
  }

  handleKeyPress = (event) => {
    if (event.which === 27) {
      this.setState({ isCardOpened: false });
    }
  }

  updateStorage(data) {
    const dataToJson = JSON.stringify(data);
    localStorage.setItem("data", dataToJson);
  }

  componentDidMount() {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.setState({ data });
    }
    document.addEventListener("keydown", (e) => { this.handleKeyPress(e) });
  }

  render() {
    let modalWindow = null;
    if (this.state.isCardOpened) {
      const cardId = this.state.openedCardId;
      const card = this.state.data.cards.find(card => card.id === cardId);
      const columnTitle = this.state.data.columns.filter(col =>col.id === card.columnId)[0].title;
      const comments = this.state.data.comments.filter(comment => {
        return comment.cardId === cardId;
      });
      modalWindow =
        (
          <Modal onClose={() => { this.setState({ isCardOpened: false }) }}>
            <Card
              userName={this.state.data.userName}
              card={card}
              columnTitle = {columnTitle}
              comments={comments}
              onChangeCard={this.changeCard}
              onRemoveCard={this.removeCard}
              onRemoveComment={this.removeComment}
              onAddComment={this.addComment}
              onChangeComment={this.changeComment}
            />
          </Modal>
        )
    }
    if (!this.state.data.userName) {
      return (
        <Modal>
          <Welcome onGetUserName={this.getUserName} />
        </Modal>
      );
    }
    else {
      return (
        <div className="container-fluid">
          <div className="row column-container">
            {
              this.state.data.columns.map(column => {
                const cards = this.state.data.cards.filter(card => {
                  return card.columnId === column.id
                });
                const inEdit = this.state.columnTitleIdEdit === column.id
                return <Column
                  key={column.id}
                  onAddNewCard={this.addNewCard}
                  onOpenCard={this.handleOpenCard}
                  onChangeColumnTitle={this.handleChangeColumnTitle}
                  onEditColumnTitle={this.handleEditColumnTitle}
                  column={column}
                  inEdit={inEdit}
                  comments={this.state.data.comments}
                  cards={cards}
                />
              })
            }
          </div>
          {modalWindow}
        </div>
      );
    }
  }
}