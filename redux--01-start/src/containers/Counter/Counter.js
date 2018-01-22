import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 8" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => {
            return dispatch({type: 'INCREMENT'});
        },
        onDecrementCounter: () => {
            return dispatch({type: 'DECREMENT'});
        },
        onAddCounter: () => {
            return dispatch({type: 'ADD', val: 8});
        },
        onSubtractCounter: () => {
            return dispatch({type: 'SUBTRACT', val: 15});
        }
    }
}
// can pass config to connect
export default connect(mapStateToProps, mapDispatchToProps)(Counter);