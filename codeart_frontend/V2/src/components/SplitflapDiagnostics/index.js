import React, { Component } from "react";
import './style.css';


class SplitflapDiagnostics extends Component {
    constructor() {
        super();
        this.state = {
            supervisorState: {
                uptime: 'TODO'
            }
        };
    }

    onSupervisorState(state) {
        console.log('supervisor state', state)
        this.setState({supervisorState: state})
    }

    onSplitflapState(state) {
        this.setState({splitflapState: state})
    }

    componentDidMount() {
        this.props.socket.on('splitflap_supervisor_state', (data) => {this.onSupervisorState(data)})
        this.props.socket.on('splitflap_state', (data) => {this.onSplitflapState(data)})
    }

    componentWillUnmount() {
        this.props.socket.off('splitflap_supervisor_state', this.onSupervisorState)
        this.props.socket.off('splitflap_state', this.onSplitflapState)
    }

    render() {
        return (
            <div className="diagnostics">
                <div>Server: {this.props.serverName}</div>
                <div><button onClick={this.props.onHardResetClick}>Hard Reset Splitflap MCU</button></div>
                <div>Uptime: {this.state.supervisorState.uptime}</div>
            </div>
        )
    }
}

export default SplitflapDiagnostics;
