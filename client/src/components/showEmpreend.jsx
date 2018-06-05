import React, { Component } from 'react';
import axios from 'axios';
import EmpreendTable from './showEmpTemplate';


class ShowEmpreend extends Component {

    state = {
        items: []
    }

    componentWillMount() {
        axios.get('/api/showEmpreend')
            .then(res => this.setState({ items: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {
                    this.state.items.map(item => {
                        return (<EmpreendTable
                            nome={item.nome}
                            email={item.email}
                            phone={item.phone}
                            rua={item.rua}
                            cidade={item.cidade}
                            item={item.uf}
                            cep={item.cep}
                            //HandleClick function will be called here
                            //This is the container component
                        />
                        )

                    })
                }

            </div>
        )
    }
}

export default ShowEmpreend;