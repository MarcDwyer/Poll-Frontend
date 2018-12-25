import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, NavItem } from 'react-materialize'
export default class Nav extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
      <nav className="fixer">
        <div className="nav-flex">
        <Link to="/" className="brand-logo left">Fetcher's Poll</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="dropper">
          <Modal
  header="Welcome to Marc Dwyer's poll app!"
  trigger={<Button className="dropper-btn">Features</Button>}>
    <ul>
      <li style={{listStyle: "circle", marginLeft: '15px'}}>Web Sockets update you in real time</li>
      <li style={{listStyle: "circle", marginLeft: '15px'}}>Polls saved to Mongodb for persisted data</li>
      <li style={{listStyle: "circle", marginLeft: '15px'}}>Making a poll is so easy you dont even notice how good it is</li>
    </ul>
</Modal>
          </li>
          </ul>
        </div>
      </nav>
    </div>
      )
  }
}
