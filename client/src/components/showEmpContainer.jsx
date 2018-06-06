import React, { Component } from 'react';
import axios from 'axios';
import ShowEmpTemplate from './showEmpTemplate';
import ShowEmpMap from './showEmpMap';


class ShowEmpContainer extends Component {

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
                <ShowEmpTemplate>
                {
                    this.state.items.map(item => {
                        return (
                        <ShowEmpMap object={item} key={item._id}/>                       
                        )
                    })
                }
                </ShowEmpTemplate>
              

            </div>
        )
    }
}

export default ShowEmpContainer;