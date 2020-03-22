import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

export default class TextInput extends Component {

    render() {

        const { placeholderText, maxLength, type='text', nativeProps, errorMsg } = this.props;
        let className = 'text-input__input';

        if (this.props.styleClassName) {
            className += ' ' + this.props.styleClassName;
        }

        return (
            <div className='text-input__wrapper'>
                {!errorMsg ? null :
                    <div className='text-input__error-msg'>
                        {errorMsg}
                    </div>
                }
                <input
                    {...nativeProps}
                    className={className}
                    placeholder={placeholderText}
                    maxLength={maxLength}
                    type={type}
                    ref='input'
                />
            </div>
        );
    }

    getValue = () => {
        return ReactDOM.findDOMNode(this.refs.input).value;
    };

}