import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from './cadastro/cadActions'
import HomeTemplate from './homeTemplate';

class Home extends Component {

  componentWillMount() {
    this.props.loadEmpData();
    this.props.loadRtData();
    this.props.loadProcessData();
  }

  render() {
        return (
      <div>
        <HomeTemplate />
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