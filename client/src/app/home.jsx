import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from './cadastro/cadActions'
import HomeTemplate from './homeTemplate';

class Home extends Component {

  state = {
    setColor: ''
  }
  
  componentDidMount() {
    this.props.loadEmpData();
    this.props.loadRtData();
    this.props.loadProcessData();

    let color = document.getElementById('setcolor').style.backgroundColor
    this.setState({ setColor: color })

  }

  render() {
    return (
      <div>
        <HomeTemplate
          color={this.state.setColor}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.cadastro
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadEmpData, loadRtData, loadProcessData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);