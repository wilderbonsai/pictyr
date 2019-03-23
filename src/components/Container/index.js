import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
   margin: 0 auto;
    max-width: ${({maxWidth}) =>  maxWidth || "960px;"};
    padding:0px 10px;
    text-align:${({centered}) => centered ? 'center' : 'left'}
    
`;

const Container = (props) => {

  return (
      <Wrapper {...props}>
        {props.children}
      </Wrapper>
  );
};

Container.propTypes = {
  children: PropTypes.object,
};

export default Container;