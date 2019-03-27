import React, { Component } from "react"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
import SelectableImage from 'components/Image/Selectable'
import selectedImages from 'store/selectedImages'
import sizeMe from 'react-sizeme';
import CenteredFixedButton from 'components/Button/CenterFixed'
import Container from 'components/Container'
import Text from 'components/Text'
import { teal } from 'const/colors'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import Masonry from 'components/Masonry'
import fetchAll from 'util/Images/fetchAll'
import selectedFilters from 'store/selectedFilters'
class ImagePickPage extends Component {
  state = {
    images : []
  }
  componentDidMount= async ()  =>{
    const images = await fetchAll()
    this.setState({images:images})
  }

  render() {
    const { size } = this.props
    const { images } = this.state
    const width = size.width
    const filterColor = selectedFilters.filters.color
    let colWidth = '25%';
    if(width < 1300)  colWidth = '33%';
    if(width < 900)  colWidth = '50%';
    if(width < 550)  colWidth = '100%';
    return (
        <Layout {...this.props}>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <h1>Step 1 of 3.<br/>Pick your favorites.</h1>
            <h6>Displaying work of local photographers in <Text color={teal} underline pointer>Berlin</Text></h6>
          </Container>
          <Masonry
              gutter="4px">
            { images.map(image => <SelectableImage
                color={filterColor}
                url={image.url}
                id={image.id}
                userId={image.userId}
            />)}
          </Masonry>
          <CenteredFixedButton color={filterColor} to="/pick/users" disabled={selectedImages.images.length === 0} text="Continue"></CenteredFixedButton>
        </Layout>)
  }
}


export default sizeMe()(view(ImagePickPage))
