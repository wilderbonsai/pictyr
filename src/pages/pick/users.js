import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "components/layout"
import SEO from "components/seo"
import { view } from 'react-easy-state'
import selectedUsers, {addUser, removeUser, removeAllUsers} from 'store/selectedUsers'
import selectedImages, {getUniqueUserIdList, getSortedUserIdList} from 'store/selectedImages'
import fetchByIds from 'util/Users/fetchByIds'
import UserCard from 'components/User/Card'
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import CenterFixedButton from 'components/Button/CenterFixed'
import { Image, Icon } from 'semantic-ui-react'
import Modal from 'components/Modal'
import { teal } from 'const/colors'
import Text from 'components/Text'
import fetchImagesByUserId from 'util/Images/fetchByUserId'
import styled from 'styled-components'
import Masonry from 'components/Masonry'
import selectedFilters from 'store/selectedFilters'

const ModalClose = styled.div`
  background-color:${teal};
    color: white;
  position:fixed;
  top:20px;
  right:20px;

  padding:10px;
  transition: all 0.3s ease-in-out;
  z-index: 100000;
  display: ${({display}) => display ? 'block' : 'none'}
  &:hover{
    cursor:pointer;
     background-color:white;
       color:black;
   

  }
  
`
class SecondPage extends Component {
  state = {
    topPicks:[],
    selectedUser:null,
    selectedUsers:[],
    iframeOpen: false,
    iframeUrl: null,
    modalImages: [],
    modalUser: {}
  }


  show = () => this.setState({ iframeOpen: true })
  onClose = () => this.setState({ iframeOpen: false })

  async componentDidMount() {
    const userIds = getUniqueUserIdList();
    //Get User Details
    const users = await fetchByIds(userIds);

    const pickOrder = getSortedUserIdList();
    let topPicks = []
    console.log(users, 'users')
    console.log(pickOrder, 'order')

    //Populate pick order with user details
    pickOrder.forEach((user) => {

      var result = users.find(obj => {
        console.log(obj, 'obj')
        console.log(user, 'user')
        return obj.externalId === user.id
      })

      let userPick = result;
      userPick.count = user.count
      topPicks.push(userPick)
    })

    this.setState({topPicks:topPicks})

  }

  handleClickUser = (user) => {
    const {selectedUser} = this.state;
    if(selectedUser === user.id) {
      this.setState({selectedUser:''})
      removeUser(user.id)
    } else {
      removeAllUsers()
      addUser(user)
      this.setState({selectedUser:user.id})
    }
  }

  handleDisplayUserCollection = async (e, user) => {
    // e.stopPropagation();
    const images = await fetchImagesByUserId(user.id)
    this.setState({modalImages:images, modalUser:user})
    this.show()
  }
  renderUsers = () => {
    const { topPicks, selectedUser } = this.state;
    const images = selectedImages.images;
    const filterColor = selectedFilters.filters.color;
    const userCards = [];
    topPicks.forEach((user) => {
      const userImages = []
      images.forEach((image) => {
        if(image.userId === user.id) {
          userImages.push(image)
        }
      })
      let selected = false;
      if(selectedUser === user.id) {
        selected = true;
      }

      userCards.push(<UserCard
          user={user}
      />)

    })
    return userCards
  }


  render() {
    const { topPicks, iframeOpen, iframeUrl, modalImages, modalUser} = this.state;
    const {size} = this.props;
    const width = size.width

    let colWidth = '33%';
    if(width < 1100)  colWidth = '33%';
    if(width < 900)  colWidth = '50%';
    if(width < 550)  colWidth = '100%';
    const filterColor = selectedFilters.filters.color;
    const typeText = selectedFilters.filters.type
    return (
        <Layout {...this.props}>
          <SEO title="Page two"/>
          <Container>
            <h1>Your Picks</h1>
            {/*<h5>You have 1 contact pick. Save time and go unlimited for only €0.99. <Text color={teal} underline onClick={()=>{alert('click')}} pointer>Go Unlimited</Text></h5>*/}
            { topPicks.length > 0 &&

            <Masonry
                mobileColumns="1">
              {this.renderUsers()}
            </Masonry>
            }
          </Container>

          <Modal size="medium" open={iframeOpen} onClose={this.onClose}>
            <Masonry
              mobileColumns="1"
            >
              { modalImages.map(image => <Image
                  src={image.url}
              />)}
            </Masonry>
          </Modal>

          <ModalClose display={iframeOpen} onClick={this.onClose}>
            <Icon size="big" name="cancel"/>
          </ModalClose>

          <CenterFixedButton
              color={filterColor}
              to="/pick/contact"
              disabled={selectedUsers.users.length === 0}
              text="Proceed" />

        </Layout>
    )
  }
}

export default view(sizeMe()(SecondPage))
