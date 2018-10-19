import React from 'react';
import RenderSearch from '../common/renderSearch'
import RenderButtons from '../common/renderButtons'
import { DeleteButton, EditButton } from './../common/buttons'
import './../css/styles.css';

const ShowEmpRow = (props) => {

    let { redux, emps, rts, process, edit, deleteOne, data } = props
    let searchMatch = []

    if (emps && emps[0] && props.data.edit === false) {
        searchMatch = emps
    } else if (rts && rts[0] && props.data.edit === false) {
        searchMatch = rts
    } else if (process && process[0] && props.data.edit === false) {
        searchMatch = process
    } else {
        return null
    }

    return (
        <div className="col s12">

            <RenderSearch
                search={searchMatch}
                fields={[1, 2, 3, 4, 8, 11]}
                collection={redux.empCollection}
                rtCollection={redux.rtCollection}
                renderEmp={true}
                renderRt={true}
                color={data.setColor}

            />
            <div className="col s1 right">
                <RenderButtons
                    onClick={edit}
                    id='item._id'
                    icon='create'
                    title='Editar'
                    className='btn-flat waves-effect btn-floating blue red darken-3'
                />
            </div>
            {/*  <div className="col s1 right">
                <DeleteButton delete={deleteOne} id={item._id} />
            </div> */}
        </div>
    )
}

export default ShowEmpRow;