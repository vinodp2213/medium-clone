import React from 'react'
import TopicForm from './topicForm' 
import axios from '../../config/axios'

class NewTopics extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/topics' , formData)
        .then(response => this.props.history.push('/topics'))
        .catch(err => console.log(err))
    }
    
    render(){
        return (
            <div>
                <h2> Topic new </h2>
                <TopicForm handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}

export default NewTopics