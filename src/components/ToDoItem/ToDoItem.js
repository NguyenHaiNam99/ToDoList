import React, { Component } from 'react';
import './ToDoItem.css';
import check from '../images/check.svg'
import unCheck from '../images/unCheck.svg'
import detete from '../images/delete.svg'

class ToDoItem extends Component {
   constructor(props) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.state = {
         isDone: this.props.item.isDone,
         title: this.props.item.title
      };
   }

   onChange(event) {
      const { value } = event.target;
      this.setState({
         title: value
      })
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { title, isDone } = nextProps.item;
      if (prevState.title !== title || prevState.isDone !== isDone) {
         return {
            title,
            isDone
         };
      }
      return null;
   }

   render() {
      const { isDone, title } = this.state;
      const { removeItem, tickItem, onChange, clickItem } = this.props;
      let className = "ToDoItem";
      let url = unCheck;
      if (isDone) {
         className = "DoneItem";
         url = check;
      }
      return (
         <div className={className}>
            <img
               onClick={tickItem}
               src={url}
               alt="check"
               width="35px"
            />
            <input
               type="text"
               value={title}
               onChange={onChange}
               onClick={clickItem}
            />
            <img
               id="delete"
               src={detete}
               alt="delete"
               width="25px"
               onClick={removeItem}
            />
         </div>
      );
   }
}

export default ToDoItem;
