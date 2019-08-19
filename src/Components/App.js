import React from 'react';
import Welcome from './Welcome';
import '../css/common.css'
import { connect } from "react-redux"
import { getDataThunk as getData } from '../redux/actions/dataActions'
import { closeCard } from '../redux/actions/cards'
import ColumnsContainer from './ColumnsContainer';
import CardContainer from './CardContainer';
import Modal from './Modal';

class App extends React.Component {

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

  updateStorage = (data) => {
    const dataToJson = JSON.stringify(data);
    localStorage.setItem("data", dataToJson);
  }

  componentDidMount() {
    this.props.getData();
    document.addEventListener("keydown", (e) => { this.handleKeyPress(e) });
  }

  render() {
    const { openedCardId, userName } = this.props;
    let modalWindow = null;
    if (openedCardId) {
      modalWindow = <CardContainer />
    }
    if (!userName) {
      return (
        <Modal>
          <Welcome />
        </Modal>
      );
    }
    else {
      return (
        <>
          <ColumnsContainer />
          {modalWindow}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userStore.userName,
    openedCardId: state.cardStore.openedCardId
  }
}

export default connect(
  mapStateToProps,
  { getData, closeCard }
)(App)