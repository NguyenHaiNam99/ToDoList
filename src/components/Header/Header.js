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
            newItem: "",
            optionHeader: "Add",
        }
    }

    onKeyDown(event) {
        const key = event.keyCode;
        const { optionHeader } = this.state;
        const { addItem, search } = this.props;
        //const index = listItem.findIndex(e => e.id === currentItem);
        if (key === 13) {
            let { value } = event.target;
            this.setState({
                newItem: "",
            });
            if (optionHeader === "Add") {
                if (!value) {
                    return;
                }
                addItem(value, optionHeader);
            } else if (optionHeader === "Search") {
                search(value, optionHeader)
            }
            // else {
            //     copyList[index].title = value;
            //     this.setState({
            //         listItem: copyList,
            //         newItem: "",
            //         optionHeader: "Add"
            //     })
            // }
        }
    }

    onChange(event) {
        const { value } = event.target;
        this.setState({
            newItem: value
        })
    }

    selectOption(event) {
        const { value } = event.target;
        this.setState({
            optionHeader: value
        })
    }

    render() {
        const { inputRef } = this.props;
        const { newItem } = this.state;
        return (
            <div className="Header">
                <select onChange={this.selectOption}>
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