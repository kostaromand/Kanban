import React from 'react';
import Modal from './Modal';
import Welcome from './Welcome';
import '../css/common.css'
import Column from './Column';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      columns: [
        { name: "TODO", id: 0 },
        { name: "In Progress", id: 1 },
        { name: "Testing", id: 2 },
        { name: "Done", id: 3 }
      ],
      cards: [],
      comments: []
    }
    this.getUserName = this.getUserName.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
  }

  getUserName(userName) {
    const data = JSON.stringify({ ...this.state, userName });
    localStorage.setItem("data", data);
    this.setState({ userName });
  }

  handleAddNewCard(card) {
    const newCard = { ...card, id: this.state.cards.length + 1 };
    const cards = [...this.state.cards, newCard];
    const data = JSON.stringify({ ...this.state, cards });
    localStorage.setItem("data", data);
    this.setState({cards});
  }
  
  componentDidMount() {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.setState({ ...data });
    }
  }

  render() {
    if (!this.state.userName) {
      return (
        <div>
          <Modal>
            <Welcome getUserName={this.getUserName} />
          </Modal>
        </div>
      );
    }
    else {
      return (
        <div className="flex-row">
          {
            this.state.columns.map(column => {
              const cards = this.state.cards.filter(card => {
                return card.columnId === column.id
              });
              return <Column
                key={column.id}
                addnewCard={this.handleAddNewCard}
                columnInfo={column}
                cards={cards} />
            })
          }
        </div>
      );
    }
  }
}