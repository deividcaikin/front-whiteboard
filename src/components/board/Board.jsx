import React from 'react';
import './style.css'
import io from 'socket.io-client'

export default class Board extends React.Component {
    timeout;
    socket = io.connect("http://localhost:8080");
    ctx;
    isDrawing = false;
    size = this.props.size;
    color = this.props.color;
    constructor(props) {
        super(props);
        this.socket.on('canvas-data', (data) => {
            var canvas = document.querySelector("#board");
            var ctx = canvas.getContext('2d');


            //ctx.beginPath();
            
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = data.size;
            ctx.strokeStyle = data.color;
            //ctx.moveTo(data.x, data.y);
            ctx.lineTo(data.x, data.y);
            //ctx.closePath();
            ctx.stroke();
           
            //console.log("+++++++++++++++");
            //console.log({x:data.x,y:data.y});
        })
        this.socket.on('ondown', (data) => {
            this.ctx.moveTo(data.x, data.y);
            
        })
    }
    componentDidMount() {
        this.drawOnCanvas();
    }
    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
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

        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;
        
        window.onmousedown = (e) => {
            ctx.moveTo(x, y);
            this.socket.emit('down', { x, y });
            mouseDown = true;
        }
        window.onmouseup = (e) => {
            mouseDown = false;
        }
        // this.socket.on("canvas-data", ({x,y})=>{
        //     //ctx.moveTo(x,y);
        //     ctx.lineTo(x,y);
        //     ctx.stroke();
        // })
        

        this.socket.on('ondown', ({x,y})=>{
            ctx.moveTo(x,y);
        })
        window.onmousemove = (e) => {
            x = e.clientX;
            y = e.clientY;

            //console.log({x,y})
            if (mouseDown) {
                this.socket.emit("canvas-data", { x, y, size:this.size,color:this.color });

                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }




    }
    render() {
        return (
            <>
                <div className="sketch" id="sketch">
                    <canvas className="board" id="board"></canvas>
                </div>
            </>

        )
    }
}