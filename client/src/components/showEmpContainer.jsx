import React, { Component } from 'react';
import axios from 'axios';
import ShowEmpTemplate from './showEmpTemplate';
import ShowEmpRow from './showEmpRow';

class ShowEmpContainer extends Component {

    state = {
        items: []
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

    render() {
        return (
            <div>
                <ShowEmpTemplate>
                    {
                        this.state.items.map(item => {
                            return (
                                <ShowEmpRow
                                    object={item}
                                    key={item._id}
                                    delete={this.deleteHandler.bind(this, item._id)}
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