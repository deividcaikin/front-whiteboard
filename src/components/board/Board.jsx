import React from 'react';
import './style.css'
import io from 'socket.io-client'

export default class Board extends React.Component {
    timeout;
    
    socket = io.connect(window.location.hostname+":8080",
        {
            upgrade: false,
            transports: ['websocket'], reconnection: true, forceNew: false
        });
    ctx;
    isDrawing = false;
    constructor(props) {
        super(props);
        this.socket.on('canvas-data', (data) => {
            var canvas = document.querySelector("#board");
            var ctx = canvas.getContext('2d');

            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineTo(data.x, data.y);
            ctx.stroke();
        })
        this.socket.on('ondown', (data) => {
            this.ctx.moveTo(data.x, data.y);

        })
        this.socket.on('onclear', (data) => {
            var canvas = document.querySelector("#board");
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            const img = new Image(window.innerWidth, window.innerHeight);
            img.src = canvas.toDataURL();

        })
    }
    componentDidMount() {
        this.drawOnCanvas();
    }
    componentWillReceiveProps(newProps) {
    }
    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;



        let x;
        let y;
        let mouseDown = false;

        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 5;

        window.onmousedown = (e) => {
            ctx.moveTo(x, y);
            this.socket.emit('down', { x, y });
            mouseDown = true;
        }
        window.onmouseup = (e) => {
            mouseDown = false;
        }

        window.onmousemove = (e) => {
            x = e.clientX;
            y = e.clientY-30;

            if (mouseDown) {
                this.socket.emit("canvas-data", { x, y });

                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }




    }

    render() {
        return (
            <>
                <div>
                    <button className='header'>Simple Whiteboard</button>
                    {/* <button className='btn' >Clear</button> */}
                </div>
                <div className="sketch" id="sketch">
                    <canvas className="board" id="board"></canvas>
                </div>
            </>

        )
    }
}