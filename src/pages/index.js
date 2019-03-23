import React from "react"
import { Link } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "../components/layout"
import SEO from "../components/seo"
import StackGrid from "react-stack-grid";
import SelectableImage from 'components/Image/Selectable'
import selectedImages from 'store/selectedImages'
import sizeMe from 'react-sizeme';
import CenteredFixedButton from 'components/Button/CenterFixed'
import Container from 'components/Container'
import { Select, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import Button from 'components/Button'
import { SimpleSelect } from 'react-selectize'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'

const Landing = styled.div`
  color: white;
  margin-top:${({mobile}) => mobile ? '80px' : '60px'}
  
  font-size:${({mobile}) => mobile ? '40px' : '60px'}
    line-height:${({mobile}) => mobile ? '40px' : '60px'}
    
`

const StyledSelect = styled(SimpleSelect)`

  margin: 20px 0px;
  color: #00b5ad !important;
  &&&  .react-selectize {
    color: teal !important; 
    height:auto;
    text-indent: 0px;

  }
  
  &&&   {
    width:100%;
  }
  
  &&&& .react-selectize-placeholder {
    line-height:${({mobile}) => mobile ? '60px' : '90px'}
    color: #00b5ad !important;
    text-indent: 0px;
  }
  
  &&&& .react-selectize-control  {
        border-bottom: 2px solid rgba(255,255,255, 0.4);
  }
  
  &&&& .react-selectize-toggle-button-container, &&& .react-selectize-reset-button-container {
    margin-top:40px;
  }
  
  
  

`
const  options = ["Event", "Wedding", "Portait", "Art", "Product", "Food"].map(function(fruit){
  return {label: fruit, value: fruit}
});

const ContentMargin = styled.div`
  margin-bottom:50px;
`
const IndexPage = view(({data, size}) => {
  const width = size.width
  const images = data.images.allImages
  console.log(selectedImages.images.length)
  let colWidth = '25%';
  if(width < 1300)  colWidth = '33%';
  if(width < 900)  colWidth = '50%';
  if(width < 550)  colWidth = '100%';
  return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>

        <Landing mobile={(width < 550)}>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
              <ContentMargin>
                Discover your <StyledSelect
                    options = {options}
                    mobile={(width < 550)}
                    placeholder = "Ideal"
                    theme = "material" // can be one of "default" | "bootstrap3" | "material" | ...
                    transitionEnter = {true}
                    style={{color:'white'}}

                />
                Photographer.
              </ContentMargin>
              <Link to="/image-pick"><Button fluid text="Let's Go" /></Link></Grid.Column>
            </Grid>
          </Container>
        </Landing>
       </Layout>
  )

})

export const query = graphql`
{
	images {
    allImages {
      url,
      id,
      userId
    }
  }
}
`;

export default sizeMe()(IndexPage)
