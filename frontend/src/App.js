import React, {Component, createRef} from 'react';
import './App.css';

class App extends Component {

  canvas = createRef();

  state = {
    paints: []
  };

  componentDidMount() {
    this.websocket = new WebSocket('ws://localhost:8001/canvas');
    this.websocket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data) {
          switch (data.type) {
            case 'NEW_ARRAY':
              this.context = this.canvas.getContext('2d');
              this.imageData = this.context.createImageData(1, 1);
              this.d = this.imageData.data;

              data.array.forEach((pixel) => {
                this.context.putImageData(this.imageData, pixel.x, pixel.y);
              });
              break;
            default:
              break;
          }

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
    let points = [...this.state.paints];
    points.push(paint);
    this.setState({
      paints: points
    });
    this.websocket.send(JSON.stringify({
      type: 'PIXEL_ARRAY',
      array: this.state.paints
    }));
  };

  render() {
    console.log(this.state.paints);
    return (
        <>
          <canvas ref={this.canvas}
                  style={{border: '1px solid black'}}
                  width={700}
                  height={400}
                  onClick={this.onCanvasClick}/>
        </>
    )
  }
}

export default App;