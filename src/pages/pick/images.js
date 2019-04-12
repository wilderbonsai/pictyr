// import React, { Component } from "react"
// import { view } from 'react-easy-state'
// import Layout from "components/layout"
// import SEO from "components/seo"
// import SelectableImage from 'components/Image/Selectable'
// import selectedImages from 'store/selectedImages'
// import sizeMe from 'react-sizeme';
// import CenteredFixedButton from 'components/Button/CenterFixed'
// import Container from 'components/Container'
// import Text from 'componeselectedImagests/Text'
// import { teal } from 'const/colors'
// import  Button  from 'components/Button'
// import 'react-selectize/dist/index.min.css'
// import 'react-selectize/themes/index.css'
// import Masonry from 'components/Masonry'
// import fetchAll from 'util/Images/fetchAll'
// import selectedFilters from 'store/selectedFilters'
// import styled from 'styled-components'
// import { Icon } from 'semantic-ui-react'
// import Modal from 'components/Modal'
// import { Modal as SuiModal, Dropdown} from 'semantic-ui-react'
// import dummyTags from 'const/dummyTags'
// const FixedButton = styled(Button)`
//   position:fixed;
//   &&&&&& { background-color: black !important;}
//   top: 10px;
//   right: 10px;
//   z-index:100;
// `
// class ImagePickPage extends Component {
//   state = {
//     images : [],
//     filterModalOpen: false
//   }
//   componentDidMount= async ()  =>{
//     const images = await fetchAll()
//     this.setState({images:images})
//   }
//
//   render() {
//     const { size } = this.props
//     const { images, filterModalOpen } = this.state
//     const width = size.width
//     const filterColor = selectedFilters.filters.color
//     let colWidth = '25%';
//     if(width < 1300)  colWidth = '33%';
//     if(width < 900)  colWidth = '50%';
//     if(width < 550)  colWidth = '100%';
//     return (
//         <Layout {...this.props}>
//           <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
//           <Container>
//             <h1>Pick your favorites.</h1>
//             <h6>Displaying photos of local eats in <Text color={teal} underline pointer>Berlin</Text></h6>
//           </Container>
//           <Masonry
//               gutter="4px">
//             { images.map(image => <SelectableImage
//                 color={filterColor}
//                 url={image.url}
//                 id={image.id}
//                 userId={image.userId}
//             />)}
//           </Masonry>
//           <FixedButton onClick={()=>{this.setState({filterModalOpen:!filterModalOpen})}} inverted size="large" icon='options'><Icon name='options' /> Filters</FixedButton>
//           <CenteredFixedButton color={filterColor} to="/pick/users" disabled={selectedImages.images.length === 0} text="Continue"></CenteredFixedButton>
//           <Modal open={filterModalOpen} size="medium" closeIcon onClose={()=>{this.setState({filterModalOpen: false})}} >
//             <SuiModal.Content scrolling>
//
//               <SuiModal.Description>
//                 <h2>Tags</h2>
//                 <h6>Select and search for as many tags</h6>
//                 <Dropdown
//                     size="large"
//                     placeholder='Tags'
//                     fluid
//                     multiple
//                     search
//                     selection
//                     options={dummyTags}
//                 />
//                 <h2>Distance</h2>
//                 <h2>Price</h2>
//
//               </SuiModal.Description>
//             </SuiModal.Content>
//             <SuiModal.Actions>
//               <Button basic inverted>
//                 <Icon name='checkmark' /> Apply
//               </Button>
//             </SuiModal.Actions>
//           </Modal>
//         </Layout>)
//   }
// }
//
//
// export default sizeMe()(view(ImagePickPage))
