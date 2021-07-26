import React, { Component } from 'react';
import tick from '../images/tick.svg'
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.state = {
            newItem: ""
        }
    }

    changeSate(newItem){
        this.setState({
            newItem
        })
    }

    onKeyDown(event) {
        const key = event.keyCode;
        const { listToDo, currentState } = this.props;
        //const index = listItem.findIndex(e => e.id === currentItem);
        if (key === 13) {
            let { value } = event.target;
            this.setState({
                newItem: "",
            });
            switch (currentState) {
                case "Search":
                    listToDo.current.search(value);
                    break;
                case "Update":
                    //console.log(listToDo.current.state.currentItem)
                    break;
                default:
                    if (!value) return;
                    listToDo.current.addItem(value);
                    break;
            }
        }
    }

    onChange(event) {
        const { value } = event.target;
        this.setState({
            newItem: value
        });
    }

    selectOption(event) {
        const { value } = event.target;
        const { updateParentState } = this.props;
        updateParentState(value);
    }

    render() {
        const { inputRef, currentState } = this.props;
        const { newItem } = this.state;
        return (
            <div className="Header">
                <select onChange={this.selectOption}>
                    {
                    currentState === "Update" && <option >Update</option>
                    }
                    <option>Add</option>
                    <option>Search</option>
                </select>
                <img
                    src={tick}
                    alt="tick"
                />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add new Item"
                    value={newItem}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
            </div>
        );
    }
}

export default Header;