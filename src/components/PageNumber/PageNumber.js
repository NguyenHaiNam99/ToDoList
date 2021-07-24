import React, { Component } from 'react';
import './PageNumber.css'

class PageNumber extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentPage: 1
      };
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
   }

   nextPage() {
      const { currentPage } = this.state;
      this.setState({
         currentPage: currentPage + 1 
      })
   }

   prevPage() {
      const { currentPage } = this.state;
      this.setState({
         currentPage: currentPage > 1 ? currentPage - 1 : 1
      })
   }

   render() {
      const { total } = this.props;
      const { currentPage } = this.state;
      let totalPage;
      if (total === 0) totalPage = 1;
      else totalPage = total;
      return (
         <div className="PageNumber">
            <button onClick={this.prevPage}>Prev</button>
            <p>Trang: {currentPage}/{totalPage}</p>
            <button onClick={this.nextPage}>Next</button>
         </div>
      );
   }
}

export default PageNumber;