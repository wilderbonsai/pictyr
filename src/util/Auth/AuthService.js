import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import { navigate } from "gatsby"
import userIsOnboarded from 'util/Users/isOnboarded'
export default class AuthService {
  auth = new auth0.WebAuth({
    audience: 'https://pictyr-development.eu.auth0.com/api/v2/',
    domain:       'pictyr-development.eu.auth0.com',
    clientID:     'xwXDWwE9Mqe1ob1RrFVhgd032SlKvdbK',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:8000/actions/callback',
    scope: 'read:current_user update:current_user_metadata user_link profile'
  });


  instagramLogin (path) {
    localStorage.setItem('authRedirectPath', path)
    this.auth.authorize({
      connection: 'facebook'
    });
  }

  handleAuthentication () {
    if(typeof(localStorage) != "undefined") {
      const redirect = localStorage.getItem('authRedirectPath')

    this.auth.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        //Check to see if user has any app data for pictyr
        const isOnboarded = await userIsOnboarded()
        if(isOnboarded) navigate(redirect);
        else navigate('/onboard/tags')
      } else if (err) {
        navigate(redirect)
      }
    })
    }
  }

  setSession (authResult) {
    localStorage.setItem('userId', authResult.idTokenPayload.sub)
    localStorage.setItem('accessToken',  authResult.accessToken)
    localStorage.setItem('idToken',  authResult.idToken)
    localStorage.setItem('expiredAt',  authResult.expiresIn * 1000 + new Date().getTime())
  }

  renewSession () {
    this.auth.checkSession({}, (err, authResult) => {
      console.log(authResult, 'result')
      console.log(err, 'err')
      if (authResult && authResult.accessToken && authResult.idToken ) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
        //this.logout()
      }
    })
  }

  logout () {
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiredAt')
    localStorage.removeItem('idToken')
    // navigate to the home route
    //router.replace('home')
  }

  getAccessToken () {
    return localStorage.getItem('accessToken')
  }

  getExpiredAt() {
    return localStorage.getItem('expiredAt')
  }

  getIdToken() {
    return localStorage.getItem('idToken')
  }

  getRedirectPath() {
    return localStorage.getItem('authRedirectPath')
  }

  getUserId() {
    return localStorage.getItem('userId')
  }

  isAuthenticated () {
    if(typeof(localStorage) != "undefined") {
      return new Date().getTime() < this.getExpiredAt() && this.getAccessToken()
    }
  }
}


export const getUserId = () => {
  return localStorage.getItem('userId')
}
