import React, { Component } from "react";
import './style.css';

import {PB} from 'splitflapjs-proto'

// TODO: refactor to use protobuf constants once proto generated source is separate of splitflap (& its serialport dependency that doesn't work in browser)
const SPLITFLAP_ERROR_STATES = [
    PB.SplitflapState.ModuleState.State.SENSOR_ERROR,
    PB.SplitflapState.ModuleState.State.PANIC,
    PB.SplitflapState.ModuleState.State.STATE_DISABLED,
]

const flapLayouts = [
    {symbol: '_', color: 'black-empty'},
    {symbol: 'J', color: 'black'},
    {symbol: 'B', color: 'black'},
    {symbol: 'M', color: 'black'},
    {symbol: 'R', color: 'black'},
    {symbol: '$', color: 'black'},
    {symbol: 'V', color: 'black'},
    {symbol: 'K', color: 'black'},
    {symbol: 'A', color: 'black'},
    {symbol: 'E', color: 'black'},
    {symbol: 'N', color: 'black'},
    {symbol: 'O', color: 'black'},
    {symbol: '_', color: 'yellow'},
    {symbol: '*', color: 'black'},
    {symbol: '_', color: 'green'},
    {symbol: 'G', color: 'black'},
    {symbol: 'I', color: 'black'},
    {symbol: '%', color: 'black'},
    {symbol: 'D', color: 'black'},
    {symbol: 'L', color: 'black'},
    {symbol: '&', color: 'black'},
    {symbol: '@', color: 'black'},
    {symbol: 'C', color: 'black'},
    {symbol: 'W', color: 'black'},
    {symbol: 'H', color: 'black'},
    {symbol: 'Y', color: 'black'},
    {symbol: '_', color: 'white'},
    {symbol: 'Q', color: 'black'},
    {symbol: '_', color: 'pink'},
    {symbol: '_', color: 'orange'},
    {symbol: '!', color: 'black'},
    {symbol: 'T', color: 'black'},
    {symbol: 'Z', color: 'black'},
    {symbol: 'P', color: 'black'},
    {symbol: 'F', color: 'black'},
    {symbol: '?', color: 'black'},
    {symbol: 'S', color: 'black'},
    {symbol: '#', color: 'black'},
    {symbol: 'U', color: 'black'},
    {symbol: 'X', color: 'black'},
]


class OutputBoardFlap extends Component {
    render() {
        const data = this.props.data
        let text = ''
        const classes = ['split-flap-button']
        let tooltip = []

        if (data !== undefined) {
            text = flapLayouts[data.flapIndex].symbol
            classes.push(`split-flap-button-${flapLayouts[data.flapIndex].color}`)


            const warning = (data.countMissedHome !== undefined && data.countMissedHome > 0)
                || (data.countUnexpectedHome !== undefined && data.countUnexpectedHome > 0)
                || (data.state !== undefined && data.state === PB.SplitflapState.ModuleState.State.LOOK_FOR_HOME)
            if (warning) {
                classes.push('split-flap-warning')
            }

            const error = data.state !== undefined && SPLITFLAP_ERROR_STATES.indexOf(data.state) !== -1
            if (error) {
                classes.push('split-flap-error')
            }

            if (data.state !== undefined) {
                tooltip.push(`State: ${PB.SplitflapState.ModuleState.toObject(data, {enums: String}).state}`)
            }
            if (data.countMissedHome !== undefined) {
                tooltip.push(`Missed home: ${data.countMissedHome}`)
            }
            if (data.countUnexpectedHome !== undefined) {
                tooltip.push(`Unexpected home: ${data.countUnexpectedHome}`)
            }
            tooltip.push('(Click to reset)')
        }

        return (
            <td
                className={classes.join(' ')}
                title={tooltip.join('\r\n')}
                onClick={this.props.onResetModule}
            >
                {text}
            </td> 
        )
    }
}
export default OutputBoardFlap;