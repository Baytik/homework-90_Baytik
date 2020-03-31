import React, {Component, createRef} from 'react';
import './App.css';

class App extends Component {

  state = {
    paints: []
  };

  componentDidMount() {
    this.websocket = new WebSocket('ws://localhost:8001/canvas');
    this.websocket.onmessage = (message) => {
      try {
      const data = JSON.parse(message.data);
        if (data) {
          this.setState({paints: data})
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  onCanvasClick = (e) => {
    e.persist();

    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = 'red';
    ctx.fillRect(x - 5, y - 5, 10, 10);
    const paint = {
      x: x,
      y: y
    };
    this.websocket.send(JSON.stringify(paint))
  };

  canvas = createRef();

  render() {
    console.log(this.state.paints);
    return (
        <>
        <canvas width="1200" height="900" ref={this.canvas} onClick={this.onCanvasClick}/>
        </>
    )
  }
}

export default App;
