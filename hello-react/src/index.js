import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './list';
let myContext = createContext()
const { Provider, Consumer } = myContext

let datas = {
  family: {
    title: '家人',
    list: [{ name: '爸爸' }, { name: '妈妈' }],
  },
  friend: {
    title: '朋友',
    list: [{ name: '张三' }, { name: '李四' }, { name: '王五' }],
  },
  customer: {
    title: '客户',
    list: [{ name: '阿里' }, { name: '腾讯' }, { name: '头条' }],
  },
};

export default class App extends Component {
  state = {
    openChild: '家人'
  }
  setOpen(name) {
    this.setState({
      openChild: name
    })
  }

  render() {
    return (
      <Provider value = {{datas}}>
        <div className="friend-list">
          <List></List>
        </div>
      </Provider>
      
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));