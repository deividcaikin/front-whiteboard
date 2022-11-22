import React from 'react';
import Board from '../board/Board'
import './style.css'

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#000000",
            size: "5"
        }
    }
    changeColor(params){
        this.setState({
            color: params.target.value
        })
    }

    changeSize(params){
        this.setState({
            size: params.target.value
        })
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className='tools-section'>
                        <div className="color-picker-container" value={this.state.color} onChange={this.changeColor.bind(this)}>
                            Color:
                            <input type="color" />
                        </div>
                        <div className="brush-size-container">
                            Brush Size:

                            <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                            </select>
                        </div>


                    </div>
                    <div className="board-container">
                        <Board color={this.state.color} size={this.state.size}/>

                    </div>
                </div>
            </>

        )
    }
}