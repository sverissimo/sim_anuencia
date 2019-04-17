const verifyEmail = (empreend, link) => {

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
            <p>Você foi cadastrado no sistema Anuência Digital, da Agência de Desenvolvimento da Região Metropolitana de Belo Horizonte.
            Para confirmar seu cadastro, clique no link abaixo.
            </p>

            <p>
        <a href="${link}" target="_blank">Confirmar Cadastro</a>
            </p>            
            <p>Atenciosamente,</p>
            <p><em>Equipe da Agência de Desenvolvimento da RMBH</em></p>
        </div>
    `
}

module.exports = { verifyEmail }