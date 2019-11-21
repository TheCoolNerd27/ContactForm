import React, { Component } from 'react';
import {
    FormGroup, Label, Input, Button, Form, Container,
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import emailjs from 'emailjs-com';

// import DateTimePicker from 'react-datetime-picker';
// import firebase from '../firebase';
// const db = firebase.firestore();
// const storage = firebase.storage();

class contactForm extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            mail_id:"",
            msg:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
     handleSubmit=(e)=>{
        e.preventDefault();
        
        var template_id = "contact_form";
        const newDoc = {
            name:this.state.name,
            mail_id:this.state.mail_id,
            msg:this.state.msg
        }
        console.log(this.state,newDoc);
        this.setState({
            name:"",
            mail_id:"",
            msg:""
        });
        
        this.sendFeedback(template_id, newDoc);
        
        
    }
    sendFeedback (templateId, variables) {
        emailjs.send(
          'gmail', templateId,
          variables
          ).then(res => {
            console.log('Email successfully sent!',variables)
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
    componentDidMount(){
        emailjs.init("user_id");
    }
    render(){
        return(
            <div className="container">
            <h1>Contact Form</h1>
            <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" name="name" required onChange={this.handleChange}  value = {this.state.name}/>
                </FormGroup>
                <FormGroup>
                    <Label>Mail ID:</Label>
                    <Input type="text" name="mail_id" required onChange={this.handleChange} value = {this.state.mail_id}/>
                </FormGroup>
                <FormGroup>
                    <Label>Message:</Label>
                    <Input type="textarea" name="msg" required onChange={this.handleChange} value = {this.state.msg}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            </div>
        );
    }
}

export default contactForm;