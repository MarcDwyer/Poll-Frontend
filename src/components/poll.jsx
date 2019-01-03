import React, { Component } from 'react'
import uuid from 'uuid'
import { Input } from 'react-materialize'
import { CopyToClipboard } from 'react-copy-to-clipboard'
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: `quest0`,
            isComplete: false,
            submitted: null,
            questions: null,
            ws: new WebSocket(`wss://${document.location.host}/sockets/${this.props.match.params.id}`),
            error: null
        }
    }
    componentWillUnmount() {
        this.state.ws.close()
    }
    async componentDidMount() {
        try {
            const pollFetch = await fetch('/api/getpoll', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(this.props.match.params.id)
                })
             const pollData = await pollFetch.json()
                this.setState({questions: pollData})
        } catch(err) {
            console.log(err)
        }
    }
    render() {
        if (!this.state.questions) {
            return (
                <div>
                    <div className="contained">
                    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>
                </div>
                </div>
            )
        } 
        const error = this.state.error ? this.state.error :'';
        return (
            <div>
            <div className="contained">
            <div className="poll">
            <h4>{this.state.questions.title} <br /><small>{error}</small></h4>
            <form onSubmit={this.handleSubmit}>
            <div className="maindiv">
            <div className="one">
            <ul> 
                {this.renderQuestions()}
            </ul>
            </div>
            <div className="resp-buttons two">
            <button type="submit" className="waves-effect waves-light btn pollbtn">Submit Answer!</button>
            </div>
            </div>
            </form>
            </div>
            </div>
            </div>
        )
    }
    handleChange = (e) => {
            this.setState({isChecked: e.target.name})
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.error) return
        const payload = {
            _id: this.props.match.params.id,
            question: this.state.isChecked
        }
        try {
        const updateFetch = await fetch('/api/update', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
        })
        const received = await updateFetch.json()
        if (received.status) {
            console.log(received)
            this.setState({error: "Duplicate ip detected"})
            return
        } else {
            console.log(received)
            const { isChecked, questions } = this.state
            this.setState({isComplete: true, submitted: questions[isChecked]}, () => {
                this.state.ws.send(JSON.stringify(payload))
                this.props.history.push(`/poll/results/${this.state.questions.Id}`)
            })
        }
    } catch(err) {
        console.log(err)
    }

    }
    renderQuestions = () => {
        const { questions } = this.state
        const filtered = Object.values(questions).filter(item => item.question);

        return filtered.map(({ question }, index) => {
            if (!question) return null
            return (
            <div key={uuid()} className="pollquest">
                <Input name={`quest${index}`} type="radio" checked={this.state.isChecked === `quest${index}`}  onChange={this.handleChange} label={question} />
            </div>
            )
        })
    }
}