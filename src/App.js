import React from 'react';

import API from './utils/API'
import User from './User'

class App extends React.Component {
  // render() {
  //   return <User name='Cornellius Kaye' avatar='https://randomuser.me/api/portraits/men/16.jpg' email='hello@jessica.com' />
  // }
  constructor(props) {
    super(props)

    /*
      Give the component its own state.  This will help with keeping track of
      the loading state, the person's name, avatar, and email.  It's also using
      state data to hydrate the User component when the component is re-rendered.
    */

    this.state = {
      isLoading: true,
      name: null,
      avatar: null,
      email:null
    }
  } // constructor

  render() {
    const {isLoading, name, avatar, email} = this.state

    return (
      <User isLoading={isLoading} name={name} avatar={avatar} email={email} />
    )
  } // render

  /*
    This comes complete with an async request to load the data and update the
    component state.  That will trigger a new re-render.  Notice that the method
    is async which will allow us to await certain actions inside.
  */

  async componentDidMount() {
    // Load async data
    let userData = await API.get('/', {
      params: {
        results: 1,
        inc: 'name, email, picture'
      }
    })

    /*
      This can also be written as a try/catch:
      try {
        //load blah
        let userData = await API.get("foo")
      } catch (e) {
          console.log(`Oh noes!  Error: ${e}`)
      }

      The catch block is the perfect place to parse the returned error.  It's also
      a great place to show your users an appropriate feedback message.
    */

    // Parse the results for ease of use
    userData = userData.data.results[0]

    // Update state with new data
    const name = `${userData.name.first} ${userData.name.last}`
    const avatar = userData.picture.large
    const email = userData.email
    // re-render this ccomponent
    this.setState({
      ...this.state, ...{
        isLoading: false,
        name,
        avatar,
        email
      }
    })
  }
}

export default App;
