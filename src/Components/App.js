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

  handleKeyPress = (event) => {
    if (event.which === 27) {
      this.props.closeCard();
    }
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