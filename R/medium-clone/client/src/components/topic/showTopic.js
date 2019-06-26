import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';


class TopicShow extends React.Component {
    constructor(){
        super()
        this.state = {
            topic : {}
        }
    }

    handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure?')
        if(confirmDelete){
            axios.delete(`/topics/${this.state.topic._id}`)
            .then(()=> this.props.history.push('/topics'))
            .catch((err) => window.alert(err))
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/topics/${id}`)
            .then(response => this.setState(()=> ({
                topic : response.data
            })))
    }
    render(){
        return (
            <div>
                

                <button onClick={this.handleDelete}>Delete</button>
                <Link to= {`/topics/edit/${this.state.topic._id}`}>Edit</Link>

                <Link to='/topics'>Back</Link>
            </div>
        )
    }
}

export default TopicShow