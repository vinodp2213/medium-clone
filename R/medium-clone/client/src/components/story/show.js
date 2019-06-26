import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

class StoryShow extends React.Component {
    constructor(){
        super()
        this.state = {
            story : {},
            isLoaded:false
        }
    }

    handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure?')
        if(confirmDelete){
            axios.delete(`/stories/${this.state.story._id}`)
            .then(()=> this.props.history.push('/stories'))
            .catch((err) => window.alert(err))
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/stories/${id}`)
            .then(response => this.setState(()=> ({
                story : response.data,
                isLoaded:true
            })))
            .catch(err => console.log(err))
    }
    render(){
        this.state.isLoaded && 
            this.state.story.response.map(resp => console.log(resp.responseBody))
        return (
            <div>
                <div className="container">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                            <h2>{this.state.story.title}</h2>
                            <img src={this.state.isLoaded && this.state.story.storyImageUrl} alt='story pic' className='storyImage'/>
                            <p>{this.state.story.description}</p>

                            <p>Author : {this.state.isLoaded && this.state.story.user.username}</p>
                            
                            <ReactQuill
                                    theme ='bubble'
                                    value = {this.state.story.body}
                                    readOnly = {true}
                                />
                                <br/>
                                Tags :
                            {
                                this.state.isLoaded &&  this.state.story.selectedTag.map(tag => {
                                    return(
                                        <div >
                                            <li key={tag.id}>{tag.name}</li>
                                        </div>
                                    )
                                })
                            }

                                Comments<br/>
                                    <input type='text' className="form-control" placeholder='comment here' />
                                    <br/>
                                    <button> publish </button>
                                    <br/><br/>
                            <button onClick={this.handleDelete}>Delete</button>
                            <Link to= {`/stories/edit/${this.state.story._id}`}>Edit</Link>

                            <Link to='/stories'>Back</Link>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>
        )
    }
}

export default StoryShow