import React from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom'

class ListTopics extends React.Component{
    constructor(){
        super()
        this.state = {
            topics : []
        }
    }

    componentDidMount(){
        axios.get('/topics')
        .then(response => this.setState(() => ({
            topics : response.data
        })))
    }

    render(){
        return(
            <div>
                <h2>topics </h2>
                <ol>
                    {
                        this.state.topics.map(topic => {
                            return(
                                <div key={topic._id}>
                                   <li><Link to={`/topics/${topic._id}`}>{topic.topicName}</Link></li> 
                                </div>
                            )
                        })
                    }
                </ol>
                <Link to='/topics/new'>Add topic</Link>
            </div>
        )
    }
}

export default ListTopics