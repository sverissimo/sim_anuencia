import React, { Component } from 'react';
import axios from 'axios';
import ShowEmpTemplate from './showEmpTemplate';
import ShowEmpRow from './showEmpRow';

class ShowEmpContainer extends Component {

    state = {
        items: [],
        search: ''
    }

    componentWillMount() {
        axios.get('/api/showEmpreend')
            .then(res => this.setState({ items: res.data }))
            .catch(err => console.log(err))
    }

    deleteHandler = (id) => {
        axios.get("/api/delEmpreend/" + id)

            .then(axios.get('/api/showEmpreend')
                .then(res => this.setState({ items: res.data }))
                .catch(err => console.log(err)))

            .then(console.log('Deleted'))

            .catch(err => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
        let i = 0
        let empreendedores = this.state.items,
            searchString = this.state.search.trim().toLowerCase();
        if (this.state.search) {
            empreendedores = this.state.items.filter((el) => el.nome.toLowerCase().match(searchString))
        }

        return (
            <div>
                <ShowEmpTemplate
                    search={this.state.search}
                    change={e => this.handleChange(e)}>
                    {
                        empreendedores.map((item, index) => {
                            return (

                                <ShowEmpRow
                                    object={item}
                                    key={index}
                                    delete={this.deleteHandler.bind(this, item._id)}
                                    i={i = i + 1}
                                />
                            )
                        })
                    }
                </ShowEmpTemplate>
            </div>
        )
    }
}

export default ShowEmpContainer;