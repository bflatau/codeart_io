import React, { Component } from "react";
import './style.css';

import Header from '../Header/';
import InputBoard from '../InputBoard/';
import OutputBoard from '../OutputBoard/';
import SplitflapDiagnostics from '../SplitflapDiagnostics';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            boardLayoutData: {
                modules: Array(108).fill(undefined),
            },
            splitflapState: {
                modules: Array(108).fill(undefined),
            },
        };
    }

    onBoardLayoutUpdate(data) {
        this.setState({
            boardLayoutData: {
                modules: data.map((i) => {
                    return {
                        flapIndex: i,
                        countUnexpectedHome: 0,
                        countMissedHome: 0,
                    }
                }),
            },
        })
    }

    componentDidMount() {
        this.props.socket.on('button down', (data) => {
            console.log('socket data', data)
            this.onBoardLayoutUpdate(data.flaps);
        })

        this.props.socket.on('button up', (data) => {
            this.onBoardLayoutUpdate(data.flaps);
        })

        this.props.socket.on('splitflap_state', (data) => {this.setState({splitflapState: data})})
    }

    componentWillUnmount() {
        this.props.socket.off('splitflap_state', this.onSplitflapState)
    }
    
    render() {
        return (
            <div>
                <Header />
                <InputBoard socket={this.props.socket} />
                <OutputBoard socket={this.props.socket} splitflapState={this.state.boardLayoutData} />
                <OutputBoard socket={this.props.socket} splitflapState={this.state.splitflapState} />
                {/* <SocketTest socket={socket}/> */}
                <SplitflapDiagnostics serverName={this.props.socket.io.uri} socket={this.props.socket} onHardResetClick={this.props.splitflapHardReset} />
            </div>
        )
    }
}
export default Main;


