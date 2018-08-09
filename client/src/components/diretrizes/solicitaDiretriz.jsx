import React, { Component } from 'react';
import SolicitaDiretrizTemplate from './solicitaDiretrizTemplate';
import SolicitaDiretrizRow from './solicitaDiretrizRow';

class solicitaDiretriz extends Component {
    state = {
        config: [
            {
                label: 'Diretrizes Municipais',
                tooltip: 'Diretrizes emitidas pela Prefeitura Municipal'
            },
            {
                label: 'Levantamento Planialtimétrico',
                tooltip: 'Planta baixa contendo o levantamento planialtimétrico. Ver requisitos abaixo'
            },
            {
                label: 'Comprovante de pagamento da DAE',
                tooltip: 'Comprovante de pagamento da DAE'
            },
        ],
    }

    render() {
        return (
            <div>
                <SolicitaDiretrizTemplate data={this.state}>
                    {
                        this.state.config.map((item, i) => {
                            return (
                                <SolicitaDiretrizRow
                                object={item}
                                key={i}
                                />
                            )
                        })
                    }
                </SolicitaDiretrizTemplate>
            </div>
        );
    }
}

export default solicitaDiretriz;