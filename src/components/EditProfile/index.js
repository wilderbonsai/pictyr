import React from 'react'
import Menu from './Menu'
import EditTags from './EditTags'
import EditPreferences from './EditPreferenes'
export default class EditProfile extends React.Component {
  state = {
    currentTabComponent: (<EditTags/>)
  }

  handleTabChange = (tabName) => {
    if(tabName == 'Tags') {
      this.setState({currentTabComponent:(<EditTags/>)})
    }

    if(tabName == 'Preferences') {
      this.setState({currentTabComponent:(<EditPreferences/>)})
    }
  }


  render () {

    const { currentTabComponent } = this.state
    return (
        <>
        <Menu onTabChange={this.handleTabChange}/>
          {currentTabComponent}
        </>
    )
  }
}

