import React, { Component } from "react";
import { PB } from "splitflapjs-proto";
import './style.css';

const PowerChannel = (props) => {
    return (
        <div className='power-channel'>
            <div className={`status status-on-${props.data.on}`}>{props.data.on ? 'ON' : 'OFF'}</div>
            <div className='voltage'>{props.data.voltageVolts.toFixed(2)} V</div>
            <div className='current'>{props.data.currentAmps.toFixed(3)} A</div>
        </div>
    )
}

class SplitflapDiagnostics extends Component {
    constructor() {
        super();
        this.state = {
            supervisorState: {}
        };
    }

    onSupervisorState(state) {
        console.log('supervisor state', state, PB.SupervisorState.fromObject(state), PB.SupervisorState.create(state))
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
        const supervisorStateObj = PB.SupervisorState.toObject(this.state.supervisorState, {defaults:true, enums: String})
        return (
            <div className="diagnostics">
                <div>Server: {this.props.serverName}</div>
                <div><button onClick={this.props.onHardResetClick}>Hard Reset Splitflap MCU</button></div>
                <div>Uptime: {this.state.supervisorState.uptimeMillis}</div>
                <div>Monitor state: {supervisorStateObj.state}</div>
                <div style={{display: this.state.supervisorState.state === PB.SupervisorState.State.FAULT ? 'block' : 'none'}}>Fault info:<pre>{JSON.stringify(supervisorStateObj.faultInfo, undefined, 4)}</pre></div>
                {
                    supervisorStateObj.powerChannels.map((d, i) => (<PowerChannel data={d} key={i} />))
                }
                <div>
                    <button onClick={this.props.stopAnimation}>STOP</button>
                    {
                        ['testAll', 'welcome', 'rain', 'spiral', 'randomFill', 'sequence1', 'wheelOfFortune'].map((a) => (
                            <button onClick={() => this.props.startAnimation(a)} key={a}>{a}</button>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default SplitflapDiagnostics;
