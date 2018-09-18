import React from 'react';

const EditData = (props) => {


    const renderFields = () => {
        if (props.data.edit && props.data.item.nome) {
            let itemEdit = props.data.item

            let itemArray = []

            for (let keys in itemEdit) {
                itemArray.push({
                    key: keys,
                    value: itemEdit[keys],
                    config: props.redux.empreendForm
                })
            }

            itemArray.length === 15 ? itemArray = itemArray.slice(0, 12) : null
            return itemArray.slice(1).map((item, i) =>

                <div key={i} className="input-field col s3" >

                    <label className="active">{item.key.replace(/\w/, c => c.toUpperCase())}</label>
                    <input
                        type="text"
                        className="active"
                        name={item.key}
                        value={props.data.item[item.key]}
                        onChange={props.change} />

                </div>
            )

        } else {
            return null
        }
    }

    if (props.data.edit && props.data.item.nome ) {

        return (
            <form onSubmit={props.submit} id="empFormId" >
                {renderFields()}
                
            </form>
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