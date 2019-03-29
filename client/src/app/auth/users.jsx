import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from './authActions'
import Title from '../common/titleSubtitle'
import UserTemplate from './userTemplate'
import Axios from 'axios';

class Users extends Component {

    state = {
        users: [],
        role: '',
        verified: ''

    }
    async componentDidMount() {
        await this.props.getUsers()
        this.setState({ users: this.props.auth.usersCollection })
    }

    handleChange(e) {

        let { users } = this.state
        let selectedUser = users.filter(user => user._id.match(e.target.id))[0]
        let userIndex = users.indexOf(selectedUser)
        users[userIndex].role = e.target.value
        this.setState({
            users: users
        })
        console.log(this.state.users[userIndex])
    }

    verifyUser(e) {

        let { users } = this.state
        let selectedUser = users.filter(user => `v_${user._id}`.match(e.target.id))[0]
        let userIndex = users.indexOf(selectedUser)
        users[userIndex].verified = !users[userIndex].verified
        console.log(users[userIndex])

        this.setState({
            users: users
        })


        /* axios.put('/api/verifyUser', {
            _id: e.target._id,
            verified: verify
        }) */
    }

    editUsers(e) {

    }

    render() {
        let users = this.state.users

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
                    handleChange={this.handleChange.bind(this)}
                    verifyUser={this.verifyUser.bind(this)}
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