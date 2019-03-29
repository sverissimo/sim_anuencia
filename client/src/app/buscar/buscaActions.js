export function disableEdit() {
    return {
        type: 'DISABLE_EDIT',
    }
}

export function handleEdit(itemId) {
    return {
        type: 'FIND_EMP_ID',
        payload: itemId
    }
}

export function changeHandler(e) {
    return {
        type: 'CHANGE_SEARCH_VALUE',
        payload: e
    }
}

export function editValue(val) {
    return {
        type: 'EDIT_VALUE',
        payload: val
    }
}