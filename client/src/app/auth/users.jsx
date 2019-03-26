import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from './authActions'
import Title from '../common/titleSubtitle'
import UserTemplate from './userTemplate'

class Users extends Component {

    async componentDidMount() {
        this.props.getUsers()
    }

    editUsers(e) {

    }

    render() {
        let users = this.props.auth.usersCollection

        return (
            <div className="container" style={{ width: '95%' }} >
                <div >
                    <Title
                        title='Gerenciar Usuários'
                        subtitle='Crie, remova ou edite as permissões/confirmações de cada usuário do sistema. '
                        color={this.props.redux.setColor}
                    />
                </div>
                <UserTemplate
                    users={users}
                />
            </div>

        )
    }
};

function mapStateToProps(state) {
    return {
        redux: state.cadastro,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getUsers }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)