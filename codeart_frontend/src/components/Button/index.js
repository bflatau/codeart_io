import React, { Component } from 'react';
import './styles.scss';

export default class Button extends Component {

    render() {

        const { text, styleClassName } = this.props;
        const isDisabled = this.props.disabled === true;
        let wrapperClass = 'button-wrapper';

        if (isDisabled) {
            wrapperClass += ' button-wrapper--disabled';
        }

        return (
            <div className={wrapperClass}>
                <button className={styleClassName || ''} onClick={this.handleClick} disabled={isDisabled}>{text}</button>
            </div>
        );
    }

    handleClick = (clickEvent) => {
        if (this.props.disabled !== true && this.props.clickHandler) {
            this.props.clickHandler(clickEvent);
        }
    };

}