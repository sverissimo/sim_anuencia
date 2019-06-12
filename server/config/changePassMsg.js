const changePassMsg = (empreend, pass) => {

    return `
    <div style=" 
        position: relative;         
        font-size: 1rem; 
        font-family: sans-serif;
        background-color: white;  
        padding: 3%; 
        border: 1px solid #000;
        text-align: justify;
        text-justify: inter-word;
        border: 1px solid #bbbbbb;
        border-radius: 1%;
    ">    
            <strong>A/C ${empreend}</strong>
            <br />
            <p>Você solicitou a recuperação de sua senha no sistema Anuência Digital. Sua nova senha é:
            </p>
            <p>
            ${pass}
            </p>     
            <p>
            Você pode alterar sua senha a qualquer momento clicando na opção dispnível no canto superior direito do menu do sistema.
            </p>     
            <p>
            Em caso de dúvidas, responda esse e-mail ou acesse a opção de contato disponível no sistema.
            </p>
            <p>Atenciosamente,</p>
            <p><em>Equipe da Agência de Desenvolvimento da RMBH</em></p>
        </div>
    `
}

module.exports = { changePassMsg }