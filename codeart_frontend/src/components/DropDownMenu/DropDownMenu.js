import React, {Component} from 'react';
import './styles.scss';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


class DropDownMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: null , label: 'Pick a Game'}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected game', option.value)
    this.setState({selected: option})

    this.props.getGameKeys(`${option.value}/getkeys`)

    console.log(this.props);
  }

  render () {
    const { toggleClassName, togglePlaholderClassName, toggleMenuClassName, toggleOptionsClassName } = this.state

    const options = [
        { value: 1, label: 'Game One' },
        { value: 2, label: 'Game Two' },
        { value: 3, label: 'Game Three' },     
    ]

    const defaultOption = this.state.selected.label;
    const placeHolderValue = this.state.selected.value;

    return (

      <div>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          placeholder="Select an option"
        //   className={ toggleClassName ? 'my-custom-class' : '' }
        //   placeholderClassName={ togglePlaholderClassName ? 'my-custom-class' : '' }
        //   menuClassName={ toggleMenuClassName ? 'my-custom-class' : '' }
        />
      </div>
    
    )
  }
}

export default DropDownMenu