import React from 'react';
import axios from '../../config/axios';
import StoryForm from './form'


class StoryEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story :{},
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/stories/${id}`)
        .then(response => this.setState(() => ({
            story : response.data
        })))
    }

    handleSubmit=(formData)=> {
        console.log(formData)
        axios.put(`/stories/${this.state.story._id}`, formData)
            .then(() => this.props.history.push(`/stories/${this.state.story._id}`))
            .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <h2>Edit story</h2>
                <StoryForm story={this.state.story}
                             handleSubmit={this.handleSubmit}/>
                
            </div>
        )
    }
}

export default StoryEdit