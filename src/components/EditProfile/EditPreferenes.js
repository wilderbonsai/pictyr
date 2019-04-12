import React from 'react'
import ToggleButton from 'components/Button/Toggle'
import authenticatedUser from 'store/authenticatedUser'
import {
    MARKETING,
    GENERAL,
    PAID,
    COLLABORATION
} from 'const/commPrefKeys'

class EditTags extends React.Component {
  state = {
    email: null,
    paid: true,
    general: false,
    collaboration: false,
    marketing: false
  }

  componentDidMount() {
    const commPrefs = authenticatedUser.user.commPreferences
    console.log(commPrefs)
    commPrefs.forEach((pref) => {
      if(pref.key === PAID) this.setState({paid:true})
      if(pref.key === GENERAL) this.setState({general:true})
      if(pref.key === MARKETING) this.setState({marketing:true})
      if(pref.key === COLLABORATION) this.setState({collaboration:true})

    })
  }
  render() {
    const { email, paid, collaboration, general, marketing } = this.state

    return (

        <>
        <ToggleButton
            fluid
            inverted
            onClick={()=>{this.setState({paid:!paid})}}
            active={paid}
            size='massive'
            color='teal'
            basic >I am open for paid opportunities.</ToggleButton>
        <ToggleButton
            fluid
            inverted
            onClick={()=>{this.setState({collaboration:!collaboration})}}
            active={collaboration}
            color='teal'
            size='massive'
            basic >I am open for potential collaborations.</ToggleButton>
        <ToggleButton
            fluid
            inverted
            onClick={()=>{this.setState({general:!general})}}
            active={general}
            size='massive'
            color="teal"
            basic >I am open for general inquiries.</ToggleButton>
        <ToggleButton
            fluid
            inverted
            onClick={()=>{this.setState({marketing:!marketing})}}
            active={marketing}
            size='massive'
            color="teal"
            basic >I want to be in the loop about the latest from Scoutyr.</ToggleButton>

        <h6>We will send you email notifications, connecting you with people that want to contact you.</h6>
        </>
    )
  }
}


export default EditTags