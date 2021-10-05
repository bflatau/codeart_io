import React, { Component } from "react";
import './style.css';
import OutputBoardFlap from '../OutputBoardFlap';

class OutputBoard extends Component {
    createOutputGrid = () => {
        let rows = []

        let i = 0
        while (i < this.props.splitflapState.modules.length) {
            rows.push(this.props.splitflapState.modules.slice(i, i += 18))
        }

        return rows.map((row, y) => (
            <tr>
                {
                    row.map((item, x) => {
                        let p = {}
                        if (this.props.onResetModule) {
                            p['onResetModule'] = () => { this.props.onResetModule(x, y) }
                        }
                        return (
                        <OutputBoardFlap
                            data={item}
                            {...p}
                        />
                    )})
                }
            </tr>
        ))
    }
    
    render() {
        return (
            <div className="output-board-container">
                <table className="output-board">
                    {this.createOutputGrid()}
                </table>
            </div>
        )
    }
}
export default OutputBoard;


