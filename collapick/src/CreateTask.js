import React, { Component } from 'react';
import styles from './CreateTask.css'
const axios = require('axios');
const qs = require('querystring'); 

export class CreateTask extends Component {
  constructor(props){
    super(props);

this.state= {
  Name:'',
  description:'',
  Start:0,
  End:0,
  duration:0,
  id:0  
    }
  }

handleNameChange = event => {                  //Triggers when changes happen in name input
  this.setState({Name: event.target.value});
    }

handleDescriptionChange = event => {            //triggers when changes happen in description input
  this.setState({description: event.target.value});
    }
  
handleSubmit = event =>{                      //when clicking submit button
  alert("New Task Created");
  const requestBody = {                      //Data to be sended
    Name: this.state.Name,
    description: this.state.description,
   Start: this.state.Start,
   End: this.state.End,
    duration: this.state.duration
  }
  
  const config = {        //Content type
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' 
    }
  }
  
  axios.post('http://localhost:3001/notes', qs.stringify(requestBody), config) //Posting data and content type
    .then((result) => {
     console.log(result)
    })
    .catch((err) => {
        console.log(err)
        })
    }

  render() {
    return (
    <form id="pageform"> 

    <div class="row">
    <div class="col-25">
      <label id="lbl1" for="tname">Task Name</label>
        </div>
     <div class="col-75">
      <input type="text" id="tname" placeholder="Name your task" required onChange={this.handleNameChange}/>
        </div>
          </div>

    <div class="row">
      <div class="col-25">
        <label id="lbl2" for="des">Description</label>
          </div>
    <div class="col-75"></div>
      <input type="text" id="des" placeholder="Describe the task" required onChange={this.handleDescriptionChange}/>
        </div>   
    <input type="submit" id="Submit" value="Submit" onClick={this.handleSubmit}/>
    </form>
        );
      }
  }
export default CreateTask;