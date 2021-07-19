import React, { Component } from 'react';
import './PageNumber.css'

class PageNumber extends Component {
    render() {
        const { nextPage, page, prevPage, total } = this.props;
        let totalPage;
        if (total === 0) totalPage = 1;
        else totalPage = total;
        return (
            <div className="PageNumber">
                <button onClick={prevPage}>Prev</button>
                <p>Trang: {page}/{totalPage}</p>
                <button onClick={nextPage}>Next</button>
            </div>
        );
    }
}

export default PageNumber;