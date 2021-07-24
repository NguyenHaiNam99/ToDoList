import React, { Component } from 'react';
import './PageOption.css'

class PageOption extends Component {
   constructor(props) {
      super(props);
      this.state = {
         sizePerPage: 3
      };
      this.selectSize = this.selectSize.bind(this);
   }

   selectSize(event){
      const { value } = event.target;
      this.setState({
         sizePerPage: value
      })
   }

   render() {
      return (
         <div className="PageOption">
            <p>Size:</p>
            <select onChange={this.selectSize}>
               <option>3</option>
               <option>5</option>
               <option>10</option>
            </select>
         </div>
      );
   }
}

export default PageOption;