import React from "react"
import { Link } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
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
import { teal } from 'const/colors'



const Landing = styled.div`
  color: white;
  margin-top:${({mobile}) => mobile ? '20px' : '30px'}
  
  font-size:${({mobile}) => mobile ? '20px' : '30px'}
    line-height:${({mobile}) => mobile ? '30px' : '40px'}
    
`


const Teal = styled.span`
  color: ${teal};
`
const  options = ["Event", "Wedding", "Portait", "Art", "Product", "Food"].map(function(fruit){
  return {label: fruit, value: fruit}
});

const ContentMargin = styled.div`
  margin-bottom:50px;
`

const IndexPage = view(({data, size}) => {
  const width = size.width
  let colWidth = '25%';
  if (width < 1300)  colWidth = '33%';
  if (width < 900)  colWidth = '50%';
  if (width < 550)  colWidth = '100%';
  return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>

        <Landing mobile={(width < 550)}>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
                <h1>Congrats!</h1><h2> Your message has been delivered!</h2>
                If you have any questions while waiting for a response, feel free to reach out to us at <Teal>hello@pictyr.com</Teal>
              </Grid.Column>
            </Grid>
          </Container>
        </Landing>
      </Layout>
  )
})

export default sizeMe()(IndexPage)
