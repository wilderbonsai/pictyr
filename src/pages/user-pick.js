import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { view } from 'react-easy-state'
import selectedUsers, {addUser, removeUser, removeAllUsers} from 'store/selectedUsers'
import selectedImages, {getUniqueUserIdList, getSortedUserIdList} from 'store/selectedImages'
import fetchByIds from 'util/Users/fetchByIds'
import UserCard from 'components/User/Card'
import StackGrid from "react-stack-grid";
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import CenterFixedButton from 'components/Button/CenterFixed'
import { Image, Icon } from 'semantic-ui-react'
import Modal from 'components/Modal'
import { teal } from 'const/colors'
import Text from 'components/Text'
import fetchImagesByUserId from 'util/Images/fetchByUserId'
import styled from 'styled-components'

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
    const users = await fetchByIds(userIds);
    const pickOrder = getSortedUserIdList();
    let topPicks = []
    pickOrder.forEach((user) => {
      var result = users.find(obj => {
        return obj.id === user.id
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
    e.stopPropagation();
    console.log(user, 'user')
    const images = await fetchImagesByUserId(user.id)
    console.log(images)
    console.log(user.id)
    this.setState({modalImages:images, modalUser:user})
    this.show()
  }
  renderUsers = () => {
    const { topPicks, selectedUser } = this.state;
    const images = selectedImages.images;

    const userCards = [];
    topPicks.forEach((user) => {
      const userImages = []
      images.forEach((image) => {
        if(image.userId === user.id) {
          userImages.push(image)
        }
      })
      let selected = false;
      console.log(selectedUser, user.id)
      if(selectedUser === user.id) {
        selected = true;
      }

      userCards.push(<UserCard
          user={user}
          pickedImages={userImages}
          selected={selected}
          handleClick={this.handleClickUser}
          handleViewCollection={this.handleDisplayUserCollection}
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

    return (
      <Layout>
      <SEO title="Page two"/>
        <Container>
        <h1>Step 2 of 3. <br/>Review your photographer picks.</h1>
          <h2>Select who you'd like to contact.</h2>
          <h6>You have 1 contact pick. Save time and go unlimited for only €0.99. <Text color={teal} underline onClick={()=>{alert('click')}} pointer>Go Unlimited</Text></h6>
          { topPicks.length > 0 &&
        <StackGrid columnWidth={colWidth}>
          {this.renderUsers()}

        </StackGrid>
        }
        </Container>

        <Modal size="medium" open={iframeOpen} onClose={this.onClose}>
          <StackGrid
              columnWidth={colWidth}
          >
            { modalImages.map(image => <Image
                src={image.url}
            />)}
          </StackGrid>
        </Modal>

        <ModalClose display={iframeOpen} onClick={this.onClose}>
          <Icon size="big" name="cancel"/>
          </ModalClose>
        <Link to="/contact">
          <CenterFixedButton
              disabled={selectedUsers.users.length === 0}
              text="Proceed" />
        </Link>

    </Layout>
    )
  }
}

export default view(sizeMe()(SecondPage))
