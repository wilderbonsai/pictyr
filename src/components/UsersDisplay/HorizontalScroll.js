import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import styled from 'styled-components'
import { Card } from 'semantic-ui-react'
const Wrapper = styled.div`
&  .menu-item {
  padding: 0 40px;
  margin: 5px 10px;
  user-select: none;
  cursor: pointer;
   outline: none;
  border: none;
}

& .menu-item-wrapper {
   outline: none;
}
&  .menu-item-wrapper.active {
  border: none;
}
& .menu-item.active {
  border: none;
   outline: none;
}

& .scroll-menu-arrow {
  padding: 20px;
  cursor: pointer;
}
`
// list of items
const StyledCard = styled(Card)`
  && {width:auto; margin:10px;}
  
  &&&:hover {
      transform: none;
  }
  
  && img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

`


// One item component
// selected prop will be passed
const MenuItem = ({ text }) => {
  return (
      <div
          className="menu-item"
      >
        {text}
      </div>
  );
};

// All items component
// Important! add unique key
export const Menu = (users) => {
  return users.map(user => {
    return (
        <StyledCard
          header={user.fullName}
          image={user.profileImageUrl}
        />
    );
  });
}


const Arrow = ({ text, className }) => {
  return (
      <div
          className={className}
      >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

class HorizonalScroll extends Component {


  render() {
    const { users } = this.props
    // Create menu from items
    const menu = Menu(users);

    return (
        <Wrapper>
          <ScrollMenu
              data={menu}
              alignCenter={false}
              hideArrows={true}
          />
          </Wrapper>
    );
  }
}

export default HorizonalScroll