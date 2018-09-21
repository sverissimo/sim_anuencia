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

            function removeLast(arr, n) {
                arr.splice(arr.length - n, arr.length);
                return arr;
            }
            let filterArray = itemArray

            if (props.data.select === 'emp' && itemArray.length > 14) filterArray = removeLast(itemArray, 3)
            if (props.data.select === 'rt' && itemArray.length > 5) filterArray = removeLast(itemArray, 3)
            if (props.data.select === 'rt' && itemArray.length === 5) filterArray = removeLast(itemArray, 1)
            if (props.data.select === 'process') filterArray = removeLast(itemArray, 5)

            return filterArray.slice(1).map((item, i) =>

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