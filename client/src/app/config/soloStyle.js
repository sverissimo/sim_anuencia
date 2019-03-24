export const soloStyle = (soloComponent, height) => {
    if (soloComponent === true) {
        const style = {
            position: 'fixed',
            top: height[0],
            right: '15%',
            left: '15%',
            height: height[1],
            borderRadius: '15px',
            backgroundColor: '#fbfbfb',            
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