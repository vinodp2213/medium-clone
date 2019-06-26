import React from 'react' 
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListStories extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            stories: []
        }
    }

    componentDidMount() {
        axios.get('/stories')
            .then(response => this.setState(() => ({ stories: response.data })))
    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.state.stories.length === 0 ? (<p> No stories found. Add your first Story</p>) : (
                        <div> 
                            <h2>Listing Stories - {this.state.stories.length} </h2>
                            <ul>
                                {
                                    this.state.stories.map(story => {
                                        return (
                                            <div key={story._id}>
                                                <li><Link to={`/stories/${story._id}`}>{story.title}</Link> </li>
                                                <div>
                                                    <p>{story.description}</p>
                                                </div>
                                                <br/>
                                            </div>
                                            
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        ) 
                    }

                    <Link to="/stories/new">Add Story</Link>
                </div>
            </div>
        )
    }
}

export default ListStories