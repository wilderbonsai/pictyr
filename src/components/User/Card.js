import React from 'react'
import { Image, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import selectedUsers, {addUser} from 'store/selectedUsers'
import Overlay from 'components/Overlay'
import Card from 'components/Card'
import Button from 'components/Button'
const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
)


const CardButton = styled(Button)`
  &&&& { margin: 0px;
  width: auto;}
`

  const UserCard = ({user, pickedImages, handleClick, selected, handleViewCollection}) => {
  console.log(user.profileImageUrl);
  return (
      <Card fluid onClick={()=>handleClick(user)}>

        <Card.Content>
          <Image floated='left' size='tiny' src={user.profileImageUrl} />
          <Card.Header>{user.fullName}</Card.Header>
          <Card.Meta><a target="_blank" href={user.website} onClick={(e) => {e.stopPropagation()}}>{user.website}</a></Card.Meta>
          <Card.Description>
            {user.bio}
          </Card.Description>

        </Card.Content>
        <Card.Content extra>
          <Icon name='hand point down' />
          {user.count} Picks From You
        </Card.Content>

        <Card.Content extra>
          <Image.Group size='mini'>
          { pickedImages.map(image =>
              <Image src={image.url} />
          )}
            </Image.Group>

        </Card.Content>


        <CardButton
            attached='bottom'
            text='View Entire Collection'
            color="gray"
            onClick={(e)=>{e.stopPropagation();handleViewCollection(e, user)}}
        />
        <CardButton
            attached='bottom'
            text='Contact'
            color="gray"
            onClick={()=>handleClick(user)}
        />

        <Overlay selected={selected}/>
      </Card>

     )
}

export default UserCard