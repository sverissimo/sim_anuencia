import React from 'react';

const EditData = (props) => {


    if (props.redux.editItem === true) {
        let itemEdit = []
        itemEdit = props.data.empCollection.filter(el => el._id.match(props.redux.empId) )
        console.log(itemEdit)
        return (
            <div>
                <form action="">
                    <input
                        type="text"
                        name="nome"
                        
                        value={props.data.items[props.redux.empId]}
                        onChange={props.change} />
                    <div className="input" >
                        <div>

                        </div>
                    </div>
                </form>
                <button className="btn-flat waves-effect btn-floating left red darken-3"
                    title="Voltar"
                    onClick={props.disableEdit}>
                    <i className="material-icons">arrow_back</i>
                </button>
            </div>
        )

    } else {
        return null
    }

}


export default EditData;




 /*  let configArray = [];
     for (let keys in this.props.data.empreendForm) {
         configArray.push({
             id: keys,
             settings: this.props.data.empreendForm[keys],
 
         })
     }
  */



    /*  if (props.data.empId) {
 
         return configArray.map((item, i) => {
             let config = item.settings
 
             return (
                 <div>
                     <form action="">
                         <div key={i} className={config.divClassName}>
                             <input type={config.type}
                                 className="active"
                                 name={config.name}
                             //onChange={props.handleChange}
                             //value={this.props.data[item.id]}
                             />
                             <label className="active"
                                 htmlFor={config.name}>
                                 {config.label}
                             </label>
                         </div>
                     </form>
                 </div>
             );
         })
     } else { */