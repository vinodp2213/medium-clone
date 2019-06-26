import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios'
import Select from 'react-select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class StoryForm extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            title: '', 
            description: '', 
            body: '' ,
            topics : [],
            topic:'',
            tags : [],
            selectedTag : [],
            storyImageUrl : null
        }
        
    }

    
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }
    handleTopicChange = (e) => {
        const topic = e.target.value
        this.setState(() => ({ topic }))
    }

    handleBodyChange = (e) => {
        const body = e
        this.setState(() => ({body}))
        console.log(this.state.body)
    }

    handleTagChange = (e) => {
        const selectedTag = e.map(tag => tag.id)
       console.log(selectedTag)
        this.setState(() => ({
            selectedTag
        }))
        console.log(this.state.selectedTag)
    }

    handleFile = (e) =>  {
        e.persist()
        console.log(e.target)
        this.setState(() => ({
            storyImageUrl: e.target.files[0]
        }))
    }

    componentDidMount(){
        axios.get('/topics')
        .then(response => this.setState(() => ({ topics : response.data })))
        .catch(err => console.log(err))

        
        axios.get('/tags')
        .then(response => this.setState(() => ({ tags : response.data })))
        .catch(err => console.log(err))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const { title, description, body, topic, selectedTag} = nextProps.story
        this.setState(() =>({
            title,
            description,
            body,
            topic,
            selectedTag
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var formData = {
            title : this.state.title,
            description : this.state.description,
            body : this.state.body,
            topic : this.state.topic,
            selectedTag : this.state.selectedTag,
            storyImageUrl : this.state.storyImageUrl
        }
        
        var formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('body', this.state.body)
        formData.append('topic', this.state.topic)
        formData.append('selectedTag', this.state.selectedTag)
        formData.append('storyImageUrl', this.state.storyImageUrl, this.state.storyImageUrl.name)
        console.log(formData)
       this.props.handleSubmit(formData)

       this.setState(() => ({
            title : '',
            description : '',
            body : '',
            topic :'',
            selectedTag :'',
            storyImageUrl : null
       }))
    }


    render(){
        const options = this.state.tags.map(tag => {
            return { value: tag.name, label: tag.name,  id : tag._id };
          })
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                    <div className='col-1'></div>
                        <div className='col-5'>
                            <div className="form-group">
                                Topic 
                                <select value={this.state.topic} name='topic' className="form-control" onChange={this.handleTopicChange}>
                                    <option>Select topic</option>
                                    {
                                        this.state.topics.map(topic => {
                                            return (
                                                <option key={topic._id} value={topic._id}>{topic.topicName}</option>
                                            )
                                        })
                                    }
                                </select><br/>
                                <Link to='/topics/new'>Add topic</Link>
                            </div>
                            <div className="form-group">
                                <input type='file' name='storyImageUrl' onChange={this.handleFile} />
                            </div>
                            <div className="form-group">
                                Title 
                                <input type='text' value={this.state.title} className="form-control" name='title' onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                Description
                                <textarea type='text' className="form-control" value={this.state.description} name="description"  rows="3" onChange={this.handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                Tags 
                                <Select 
                                    name="selectedTag" 
                                    onChange={this.handleTagChange}
                                    isMulti
                                    isSearchable
                                    options={options}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                            <ReactQuill
                                modules={StoryForm.modules}
                                formats={StoryForm.formats}
                                value={this.state.body}
                                name="body" 
                                onChange={this.handleBodyChange}
                                className ='quill-editor'
                                />
                            </div>
                            <br/>
                            
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

StoryForm.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code']
    ],
    clipboard: {
      matchVisual: false,
    }
  }

StoryForm.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code'
  ]

export default StoryForm