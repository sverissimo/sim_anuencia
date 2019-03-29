import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from './authActions'
import { reduxToastr } from '../cadastro/cadActions'

import Title from '../common/titleSubtitle'
import UserTemplate from './userTemplate'
import axios from 'axios';

class Users extends Component {

    state = {
        users: [],
    }

    async componentDidMount() {
        await this.props.getUsers()
        this.setState({ users: this.props.auth.usersCollection })
    }

    handleChange(e) {

        let { users } = this.state
        let selectedUser
        let targetName = e.target.name

        let userData = []
        users.forEach(user => {
            const { name, surName, email, municipio, password, __v, ...usersFilter } = user
            userData.push(usersFilter)
        })

        selectedUser = users.filter(user => `${targetName + user._id}`.match(e.target.id))[0]
        let userIndex = users.indexOf(selectedUser)

        if (e.target.name !== 'v_') users[userIndex].role = e.target.value
        else users[userIndex].verified = !users[userIndex].verified

        this.setState({
            users: users
        })
    }

    async editUsers(e) {
        await axios.put(('/api/edit'), {
            el: 'user',
            item: this.state.users
        })
            .then(res => console.log(res))
            .catch(err => alert(err))
        this.props.getUsers(); reduxToastr('sucess', 'Registro alterado.')
    }

    async deleteUser(e) {
        const id = e.target.id.replace('d_', '')
        await axios.delete(`/api/delete/item?id=${id}&el=user`)
            .catch(err => console.log(err))
        await this.props.getUsers()
        this.setState({ users: this.props.auth.usersCollection })
    }

    render() {
        let { users } = this.state

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
                    deleteUser={this.deleteUser.bind(this)}
                    editUsers={this.editUsers.bind(this)}
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

    return bindActionCreators({ getUsers, reduxToastr }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)