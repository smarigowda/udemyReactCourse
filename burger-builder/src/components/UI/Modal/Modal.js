import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  // following is a performance enhancement only
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[ Modal ] shouldComponentUpdate');
    console.log(`[ Modal ] nextProps.show = ${nextProps.show}`);
    console.log(`[ Modal ] this.props.show = ${this.props.show}`);
    // console.dir(`[ Modal ] nextProps.children = ${nextProps.children}`);
    // console.dir(`[ Modal ] this.props.children = ${this.props.children}`);
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentWillUpdate() {
    console.log('[Modal] componentWillUpdate');
  }
  render() {
    return (
      <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div className={classes.Modal}
        style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0',
        }}>
        {this.props.children}
      </div>
    </Aux>
    );
  }
}
export default Modal;