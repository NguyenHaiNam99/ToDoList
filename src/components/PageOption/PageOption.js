import React, { Component } from 'react';
import './PageOption.css'

class PageOption extends Component {
    render() {
        const {sizePage} = this.props
        return (
            <div className="PageOption">
                <p>Size:</p>
                <select onChange={sizePage}>                    
                    <option>3</option>
                    <option>5</option>
                    <option>10</option>
                </select>
            </div>
        );
    }
}

export default PageOption;