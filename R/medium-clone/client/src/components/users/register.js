import React from 'react';
import axios from '../../config/axios';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class UserRegister extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '', 
            email: '', 
            password: '', 
            notice: '',
            confirmPassword : '',
            isChecked:false
        }
    }

   
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const { password, confirmPassword, username } = this.state
        if( password === confirmPassword && username !== ''){
            axios.post('/users/register', formData)
            .then(() => {
                this.setState(() => ({
                    username: '', email: '', password: '', confirmPassword : '', 
                    notice: 'Successfully registered'
                }))
                setTimeout(() => {
                    this.props.history.push('/users/login')
                }, 2000)
            })
            .catch(err => console.log(err))
        }else{
            this.setState(()=>({
                notice : 'Incorrect password'
            }))
        }
        
    }
    handleChange = (e) =>{
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }

    handleCheck =(e) =>{
        const isChecked = e.target.checked
        this.setState(() => ({isChecked}))
    }
    render(){
        var email = (value) => {
            if (!validator.isEmail(value)) {
              return `${value} is not a valid email.`
            }
        }

        return(
            <div className='register'>
                <div className="row">
                    <div className="col-1">
                        
                    </div>
                    <div className="col-6">
                        <h2 className='header'>Welcome to Medium clone</h2>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <Form onSubmit={this.handleSubmit}>
                                <h3 align='center'>Register</h3>
                                <p align='center'>{ this.state.notice && this.state.notice }</p>
                                    <div className="form-group">
                                        Username
                                        <Input type='text' required className="form-control" onChange={this.handleChange} name='username' placeholder='abc'/>
                                    </div>
                                    <div className="form-group">
                                        Email
                                        <Input type='text' className="form-control" 
                                        onChange={this.handleChange} validations={[email]}
                                        name='email' placeholder='abc@gmail.com'/>
                                    </div>
                                    <div className="form-group">
                                        Password
                                        <Input type={this.state.isChecked ? 'text' : 'password'} className="form-control" onChange={this.handleChange} name='password' placeholder='************'/>
                                    </div>
                                    <div className="form-group">
                                        Confirm Password
                                        <Input type={this.state.isChecked ? 'text' : 'password'} className="form-control" onChange={this.handleChange} name='confirmPassword' placeholder='************'/>
                                    </div>
                                    <div className="form-group form-check">
                                        <Input type='checkbox'value = {this.state.isChecked} className="form-check-input" onChange = {this.handleCheck} />Show password
                                    </div>
                                    <button type="submit" className="btn btn-success btn-sm btn-block">Submit</button>
                                </Form>
                            </div>
                        </div>
                         
                    </div>
                    <div className="col-1">
                        
                    </div>
                </div>
                            
            </div>
        )
    }
}

export default UserRegister