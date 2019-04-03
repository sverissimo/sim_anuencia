import React from 'react';

const HomeTemplate = (props) => {
   
  return (
    <div>
      <div className="card-panel" style={{backgroundImage: `url(${"/images/home_bg.jpg"})`}}>
        <div className="container" style={{paddingBottom: '2%'}}>
          <h1 className="display-3"> <strong>
            <span style={{ color: 'white' }} >Anuência Digital</span> </strong> </h1>
          <h6 style={{ color: 'white', fontWeight: '500' }}>
            Versão 1.1.5
          </h6>          
        </div>
      </div>

      <div className="container">
        <div className="row">
         {props.children}
        </div>
      </div>
    </div>



  )

};

export default HomeTemplate;