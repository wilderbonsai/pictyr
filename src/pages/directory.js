import React, { Component } from "react"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import { teal } from 'const/colors'
import TagInput from 'components/TagInput'
import UserCard from 'components/User/Card'
import Masonry from 'components/Masonry'
import fetchUsersByTags from 'util/Users/fetchByTags'
import fetchAllUsers from 'util/Users/fetchAll'
import { Loader, Label} from 'semantic-ui-react'
import TagDisplayModal from 'components/Modal/TagDisplay'
class Directory extends Component {
  state = {
    users: [],
    tagIds: [],
    loading: true,
    modalTags: [],
    tagModalOpen: false,
    tagModalHeader: ''
  }

  componentDidMount= async ()  =>{

    const users = await fetchAllUsers()
    this.setState({users, loading: false})

  }


  renderUsers = () => {
    const { users, tagIds} = this.state;
    const userCards = []
    users.forEach((user) => {
      console.log(user)
      const relevantTagNames = this.getRelevantTagsForUser(user)
      userCards.push(<UserCard
          user={user}
          relevantTagNames={relevantTagNames}
          handleViewTags={(e,user)=> {
            const tags = user.tags;
            const modalTags = tags.map(tag => tag.key)
            this.setState({
              tagModalHeader: `Tags for ${user.fullName}`,
              modalTags,
              tagModalOpen: true})
          }}
      />)
    })
    return userCards

  }

  getRelevantTagsForUser(user) {
    const { tagIds } = this.state
    let relevantTags = []
    if(tagIds.length > 0) {
      console.log('hasTags')
      const userTags = user.tags
      const userTagIds = userTags.map(tag => tag.id)
       relevantTags = userTags.filter((tag) => {
        return tagIds.includes(tag.id)
      })
    } else {
       relevantTags = user.tags
    }

    const relevantTagNames = relevantTags.map(tag => tag.key)
    return relevantTagNames

  }

  handleTagChange = async (tagIds) => {
    const isRemoving = tagIds.length < this.state.tagIds.length
    await this.setState({tagIds})
    if(isRemoving) {
      this.handleUsersUpdate()
    }
  }


  handleUsersUpdate = async () => {
    const { tagIds } = this.state
    this.setState({loading:true})
    if(!tagIds || tagIds.length === 0) {
      const users = await fetchAllUsers()
      this.setState({users, loading: false})
    } else {
      this.updateUsersByTags()
    }
  }

  updateUsersByTags = async () => {
    const { tagIds } = this.state
    const users = await fetchUsersByTags(tagIds)
    this.setState({users, loading: false})
  }

  render() {
    const { loading, tagModalOpen, modalTags, tagModalHeader } = this.state
    return (
        <Layout {...this.props}>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <TagInput
              placeholder="Search people by specific tags"
              handleChange={this.handleTagChange}
              sideButton={true}
              allowCreate={false}
              handleClose={this.handleUsersUpdate}
                  />
            <Loader active={loading} />
            {!loading &&
            <Masonry
                mobileColumns="1">
              {this.renderUsers()}
            </Masonry>
            }
          </Container>

          <TagDisplayModal
              headerText={tagModalHeader}
              tags={modalTags}
              modalOpen={tagModalOpen}
              onClose={()=>{this.setState({tagModalOpen:false})}}
              />
        </Layout>)
  }
}


export default sizeMe()(view(Directory))
