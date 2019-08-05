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
    this.handleColumnTitleEdit = this.handleColumnTitleEdit.bind(this);
    this.handleGetUserName = this.handleGetUserName.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleOpenCard = this.handleOpenCard.bind(this);
    this.handleChangeCardTitle = this.handleChangeCardTitle.bind(this);
    this.handleChangeColumnTitle = this.handleChangeColumnTitle.bind(this);
  }

  handleChangeColumnTitle(id, newTitle) {
    if (newTitle === "") {
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
  handleChangeCardTitle(id, newTitle) {
    const oldCard = this.state.data.cards.find(card => card.id === id);
    const newCard = { ...oldCard, title: newTitle };
    this.setState((prevState) => {
      const cards = this.state.data.cards.map((card) => {
        if (newCard.id === card.id)
          return newCard;
        else
          return card;
      });
      const data = { ...prevState.data, cards }
      const dataToJSON = JSON.stringify(data);
      localStorage.setItem("data", dataToJSON);
      return { data }
    });
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

  handleAddNewCard(card) {
    if (card.title === "")
      return;
    const newCard = { ...card, id: this.state.data.cards.length + 1 };
    const cards = [...this.state.data.cards, newCard];
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

  handleColumnTitleEdit(id) {
    this.setState({ columnTitleIdEdit: id })
  }

  componentDidMount() {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.setState({ data });
    }
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
          <Modal>
            <Card
              card={card}
              comments={comments}
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
                onColumnTitleEdit={this.handleColumnTitleEdit}
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