import React from 'react';

const EditData = (props) => {

    const renderFields = () => {
        if (props.data.edit && props.data.item) {
            let itemEdit = props.data.item

            let itemArray = []

            for (let keys in itemEdit) {
                itemArray.push({
                    key: keys,
                    value: itemEdit[keys],
                })
            }

            itemArray.length > 14 ? itemArray = itemArray.slice(0, 12) : null
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

    if (props.data.edit && props.data.item) {
        return (
            <form onSubmit={props.submit} id={`${props.data.select}`} >
                {renderFields()}
            </form>
        )
    } else {
        return null
    }
}

export default EditData;