import React from 'react'
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom'

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '', 
            notice: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        axios.post('/users/login', formData)
            .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.props.handleIsAuthenticated(true)
                    this.setState(() =>({ redirect : true }))
            })
            .catch(err => {
                this.setState(() => ({
                    notice : err.response.data.notice
                }))
            })
    }

    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-6">
                            <div className="card login">
                                <div className="card-body">
                                    <h2 align='center'>Login</h2>
                                    { this.state.notice && <p className='notice'> { this.state.notice } </p> }
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            Email
                                            <input type="text" 
                                            value={this.state.email} className="form-control" 
                                            onChange={this.handleChange} name="email" placeholder='abc@gmail.com'/>
                                        </div>
                                        <div className="form-group">
                                            Password
                                            <input type="password" value={this.state.password} 
                                            className="form-control" placeholder="********"
                                            onChange={this.handleChange} name="password" />  
                                        </div>
                                        <button type="submit" className="btn btn-primary" align='center'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserLogin