import React, { Component } from 'react';
import InstagramApi from 'instagram-api';
import InstagramLogin from 'react-instagram-login';
import saveImage from 'util/Images/save'
import saveUser from 'util/Users/save'
import Layout from 'components/layout'
import Container from 'components/Container'

class Connect extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      followers: 'N/A',
      posts: 'N/A',
      src: '',
    }
  }


  responseInstagram = async (response) => {
    this.setState({showLogin:false})
    const user = await this.getUserData(response)
    this.getMediaData(response, user.id)

  }

  getUserData = async (access_token) => {
    let instagramAPI = new InstagramApi(access_token);
    let self = this;
    let result = await instagramAPI.userSelf()
    console.log(result)
    const data = result.data
    console.log(data, 'data')
    const user = await saveUser(
        data.id,
        data.full_name,
        data.bio,
        data.profile_picture,
        data.website,
        "test@test.com"
    )
    console.log(user)
    return user;
  }

  getMediaData = async (access_token, userId) => {
    let instagramAPI = new InstagramApi(access_token);
    let self = this
    const igResult = await instagramAPI.userSelfMedia()
    const igData = igResult.data
    igData.forEach(function(data){
      const igUserId = data.user.id
      const igId = data.id
      const url = data.images.standard_resolution.url

        const result =  saveImage(igId, igUserId, userId, url).catch((error)=>{
          console.log(error)
        })
      console.log(result)
    })
  }

  render() {
    const { showLogin, posts, followers, src} = this.state;
    return (
        <Layout>
          <Container>
          <h4>Instagram</h4>
          {showLogin &&
          <InstagramLogin
              clientId="325a9cef43e946a59809ff7eb0742f0e"
              buttonText="Login"
              onSuccess={this.responseInstagram}
              onFailure={this.responseInstagram}
              implicitAuth={true}
          />
          }
          <img src={src} />
            </Container>
        </Layout>
    )
  }
}


export default Connect;
