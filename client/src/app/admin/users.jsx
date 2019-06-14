import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../auth/authActions'
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
        reverse: false,
        vUsers: [],
        blockUsers: []
    }

    async componentDidMount() {
        const { getUsers, loadTecnicos } = this.props
        document.addEventListener("keydown", this.escFunction, false)

        await getUsers()
        await loadTecnicos()
        const { auth, redux } = this.props
        let vUsers = auth.usersCollection.filter(u => u.verified === true)
        let blockUsers = auth.usersCollection.filter(u => u.verified === false)

        this.setState({ users: auth.usersCollection, tecnicos: redux.tecCollection, vUsers, blockUsers })
    }

    handleChange(e) {

        let { users } = this.state
        let selectedUser
        let targetName = e.target.name

        selectedUser = users.filter(user => `${targetName + user._id}`.match(e.target.id))[0]
        let userIndex = users.indexOf(selectedUser)

        if (e.target.name === 'v_') users[userIndex].verified = !users[userIndex].verified
        else if (targetName === 'role') users[userIndex].role = e.target.value
        else if (targetName === 'municipio') users[userIndex].municipio = e.target.value

        this.setState({ users })
    }

    async editUsers(e) {
        e.preventDefault()
        const { users } = this.state

        await axios.put(('/api/edit'), {
            el: 'user',
            item: users
        })
            .then(res => { console.log('ok'); void res })
            .catch(err => alert(err))
        reduxToastr('sucess', 'Registro alterado.')

        await this.props.getUsers()

        let vUsers = users.filter(u => u.verified === true)
        let blockUsers = users.filter(u => u.verified === false)
        this.setState({ vUsers, blockUsers })
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
        let { vUsers, blockUsers, showVerified, reverse } = this.state

        let orderedList

        if (showVerified) {
            orderedList = sortList(vUsers, criteria)
            if (reverse === true) orderedList.reverse()
            this.setState({ vUsers: orderedList, reverse: !reverse })
        } else {
            orderedList = sortList(blockUsers, criteria)
            if (reverse === true) orderedList.reverse()
            this.setState({ blockUsers: orderedList, reverse: !reverse })
        }
    }

    render() {
        let { users, userId, tecnicos, showVerified, reverse, vUsers, blockUsers } = this.state

        let usersView = blockUsers
        if (showVerified) usersView = vUsers

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