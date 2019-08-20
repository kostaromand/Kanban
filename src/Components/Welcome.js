import React from 'react'
import '../css/common.css'
import InputButton from './InputButton';
import { connect } from 'react-redux'
import { setUserNameThunk as setUserName } from '../redux/reducers/user/actions';
import { bindActionCreators } from 'redux'
function Welcome({ setUserName }) {
    return (
        <div className="welcome-container">
            Введите Ваше имя:
            <div className="name-input">
                <InputButton onGetValue={setUserName} buttonText="Продолжить" />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setUserName
    },
        dispatch
    );



export default connect(
    null,
    mapDispatchToProps
)(Welcome);