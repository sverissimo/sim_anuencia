import axios from 'axios'

const downloadFile = (e) => {
    axios({
        url: `/api/download/${e.target.id}`,
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.headers.originalname);
        document.body.appendChild(link);
        link.click();
    })
        .catch(err => {
            console.log(err)
            alert('Erro! Sessão expirada.')
            window.location.reload()
        })
}

export default downloadFile