import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from './cadastro/cadActions'
import HomeTemplate from './homeTemplate';
import HomeEmpreend from './homeEmpreend';
import HomePref from './homePref';

class Home extends Component {

  state = {
    setColor: ''
  }

  componentDidMount() {
    const user = { ...localStorage }

    this.props.loadEmpData();
    if (user.role !== 'empreend') this.props.loadRtData();
    this.props.loadProcessData();

    setTimeout(() => {
      let color = document.getElementById('setcolor').style.backgroundColor
      this.setState({ setColor: color })
    }, 450)
  }

  render() {

    const user = { ...localStorage }

    return (
      <div>
        <HomeTemplate>
          {user.role === 'empreend' && <HomeEmpreend color={this.state.setColor} user={user} />}
          {(user.role === 'prefeitura' || user.role === 'admin') && <HomePref color={this.state.setColor} />}
        </HomeTemplate>
      </div>
    )
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