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
import Text from 'components/Text'
import { teal } from 'const/colors'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'

const ImagePickPage = view(({data, size}) => {
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
        <Container>
          <h1>Step 1 of 3.<br/>Pick your favorites.</h1>
          <h6>Displaying work of local photographers in <Text color={teal} underline pointer>Berlin</Text></h6>
        </Container>
        <StackGrid
            columnWidth={colWidth}
        >
          { images.map(image => <SelectableImage
              url={image.url}
              id={image.id}
              userId={image.userId}
          />)
          })}
        </StackGrid>
        <Link to="/user-pick"><CenteredFixedButton disabled={selectedImages.images.length === 0} text="Continue"></CenteredFixedButton></Link>
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

export default sizeMe()(ImagePickPage)
