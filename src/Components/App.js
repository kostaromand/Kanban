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
    this.handleEditColumnTitle = this.handleEditColumnTitle.bind(this);
    this.handleGetUserName = this.handleGetUserName.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleOpenCard = this.handleOpenCard.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this);
    this.handleChangeColumnTitle = this.handleChangeColumnTitle.bind(this);
  }

  handleChangeColumnTitle(id, newTitle) {
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
      const dataToJSON = JSON.stringify(data);
      localStorage.setItem("data", dataToJSON);
      return { data, columnTitleIdEdit: -1 }
    });
  }
  handleChangeCard(changedCard) {
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
      const dataToJSON = JSON.stringify(data);
      localStorage.setItem("data", dataToJSON);
      return { data }
    });
  }

  handleEditColumnTitle(id) {
    this.setState({ columnTitleIdEdit: id })
  }

  handleGetUserName(userName) {
    this.setState((prevState) => {
      const data = { ...prevState.data }
      data.userName = userName;
      const dataToJson = JSON.stringify(data);
      localStorage.setItem("data", dataToJson);
      return { data }
    });
  }

  handleAddNewCard(title, columnId) {
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
      const dataToJson = JSON.stringify(data);
      localStorage.setItem("data", dataToJson);
      return { data }
    });
  }

  handleOpenCard(id) {
    this.setState({ openedCardId: id, isCardOpened: true })
  }

  handleKeyPress(event) {
    if (event.which === 27) {
      this.setState({ isCardOpened: false });
    }
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
      const comments = this.state.data.comments.filter(comment => {
        return comment.cardId === cardId;
      });
      modalWindow =
        (
          <Modal onClose={() => { this.setState({ isCardOpened: false }) }}>
            <Card
              card={card}
              comments={comments}
              onChangeCard={this.handleChangeCard}
            />
          </Modal>
        )
    }
    if (!this.state.data.userName) {
      return (
        <Modal>
          <Welcome onGetUserName={this.handleGetUserName} />
        </Modal>
      );
    }
    else {
      return (
        <div className="flex-row column-container">
          {
            this.state.data.columns.map(column => {
              const cards = this.state.data.cards.filter(card => {
                return card.columnId === column.id
              });
              const inEdit = this.state.columnTitleIdEdit === column.id ? true : false;
              return <Column
                key={column.id}
                onAddNewCard={this.handleAddNewCard}
                onOpenCard={this.handleOpenCard}
                onChangeColumnTitle={this.handleChangeColumnTitle}
                onEditColumnTitle={this.handleEditColumnTitle}
                column={column}
                inEdit={inEdit}
                cards={cards} />
            })
          }
          {modalWindow}
        </div>
      );
    }
  }
}