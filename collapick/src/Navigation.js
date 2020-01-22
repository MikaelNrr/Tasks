import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import styles from './Navigation.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

/*Navigation bar on top */
/*in index.html there is attached script to react-bootstrap to this navigation bar*/

export class Navigation extends Component {
render() {
return(
<body>
<Navbar id="NavBar" bg="dark"> 
<h1 id="Header">Task Managment</h1>
<Button  id="btnHome" variant="contained" color="primary" href="/">Manage Tasks</Button>
<Button id="btnManage"  variant="contained" color="primary" href="./CreateTask"><AddIcon id="Add"></AddIcon>Create a new Task</Button>
</Navbar>
</body>
)
}
}
export default Navigation;