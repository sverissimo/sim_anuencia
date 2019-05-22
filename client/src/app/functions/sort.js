export const sortList = (list, criteria) => {
    let orderedList = list.sort((a, b) => {
        if (a && b) {
            if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) {
                return 1
            } else if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) {
                return -1
            } else return 0
        } else {
            return
        }
    })
    return orderedList
}

