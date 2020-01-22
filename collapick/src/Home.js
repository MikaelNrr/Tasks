import React, {Component} from 'react';
import styles from './Home.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const axios = require('axios');
var moment = require('moment'); //For Date formats

class Home extends Component {
  constructor(props){
    super(props);
    this.state= {Tasks: [],  //For all the tasks in the json server
      Start : 0,             //Starting time on the timer
      End : 0,               //Ending time on the timer
      Duration: 0,           //Duration of the task 
      wholeduration:''       //Totaltime of all the durations
    }
    this.all=[];             //array storing all the durations

    this.Delete = this.Delete.bind(this);
    this.begin = this.begin.bind(this);
    this.stop = this.stop.bind(this);
    }

  Delete(index){                 //Handling delete button
  const id = index;            //The id to be deleted, Button onclick-->on this function, holding the parameter of the id from json server
  const url = `http://localhost:3001/notes/`;  //URL is json server on port 3001

  axios.delete(url + id)
  .then(res => {
      console.log(res.data);
  })
  .catch((err) => {
      console.log(err);
  })  
  alert("Deleted");
  window.location.reload();
}

begin(index){                                      //Starting the timer function
  alert("Task has begun") 
    const id = index;                             //The id to be updated
     const url = `http://localhost:3001/notes/`; 
        var start = new Date();                  
          start = moment(start).format("HH:mm:ss"); //Formating the date to hours,minutes,seconds 00:00:00
             this.setState({Start:start});         //Set formated start date into states Start

axios.patch(url + id, {                          //Axios patch--> update request
  Start:start,                                   //Updating Start in json-server into formated date start
      })
    .then(response => {
      console.log(response);
          })
      .catch(error => {
        console.log(error);
            });
    }
  
stop(index){ //Stopping the timer and counting duration
  const id = index;
    const url = `http://localhost:3001/notes/`;
      var end = new Date();
        end = moment(end).format("HH:mm:ss"); //Formating end into hours minutes seconds
          var dur = moment.utc(moment(end,"HH:mm:ss").diff(moment(this.state.Start,"HH:mm:ss"))).format("HH:mm:ss")//Difference between start and end
            this.setState({End:end, Duration:dur}); //Setting end and duration into state
alert(dur);                                         //Alerting duration
  axios.patch(url + id, {        
    End:end,                    //Updating End and duration times into json server
      duration:dur
        })
  .then(response => {
  console.log(response);
        })
  .catch(error => {
  console.log(error);
        });
  }
  
  componentDidMount() {
    axios.get("http://localhost:3001/notes") //Get all data with axios get
    .then(response => {
      var a = response.data;                //declaring var a to eventually get all the durations only
        this.setState({
        Tasks:response.data
              });
a.forEach(e => {                                      //In we are getting every "column" in a for each
  var j = e.duration;                    
    var myMoment = moment(j, 'HH:mm:ss').toDate();      
      myMoment =  moment(myMoment).format("HH:mm:ss"); //To get the duration data into right type
        var a = myMoment.substring(6, 9);             //substring duration from 00:00:02 into 02
          this.all.push(a);                          //Pushing substringed data into array
          });
    var i;                   
    var whole=0;
for(i=0; i<this.all.length; i++){            //For each in all[] 
  var a = parseInt(this.all[i], 10);         //a is a string parsed into int
    whole += a;                              
  }       
   this.setState({                         //After for loop 
   wholeduration:whole                     //Set wholeduration data as whole
        });
    })
}

render() {                        
return (
<table id="TasksTable">
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Start</th>
    <th>End</th>
    <th>Duration</th>
    <th>Action  <p id="Dur">Total time: {this.state.wholeduration}s</p></th>
  </tr>
 
{this.state.Tasks.map(( listValue, index ) => {
  return (
      <tr key={index}>
        <td>{listValue.Name}</td>
        <td>{listValue.description}</td>
        <td>{listValue.Start}</td>
        <td>{listValue.End}</td>
        <td>{listValue.duration}
    <IconButton id="Delete" onClick={()=>{ this.Delete(listValue.id)}} variant="contained" color="primary">
    <DeleteIcon></DeleteIcon></IconButton></td>

<td><Button  onClick={()=>{ this.begin(listValue.id)}} disabled={listValue.End!=0} variant="contained" color="primary">Begin task</Button>
    <Button id="btnToRight" onClick={()=>{ this.stop(listValue.id)}}  disabled={listValue.End!=0} variant="contained" color="primary">Stop</Button>
                        </td>
      </tr>
      );
    })} 
</table>
    );
  }
}
export default Home;
