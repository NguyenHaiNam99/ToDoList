import React, { Component } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem'

class ListToDo extends Component {
   constructor() {
      super();
      this.state = {
         listItem: [],
         id: 0,
         currentItem: 0,
         listFilter: [],
         //currentState: "Add"
      }
      this.tickItem = this.tickItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.addItem = this.addItem.bind(this);
   }

   tickItem(id) {
      const { listItem } = this.state;
      const copyList = [...listItem];
      const index = listItem.findIndex(e => e.id === id);
      copyList[index].isDone = !listItem[index].isDone;
      this.setState({
         listItem: copyList
      })
   }

   removeItem(id) {
      const { listItem } = this.state;
      const copyList = [...listItem];
      const index = listItem.findIndex(e => e.id === id);
      copyList.splice(index, 1);
      this.setState({
         listItem: copyList
      })
   }

   addItem(value) {
      const { listItem, id } = this.state;
      const copyList = [...listItem];
      const copyId = id + 1;
      copyList.push({ title: value, idDone: false, id });
      this.setState({
         listItem: copyList,
         id: copyId,
      })
   }

   clickItem(event, id) {
      const { inputRef, updateParentState, headerRef } = this.props;
      inputRef.current.focus();
      const { value } = event.target;
      headerRef.current.changeSate(value);
      this.setState({
         currentItem: id
      })
      updateParentState("Update");
      return value;
   }

   search(keyWord) {
      const { listItem } = this.state;
      const copyList = [...listItem];
      const resultList = copyList.filter(e => e.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1);
      this.setState({
         listFilter: resultList,
      })
   }

   filterOption() {
      const { listItem, listFilter } = this.state;
      const { currentState, pageNumber, pageOption } = this.props;
      const currentNum = pageNumber.current;
      const currentPage = currentNum && currentNum.state.currentPage;
      const currentSize = pageOption.current;
      const sizePerPage = currentSize && currentSize.state.sizePerPage;
      const lastIndex = currentPage * sizePerPage;
      const firstIndex = lastIndex - sizePerPage;
      let result;
      switch (currentState) {
         case "Search":
            result = listFilter.slice(firstIndex, lastIndex);
            return result;
         default:
            result = listItem.slice(firstIndex, lastIndex);
            return result;
      }
   }

   // static getDerivedStateFromProps(nextProps, prevState){
      


   //    if(nextProps.currentState !== currentState){
   //       if (nextProps.currentState === "Search")
   //       return { listFilter }
   //       return { listFilter: listItem }
   //    }
   //    else return null; 
   // }

   // shouldComponentUpdate(nextProps, prevState){
   //   console.log("should Update")
   //   const { listItem } = this.state;
   //   const { pageNumber } = this.props;
   //   const currentNum = pageNumber.current;
   //   const currentPage = currentNum &&  currentNum.state.currentPage;
   //   console.log(currentPage)
   //   console.log(nextProps.pageNumber.current.state.currentPage)
   //   if ( prevState.listItem !== listItem 
   //     || nextProps.pageNumber.current.state.currentPage !== currentPage)
   //   return true;
   //   else
   //   return false;
   // }

   render() {
      const listResult = this.filterOption();
      return (
         <div>
            {
               listResult.length > 0 ? listResult.map((e) =>
                  <ToDoItem
                     key={e.id}
                     item={e}
                     removeItem={this.removeItem.bind(this, e.id)}
                     tickItem={() => this.tickItem(e.id)}
                     onChange={(event) => this.onChange(event, e.id)}
                     clickItem={(event) => this.clickItem(event, e.id)}
                  />)
                  : <h4>List Empty</h4>
            }
         </div>
      );
   }
}

export default ListToDo;