import faker from 'faker'
import { navigate } from 'gatsby'
import React, { Component } from 'react'
import { Dropdown, Image, Icon} from 'semantic-ui-react'


const options = [
  { key: 'user', text: 'Profile Settings', icon: 'user', onClick: () => {navigate('user/profile')} },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]


class DropdownImageTriggerExample  extends Component {
  renderImageComponent = () => {
    const { src } = this.props
    return (<Image style={{float:'left'}} size='mini'  src={src} />)
  }

  onChange = (val) => {
    console.log(val, 'change')
  }

  render () {
    return (
        <Dropdown onChange={this.onChange}trigger={this.renderImageComponent()}  options={options} pointing='top right' icon={  <Icon name="caret down" />} />
    )
  }
}
export default DropdownImageTriggerExample