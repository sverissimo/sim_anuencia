import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../css/header.css'

import { logout } from '../auth/logout'
import { configHeader } from '../config/configHeader'
import { setColor } from '../cadastro/cadActions'

const Count = (props) => {

    let { item, processo } = props

    if (processo && processo.length > 0) {

        let counter = processo.filter(el => el.status.match(item)).length
        if (item === 'Diretrizes Metropolitanas emitidas') {
            counter += (processo.filter(el => el.status.match('Pendências')).length + processo.filter(el => el.status.match('Aguardando documentação')).length)
        }
        return (
            <div style={{ display: 'inline-block' }}>
                {counter > 0 ?
                    <sup style={{ fontSize: '0.9em', borderRadius: '50%', padding: '0px 5px', backgroundColor: 'red', fontWeight: '900' }}>
                        {counter}
                    </sup>
                    : counter === 0 ?
                        <sup> </sup>
                        :
                        null
                }
            </div>
        )
    }
    else return null
}

class Header extends Component {

    componentWillMount() {
        this.props.setColor()
    }

    render() {
        const { processo, color } = this.props
        const userRole = localStorage.getItem('role')
        const menu = [{ className: 'right hide-on-med-and-down', id: '' }, { className: 'side-nav', id: "mobile-demo" }]
        return (
            <nav>
                <div className="nav-wrapper" style={{ paddingLeft: 30, paddingRight: 30, backgroundColor: color }} id="setcolor" >
                    <Link to="/" className="brand-logo">
                        <i className="material-icons" style={{ fontSize: "30px" }} >home</i>
                    </Link>
                    <Link to="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                    {
                        menu.map((e, index) => (
                            <ul className={e.className} id={e.id} key={index}>
                                {
                                    configHeader(userRole).map((el, i) => (
                                        <li key={i + 100}>
                                            <Link to={el.endPoint}>{el.label}
                                                {el.item
                                                    ? <Count processo={processo} item={el.item} />
                                                    : <span />}
                                            </Link>
                                        </li>
                                    ))
                                }
                                {userRole === 'admin' && <li><Link to="/users"><i className="material-icons left" title='Usuários'>group</i></Link></li>}
                                {userRole === 'admin' && <li><Link to="/admin"><i className="material-icons left" title='Prefeituras'>account_balance</i></Link></li>}
                                <li><Link to="/myAccount"><i className="material-icons left" title='Alterar senha'>vpn_key</i></Link></li>
                                <li><Link to="/faleConosco"><i className="material-icons left" title='Fale conosco'>mail_outline</i></Link></li>
                                <li><Link to="/"><i className="material-icons left" onClick={()=> logout()} title='Sair'>logout</i></Link></li>
                            </ul>
                        ))
                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        processo: state.cadastro.processCollection,
        color: state.cadastro.setColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

