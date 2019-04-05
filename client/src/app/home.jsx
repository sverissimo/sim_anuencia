import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from './cadastro/cadActions'
import HomeTemplate from './homeTemplate';
import HomeEmpreend from './homeEmpreend';
import HomePref from './homePref';
import HomeTecnico from './homeTecnico';

class Home extends Component {

  state = {
    setColor: ''
  }

  componentDidMount() {
    
    this.props.loadEmpData();
    this.props.loadRtData();
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
        <HomeTemplate user={user}>
          {(user.role === 'empreend' || user.role === 'rt') && <HomeEmpreend color={this.state.setColor} user={user} processes={this.props.data.processCollection}/>}
          {(user.role === 'prefeitura' || user.role === 'admin') && <HomePref color={this.state.setColor} />}
          {(user.role === 'tecnico') && <HomeTecnico color={this.state.setColor} />}
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