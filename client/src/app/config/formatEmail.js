const formatEmail = (empreend, modalidade, nomeEmpreendimento, munEmpreendimento, status) => {

    return `
        <div class="email">

            <strong>A/C ${empreend}</strong>
            <br />
            <p>Foi registrada uma movimentação do processo que solicita análise e emissão de Selo de Anuência 
                Prévia para o ${modalidade} <strong>${nomeEmpreendimento}</strong> situado no município de 
                ${munEmpreendimento}:</p>

            <p>${status}</p>

            <p>Para maiores informações, visite o site
        <a href="https://sim-anuencia.herokuapp.com/" target="_blank">https://sim-anuencia.herokuapp.com</a>
            </p>
            <br />
            <p>Atenciosamente,</p><p><em>Equipe da Agência de Desenvolvimento da RMBH</em></p>
        </div>
    `
}

export default formatEmail