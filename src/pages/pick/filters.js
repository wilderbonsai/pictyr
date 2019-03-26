import React, { Component } from "react"
import { Link } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import { teal, violet } from 'const/colors'
import { Grid, Button as SuiButton, Modal, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import selectedFilters, {MODEL, toggleGender} from 'store/selectedFilters'
import CenterFixedButton from 'components/Button/CenterFixed'
import Button from 'components/Button'
import ToggleButton from 'components/Button/Toggle'
const PAY = 'pay'
const TFP = 'tfp'

const StyledButton = styled(Button)`
  &&&&&&:hover {
     box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff!important;
  }
`

class FilterPage extends Component {
  state = {
    arrangement: 'pay',
    joinModalOpen: false
  }

  handleGenderClick = (gender) => {
    toggleGender(gender)
  }

  handleArrangementClick = (arrangement) => {
    if(arrangement === PAY) selectedFilters.filters.arrangement = PAY
    if(arrangement === TFP) {
      this.setState({joinModalOpen:true})
     // selectedFilters.arrangement = TFP
    }
    this.setState({arrangement: selectedFilters.filters.arrangement})
  }

  canContinue = () => {
    const filters = selectedFilters.filters
    if(filters.type === MODEL) {
      const genders = filters.genders
      return (genders && genders.length > 0 && filters.arrangement)
    } else {
      return (filters.arrangement)
    }
  }

  render() {
    const { size } = this.props;
    const { arrangement } = this.state;
    const color = selectedFilters.filters.color;
    const width = size.width
    let colWidth = '25%';
    if (width < 1300)  colWidth = '33%';
    if (width < 900)  colWidth = '50%';
    if (width < 550)  colWidth = '100%';
    return (
        <Layout>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
                {selectedFilters.filters.type === MODEL && (
                <div style={{marginBottom:'40px'}} >
                  <h2>I'm looking for</h2>
                  <SuiButton.Group fluid basic size='massive'>
                  <ToggleButton
                      onClick={()=>this.handleGenderClick('male')}
                      inverted
                      basic
                      color={color}
                      icon='mars' />
                  <ToggleButton onClick={()=>this.handleGenderClick('female')}
                                inverted basic color={color} icon='venus' />
                  <ToggleButton onClick={()=>this.handleGenderClick('trans')}
                                inverted basic color={color} icon='transgender alternate' />
                  <ToggleButton onClick={()=>this.handleGenderClick('none')}
                                inverted basic color={color} icon='genderless' />
                  </SuiButton.Group>
                  </div>
                  )
                }
                <h2>Arrangement</h2>
                <SuiButton.Group fluid basic size='massive'>
                  <StyledButton
                      onClick={()=>this.handleArrangementClick(TFP)}
                      active={arrangement === TFP}
                      inverted
                      color={color}
                      basic >TFP</StyledButton>
                  <StyledButton
                      onClick={() => this.handleArrangementClick(PAY)}
                      active={arrangement === PAY}
                      inverted
                      color={color}
                      basic >Pay</StyledButton>
                </SuiButton.Group>
                <Modal closeIcon trigger={<span style={{textDecoration: 'underline', cursor:'pointer'}}>What is TFP?</span>} basic size='small'>
                  <Header content='What is TFP?' />
                  <Modal.Content>
                    <p>
                      <b>Time for prints</b> (TFP) is a term many photography communities use to describe an arrangement between a model and a photographer whereby the photographer agrees to provide the model with a certain number of pictures of selected photographs from the session, and a release or license to use those pictures in return for the model's time. Commonly used to mutually build portfolios.
                    </p>
                  </Modal.Content>
                </Modal>
                <Modal
                    open={this.state.joinModalOpen}
                    onClose={() => {this.setState({joinModalOpen:false})}}
                    size='small'
                    basic
                    closeIcon
                >
                  <Header content='' />
                  <Modal.Content>
                    <h3>
                      For TFP arrangements, you'll need to have a portfolio with us. It only takes a couple of seconds
                      and is completely free.
                    </h3>
                    <h3>Connect your instagram</h3>
                  </Modal.Content>
                  <Modal.Actions>

                  </Modal.Actions>
                </Modal>
                <CenterFixedButton disabled={!this.canContinue()} color={color} to="/pick/images"  text="Continue"></CenterFixedButton>
              </Grid.Column>
            </Grid>
          </Container>

        </Layout>
    )
  }
}

export default sizeMe()(view(FilterPage))
