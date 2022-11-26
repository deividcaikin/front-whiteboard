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
                    <div className="board-container">
                        <Board color={this.state.color} size={this.state.size}/>

                    </div>
                </div>
            </>

        )
    }
}