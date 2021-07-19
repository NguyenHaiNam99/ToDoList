import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
    render() {
        const { optionFooter, left } = this.props
        return (
            <div className="Footer">
                <p>{left} left</p>
                <button onClick={optionFooter} value="All">All</button>
                <button onClick={optionFooter} value="Active">Active</button>
                <button onClick={optionFooter} value="Completed">Completed</button>
            </div>
        );
    }
}

export default Footer;