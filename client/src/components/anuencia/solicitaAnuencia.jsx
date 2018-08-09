import React, { Component } from 'react';
import SolicitaAnuenciaTemplate from './solicitaAnuenciaTemplate';
import SolicitaAnuenciaRow from './solicitaAnuenciaRow';

class SolicitaAnuencia extends Component {
    state = {
        config: [
            {
                label: 'Registro do Imóvel',
                tooltip: 'Certidão de Registro do Imóvel com negativa de ônus, emitida em até 30 dias antes da entrada do processo na Prefeitura Municipal.'
            },
            {
                label: 'Certidão Negativa de tributos municipais',
                tooltip: 'Certidão Negativa de tributos municipais.'
            },
            {
                label: 'Fotocópia da Identidade do proprietário',
                tooltip: 'Fotocópia da Identidade do proprietário; no caso de pessoa jurídica, fotocópia do contrato social e de suas alterações.'
            },



            {
                label: 'ART com comprovante de pagamento',
                tooltip: 'ART referente ao projeto com comprovante de pagamento'
            },
            {
                label: 'Declaração de conformidade',
                tooltip: 'Documento emitido pela Prefeitura Municipal declarando a conformidade do parcelamento com a legislação municipal'
            },
            {
                label: 'Comprovante de pagamento da DAE',
                tooltip: 'Comprovante de pagamento da taxa de expediente para emissão de anuência prévia por meio de Documento de Arrecadação Estadual'
            },




        ],
    }

    render() {
        return (
            <div>
                <SolicitaAnuenciaTemplate data={this.state}>
                    {
                        this.state.config.map((item, i) => {
                            return (
                                <SolicitaAnuenciaRow
                                object={item}
                                key={i}
                                />
                            )
                        })
                    }
                </SolicitaAnuenciaTemplate>
            </div>
        );
    }
}

export default SolicitaAnuencia;