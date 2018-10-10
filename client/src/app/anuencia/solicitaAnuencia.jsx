import React, { Component } from 'react';
import SolicitaAnuenciaTemplate from './solicitaAnuenciaTemplate';

class SolicitaAnuencia extends Component {
    state =
        {
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
                {
                    label: 'Memorial descritivo',
                    tooltip: 'Descrição sucinta do loteamento com suas características, áreas públicas, equipamentos etc. '
                },
                {
                    label: 'Memorial Descritivo do Projeto de Terraplenagem',
                    tooltip: 'O memorial deverá conter a determinação da inclinação dos taludes de corte e aterro e a caracterização do tipo de solo.'
                },
                {
                    label: 'Certidão da Cemig',
                    tooltip: 'Cemig'
                },
                {
                    label: 'Diretriz Técnica Básica (Copasa)',
                    tooltip: 'O memorial deverá conter a determinação da inclinação dos taludes de corte e aterro e a caracterização do tipo de solo.'
                },
                {
                    label: 'AAF ou Licença Ambiental de Instalação',
                    tooltip: 'Certidão de Dispensa (classe 1) Autorização Ambiental de Funcionamento (classe 3) ou LI (classe 5). '
                },



            ],
            config2: [
                {
                    label: 'Levantamento Planialtimétrico',
                    tooltip: 'mesma escala do Projeto Urbanístico, em sistema de coordenadas UTM e com delimitação e confrontantes compatíveis com a descrição da Certidão de Registro do imóvel'
                },
                {
                    label: 'Projeto Urbanístico',
                    tooltip: 'Com coordenadas UTM, curvas de nível e escala de 1:25000'
                },
                {
                    label: 'Projeto Urbanístico com mapa de Isodeclividade',
                    tooltip: 'Mapa de isodeclividade com intervalos 0 a 30%, 30 a 47% e acima de 47%'
                },
                {
                    label: 'Projeto de Terraplenagem',
                    tooltip: 'Projeto na mesma escala do Projeto Urbanístico e em sistema de coordenadas UTM'
                },
                {
                    label: 'Projeto de Drenagem',
                    tooltip: 'Projeto na mesma escala do Projeto Urbanístico e em sistema de coordenadas UTM'
                }
            ],
            setColor:''
        }

    componentDidMount() {
       
        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({
            setColor: color
        })

    }
    render() {
        return (
            <div>
                <SolicitaAnuenciaTemplate
                    data={this.state}
                    array={this.state.config}
                    array2={this.state.config2}
                />
            </div>
        );
    }
}

export default SolicitaAnuencia;