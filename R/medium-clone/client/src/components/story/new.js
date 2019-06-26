import React from 'react'
import StoryForm from './form' 
import axios from '../../config/axios'

class NewStory extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/stories' , formData)
        .then(() => this.props.history.push('/stories'))
        .catch(err => console.log(err))

    }
    
    render(){
        return (
            <div>
                <StoryForm handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}

export default NewStory
