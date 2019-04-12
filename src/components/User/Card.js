import React from 'react'
import { Image, Label, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import selectedUsers, {addUser} from 'store/selectedUsers'
import Overlay from 'components/Overlay'
import Card from 'components/Card'
import Button from 'components/Button'

const CardButton = styled(Button)`
  &&&& { margin: 0px;
  width: auto;}
`

  const UserCard = ({user, relevantTagNames, handleClick, selected, handleViewTags, overlayColor}) => {

  return (
      <Card fluid>
        <Card.Content>
          <Image floated='left' size='mini' src={user.profileImageUrl} />
          <Card.Header>{user.fullName}</Card.Header>
          <Card.Meta><a target="_blank" href={user.website} onClick={(e) => {e.stopPropagation()}}>{user.website}</a></Card.Meta>
          <Card.Description>
            {relevantTagNames && relevantTagNames.map((tag) => {
              return (
                  <Label basic>
                    {tag}
                  </Label>

              )
            }) }
            <Label onClick={(e) => handleViewTags(e, user)}>See All Tags</Label>

          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' /> 0 mutual friends
        </Card.Content>
        <CardButton
            attached='bottom'
            text='View All Tags'
            color="gray"
            onClick={(e)=>{handleViewTags(e, user)}}
        />
        <CardButton
            attached='bottom'
            text='Connect'
            color="gray"
            onClick={()=>{if(handleClick) handleClick(user)}}
        />

        <Overlay color={overlayColor} selected={selected}/>
      </Card>

     )
}

export default UserCard