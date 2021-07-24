import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageNumber from './components/PageNumber/PageNumber';
import PageOption from './components/PageOption/PageOption';
import ListToDo from './components/ListToDo/ListToDo';

class App extends Component {
   constructor() {
      super();
      this.optionFooter = this.optionFooter.bind(this);
      this.state = {
         currentState: "Add"
      };
      this.inputRef = React.createRef();
      this.headerRef = React.createRef();
      this.listToDo = React.createRef();
      this.pageNumber = React.createRef();
      this.pageOption = React.createRef();
   }

   onChange(event, id) {
      let { value } = event.target;
      const { listItem } = this.state;
      const copyList = [...listItem];
      const index = listItem.findIndex(e => e.id === id);
      copyList[index].title = value;
      this.setState({
         listItem: copyList
      })
   }

   optionFooter(event) {
      const { value } = event.target
      this.setState({
         currentState: value
      })
   }

   countLeft() {
      const { listItem } = this.state;
      const left = listItem.filter(e => e.isDone === false).length;
      return left;
   }

   updateParentState(value) {
      //const { optionHeader } = this.headerRef.current.state;
      this.setState({
         currentState: value
      })
   }

   render() {
      
      const { currentState } = this.state;
      return (
         <div className="App">
            <Header
               ref={this.headerRef}
               inputRef={this.inputRef}
               listToDo={this.listToDo}
               focusOption={this.focusOption}
               currentState={currentState}
               updateParentState={this.updateParentState.bind(this)}
            />
            <ListToDo
               ref={this.listToDo}
               headerRef={ this.headerRef }
               inputRef={this.inputRef}
               focusOption={this.focusOption}
               pageNumber={this.pageNumber}
               pageOption={this.pageOption}
               currentState={currentState}
               updateParentState={this.updateParentState.bind(this)}
            />
            <span className="Page">
               <PageOption
                  ref={this.pageOption}
               />
               <PageNumber
                  ref={this.pageNumber}
               />
            </span>
            <Footer

            />
         </div>
      );
   }
}

export default App;