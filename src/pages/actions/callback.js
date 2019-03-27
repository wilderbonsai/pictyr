import React, { Component } from 'react';
import AuthService from 'util/Auth/AuthService'

class Callback extends Component {

  componentDidMount() {

  }

  render (){
    const Auth = new AuthService();
    Auth.handleAuthentication();
    console.log(Auth)
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
    }

    return (
        <div style={style}>
          Loading
        </div>
    );
  }
}

export default Callback;
