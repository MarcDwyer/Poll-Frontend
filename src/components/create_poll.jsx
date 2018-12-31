import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReCaptcha } from 'react-recaptcha-v3'
import Nav from './nav'
export default class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            number: 2,
            id: null,
            title: '',
            isComplete: false,
            copied: false,
            captcha: false
        }
    }
    componentWillMount() {
        for (let x = 0; x < 5; x++) {
            const path = `quest${x}`
            this.setState((state) => {
                return {...state, [path]: ''}
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //checks to see if all inputs have a value... it they do, another input tag is displayed
        const { number } = this.state;
        const path = `quest${number - 1}`
        if (!this.state[path] || this.state[path].length === 0) return;
        let ch = 0
        const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))
        const { state } = this
        for (let x = 0; x < state.number; x++) {
            
            if (state[sort[x]] && state[sort[x]].length > 0) {
                ch++
                continue
            } 
        }
         if (ch === this.state.number) {
            this.setState({number: this.state.number + 1})
        }
    }
    render() {
        if (this.state.isComplete) {
            return (
                <div>
                <Nav />
            <div className="contained">
            <div className="poll">
            <h4>Poll Submitted</h4>
            <i className="fa fa-check" />
            <div className="resp-buttons">
            <Link to={`/poll/survey/${this.state.id}`} className="waves-effect waves-light btn pollbtn">View Poll</Link>
            <CopyToClipboard 
            text={`https://${window.location.host}/poll/survey/${this.state.id}`} >
          <button className="waves-effect waves-light btn purple accent-1 copy">Click to copy post url</button>
        </CopyToClipboard>
            </div>
            </div>

            </div>
            </div>
            ) 
        }
        return (
            <div>
            <Nav />
            <div className="contained">
            <div className="poll">
            <h4>{this.state.error ? this.state.error : 'Create a poll'}</h4>
            <div className="actualpoll">
            <div className="check">
            <form onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="input-field col s12">
                 <input name="title" value={this.state.title} type="text" onChange={this.handleChange} autoComplete="off" className={this.state.error ? "redder": ""} />
                  <label className="active">Enter a title</label>
                    </div>
                    </div>
            <ul className="marginthis">
            {this.renderInput()}
            </ul>
            <div className="resp-buttons">
            <ReCaptcha 
            sitekey='6LeMcYUUAAAAALOdfvlBa3Fv6rwnM7G6Id_ks2Ao'
            action='action_name'
            verifyCallback={this.handleCB}
            />
            <button className="waves-effect waves-light btn pollbtn">Submit poll</button>
            </div>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
    handleCB = async (token) => {
        try {
            const postToken = await fetch ('auth', {
                headers:{
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify(token)
    
            })
            const res = await postToken.json()
            if (res.success) {
                this.setState({captcha: true})
            }
        } catch(err) {
            console.log(err)
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }
    renderInput = () => {
    const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))
       return sort.map((item, i) => {
            if (i < this.state.number) {
                return (
                    <div key={i} className="row">
                    <div className="input-field col s10">
                 <input value={this.state[item]} className={this.state.error ? "redder" : ""} type="text"  name={item} onChange={this.handleChange} placeholder={this.state.error || `Questions #${i + 1}`} autoComplete="off"  />
                    </div>
                </div>
                )
            }
            return null
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { quest0, quest1, title, captcha } = this.state
        if (quest0.length === 0 || quest1.length === 0 || title.length === 0) {
            this.setState({error: "Please enter questions"})
            return
        } else if (!captcha) {
            this.setState({error: "Captcha Auth Failed"})
            return
        }
        const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))

       const submitted = sort.filter((item) => {
            if (this.state[item].length > 0) {
                return this.state[item]
            } 
            return null
        }).map(item => {
           return {[item]: this.state[item], count: 0}
        }).reduce((obj, item, i) => {
            const [first, second] = Object.keys(item)
            obj[first] = {question: item[first], [second]: 0}
            obj.title = this.state.title
           return obj
        }, {})
        try {
            const postFetch = await fetch('/api/create', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(submitted)
            })
            const fetchRes = await postFetch.json()
            this.setState({id: fetchRes, isComplete: true, quest0: '', quest1: '', quest2: '', quest3: '', quest4: ''})
            } catch(err) {
                console.log(err)
            }
    }
}