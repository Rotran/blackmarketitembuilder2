import react from 'react';
import ReactDOM from 'react-dom';

export default class hello extends React.Component{
  render(){
    return <h1>Hello</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
