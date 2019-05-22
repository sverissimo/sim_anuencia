import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from './authActions'
import { reduxToastr, loadTecnicos } from '../cadastro/cadActions'

import Title from '../common/titleSubtitle'
import UserTemplate from './userTemplate'
import Tecnicos from './tecnicos'
import { sortList } from '../functions/sort'

import axios from 'axios';

class Users extends Component {

    constructor() {
        super()
        this.escFunction = (event) => {
            if (this.state.editTec && event.keyCode === 27) this.setState({ editTec: false })
        }
    }

    state = {
        users: [],
        tecnicos: [],
        editTec: false,
        userId: '',
        showVerified: false,
        reverse: false
    }

    async componentDidMount() {
        const { getUsers, loadTecnicos } = this.props
        document.addEventListener("keydown", this.escFunction, false)

        await getUsers()
        await loadTecnicos()
        const { auth, redux } = this.props
        this.setState({ users: auth.usersCollection, tecnicos: redux.tecCollection })


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
        const user = this.state.users.filter(user => user._id.match(id))[0]

        if (window.confirm(`Excluir ${user.name} ${user.surName}?`)) {
            await axios.delete(`/api/delete/item?id=${id}&el=user`)
                .catch(err => console.log(err))
            await this.props.getUsers()
            this.setState({ users: this.props.auth.usersCollection })
        }
    }

    editTec(e) {
        this.setState({ editTec: !this.state.editTec, userId: e.target.id })
    }

    refresh() {
        this.setState({ editTec: !this.state.editTec })
        reduxToastr('sucess', 'Dados do técnico atualizados')
    }

    showVerified() {
        this.setState({ showVerified: !this.state.showVerified })
    }

    sort(criteria) {
        let { users, reverse } = this.state
        const orderedList = sortList(users, criteria)
        users = orderedList
        if (reverse === true) users = orderedList.reverse()

        this.setState({ ...this.state, users, reverse: !reverse })
    }

    render() {
        let { users, userId, tecnicos, showVerified, reverse } = this.state
        let usersView = users.filter(u => u.verified === false)

        if (showVerified) usersView = users.filter(u => u.verified === true)

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
                    users={usersView}
                    handleChange={this.handleChange.bind(this)}
                    deleteUser={this.deleteUser.bind(this)}
                    editUsers={this.editUsers.bind(this)}
                    editTec={this.editTec.bind(this)}
                    showVerified={this.showVerified.bind(this)}
                    verified={this.state.showVerified}
                    sort={this.sort.bind(this)}
                    reverse={reverse}
                />
                {this.state.editTec && <Tecnicos
                    users={users}
                    userId={userId}
                    tecnicos={tecnicos}
                    editTec={this.editTec.bind(this)}
                    refresh={this.refresh.bind(this)}
                />
                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        redux: state.cadastro,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUsers, reduxToastr, loadTecnicos }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)