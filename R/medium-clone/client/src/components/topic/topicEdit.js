import React from 'react';
import axios from '../../config/axios';
import TopicForm from './topicForm'


class EditTopic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topic :{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/topics/${id}`)
        .then(response => this.setState(() => ({
            topic : response.data
        })))
    }

    handleSubmit= (formData) => {
        console.log()
        axios.put(`/topics/${this.state.topic._id}`, formData)
            .then(() => this.props.history.push(`/topics/${this.state.topic._id}`))
            .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <h2>Edit topic</h2>
                <TopicForm topic={this.state.topic}
                             handleSubmit={this.handleSubmit}/>
                
            </div>
        )
    }
}

export default EditTopic