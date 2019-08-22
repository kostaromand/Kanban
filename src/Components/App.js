import React from 'react'
import Welcome from './Welcome'
import '../css/common.css'
import ColumnsContainer from './ColumnsContainer'
import CardContainer from './CardContainer'
import Modal from './Modal'
import { connect } from "react-redux"
import { getDataThunk as getData } from '../redux/reducers/data/actions'
import { closeCard } from '../redux/reducers/cards/actions'
import { getOpenedCardId, getUserName } from '../redux/selectors'
import { bindActionCreators } from 'redux'

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
    userName: getUserName(state),
    openedCardId: getOpenedCardId(state)
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getData,
    closeCard
  },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)