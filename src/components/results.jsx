import React, { Component } from 'react'
import Nav from './nav'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Dropdown, Button, NavItem } from 'react-materialize'
import update from 'immutability-helper';
import { Bar } from 'react-chartjs-2';
export default class Results extends Component {

        constructor(props) {
            super(props)
            this.state = {
                questions: null,
                ws: new WebSocket(`wss://${document.location.host}/sockets/${this.props.match.params.id}`),
                socketData: null,
                copied: false
            }
        }
        componentWillUnmount() {
            this.state.ws.close()
        }
        async componentDidMount() {
            this.state.ws.addEventListener("message", (msg) => {
                this.setState({socketData: JSON.parse(msg.data)})
            })
            const pollFetch = await fetch('/api/getpoll', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(this.props.match.params.id)
            })
            const pollData = await pollFetch.json()
            this.setState({questions: pollData})
        }
        componentDidUpdate(prevProps, prevState) {
            const { socketData, questions } = this.state
            if (socketData && socketData._id === this.props.match.params.id) {
                if (prevState.socketData !== this.state.socketData) {
                    const quest = socketData.question
                    const obj = questions[socketData.question]
                    obj.count = obj.count + 1
                    const newState = update(this.state, {
                        questions: {[quest]: {$set: {...obj }}}
                    })
                    this.setState(newState)
            }
        }
    }
        render() {

                return (
                    <div>
                    <Nav />
                    <div className="contained">
                    <div className="poll">
                    <h4>The results are in!</h4>
                    <div className="actualpoll">
                    <div className="check">
                    <ul> 
                    {this.renderResults()}
                    </ul>
                    </div>
                    <div className="resp-buttons">
                    <Link to="/" className="waves-effect waves-light btn pollbtn">Create new poll</Link>
                    <div className="share">
                    <Dropdown trigger={
                          <Button className="btn purple accent-1">Share</Button>
                      }>
                    <CopyToClipboard
                           text={`https://${document.location.host}/poll/survey/${this.props.match.params.id}`} >
                           <NavItem>Copy url</NavItem>
                         </CopyToClipboard>
                        </Dropdown>
                        </div>
                         </div>
                    </div>
                    </div>
                    </div>
                    </div>
                )

        }
        renderResults = () => {
            const { questions } = this.state
            if (!questions) {
                return (
                    <li className="thevotes">
                    <span>Loading results...</span>
                </li>
                )
            }

            const filtered = Object.values(questions).filter(item => item.question);
            const question = filtered.map(item => item.question)
            const count = filtered.map(item => item.count)
            const total = filtered.reduce((total, item) => {
                return total += item.count
            }, 0)
            const data = {
                labels: question,
                datasets: [
                  {
                    label: questions.title,
                    backgroundColor: 'rgba(153,210,227,0.4)',
                    borderColor: 'rgba(122,168,181,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(153,210,227,.85)',
                    hoverBorderColor: 'rgba(122,168,181,1)',
                    data: count
                  }
                ]
              };
              const options = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMin: 0,
                                suggestedMax: total,
                                stepSize: 1
                            }
                        }]
                    }
                }
            return (
                <Bar data={data} options={options} />
            )
            
        }
}