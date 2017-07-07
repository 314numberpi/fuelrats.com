// Module imports
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Link from 'next/link'
import React from 'react'
import withRedux from 'next-redux-wrapper'

import {
  actions,
  initStore,
} from '../store'





// Component imports
import AdminUserMenuNav from './AdminUserMenuNav'
import Component from './Component'
import LoginDialog from './LoginDialog'





class UserMenu extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    if (localStorage.getItem('access_token')) {
      this.props.login()
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods(['showLogin'])
  }

  render () {
    let adminUserMenuNav = null
    let avatar = ''
    let isAdmin = true

    return (
      <div className="user-menu">
        {this.props.loggedIn && (
          <div className="avatar medium"><img src={`//api.adorable.io/avatars/${this.props.id}`} /></div>
        )}

        {this.props.loggedIn && (
          <menu>
            <nav className="user">
              <ul>
                <li>
                  <Link href="/profile">
                    <a>My Profile</a>
                  </Link>
                </li>

                <li>
                  <Link href="/leaderboard">
                    <a>Leaderboard</a>
                  </Link>
                </li>

                <li>
                  <a
                    href="#"
                    onClick={this.props.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </nav>

            {this.props.isAdmin && (
              <AdminUserMenuNav />
            )}

            <div className="stats">
              <header>My Stats</header>

              <table>
                <tbody>
                  <tr>
                    <th>Rescues</th>
                    <td>648</td>
                  </tr>
                  <tr>
                    <th>Assists</th>
                    <td>537</td>
                  </tr>
                  <tr>
                    <th>Favorite Ship</th>
                    <td>Asp Explorer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </menu>
        )}

        {!this.props.loggedIn && (
          <button
            className="login"
            onClick={this.showLogin}>
            Login
          </button>
        )}
      </div>
    )
  }

  showLogin () {
    this.props.showDialog({
      body: (<LoginDialog />),
      closeIsVisible: true,
      menuIsVisible: false,
      title: 'Login',
    })
  }
}





const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(actions.login, dispatch),
    logout: bindActionCreators(actions.logout, dispatch),
    showDialog: bindActionCreators(actions.showDialog, dispatch),
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.authentication, state.user)
}





export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(UserMenu)
