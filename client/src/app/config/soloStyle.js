export const soloStyle = (soloComponent) => {
    if (soloComponent === true) {
        const style = {
            position: 'fixed',
            top: '28%',
            right: '28%',
            left: '30%',
            height: '50%',
            borderRadius: '15px',
            backgroundColor: '#fcfcfc',
            padding: '15px 0px 0px 30px',
            border: '2px solid #aaa',
            marginBottom: '25px',
            marginTop: '25px',
            overflowY: 'auto',
            overflowX: 'hidden',
            zIndex: 1,
            padding: '2rem' 
        }
        return style
    }
}