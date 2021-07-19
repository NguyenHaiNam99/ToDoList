import './App.css';
import ToDoItem from './components/ToDoItem/ToDoItem';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageNumber from './components/PageNumber/PageNumber';
import PageOption from './components/PageOption/PageOption';

class App extends Component {
  constructor() {
    super();
    this.optionFooter = this.optionFooter.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.addItem = this.addItem.bind(this);
    this.state = {
      listItem: [],
      currentState: "All",
      id: 0,
      currentPage: 1,
      sizePerPage: 3,
      currentItem: 0
    };
    this.inputRef = React.createRef();
    this.headerRef = React.createRef();
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

  addItem(value){
    const { listItem, id } = this.state;
    const copyList = [...listItem];
    const copyId = id + 1;
    copyList.push({ title: value, idDone: false, id });
    this.setState({
      listItem: copyList,
      id: copyId
    })    
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

  filterList(keyWord, optionHeader) {
    const { currentState, listItem } = this.state;
    let list = [...listItem];
    if (optionHeader === "Add") {
      switch (currentState) {
        case 'Active':
          list = listItem.filter(e => e.isDone === false);
          return list;
        case 'Completed':
          list = listItem.filter(e => e.isDone === true);
          return list;
        default:
          return list;
      }
    } else if (optionHeader === "Search") {
      this.setState({
        currentState: optionHeader
      })
      list = listItem.filter(e => e.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1)
      return list
    } else return list;
  }

  countLeft() {
    const { listItem } = this.state;
    const left = listItem.filter(e => e.isDone === false).length;
    return left;
  }

  nextPage(total) {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage < total ? currentPage + 1 : total
    })
  }

  prevPage() {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage > 1 ? currentPage - 1 : 1
    })
  }

  selectSize(event) {
    const { value } = event.target;
    this.setState({
      sizePerPage: value
    })
  }


  clickItem(event, id) {
    this.inputRef.current.focus();
    const { value } = event.target;
    this.setState({
      optionHeader: "Update",
      newItem: value,
      currentItem: id
    })
  }

  render() {
    const { listItem, id, currentPage, sizePerPage, currentItem } = this.state;
    const listItem1 = this.filterList();
    const lastIndex = currentPage * sizePerPage;
    const firstIndex = lastIndex - sizePerPage;
    const currentToDo = listItem1.slice(firstIndex, lastIndex);
    const total = Math.ceil(listItem1.length / sizePerPage) || 1;
    return (
      <div className="App">
        <Header ref={this.headerRef}
          inputRef={this.inputRef}
          id={id}
          listItem={listItem}
          currentItem={currentItem}
          addItem={this.addItem}
          filterList={this.filterList.bind(this)}
        />
        {
          currentToDo.length > 0 ? currentToDo.map((e) =>
            <ToDoItem
              key={e.id}
              item={e}
              removeItem={() => this.removeItem(e.id)}
              tickItem={() => this.tickItem(e.id)}
              onChange={(event) => this.onChange(event, e.id)}
              clickItem={(event) => this.clickItem(event, e.id)}
            />)
            : <h4>List Empty</h4>
        }
        <span className="Page">
          <PageOption sizePage={this.selectSize} />
          <PageNumber
            nextPage={() => this.nextPage(total)}
            page={currentPage}
            prevPage={this.prevPage}
            total={total}
          />
        </span>
        <Footer
          left={this.countLeft()}
          optionFooter={this.optionFooter}
        />
      </div>
    );
  }
}

export default App;