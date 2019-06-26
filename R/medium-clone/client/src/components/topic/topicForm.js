import React from 'react';


class TopicForm extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            topicName : ''
        }
        
    }

    handleTopicChange = (e) => {
        const topic = e.target.value
        this.setState(() => ({ topicName: topic }))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const { topicName } = nextProps.topic
        this.setState(() =>({
            topicName
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            topicName : this.state.topicName
        }
        console.log(formData)
       this.props.handleSubmit(formData)

       this.setState(() => ({
            topicName : ''
       }))
    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Topic 
                        <input type='text' value={this.state.topicName} onChange={this.handleTopicChange}/>
                    </label>
                    <br/>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default TopicForm