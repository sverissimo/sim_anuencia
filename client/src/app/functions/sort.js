export const sortList = (list, criteria) => {

    let orderedList = list.sort((a, b) => {
        if (a && b) {
            if (criteria === 'area' ) {
                a[criteria] = Number(a[criteria])
                b[criteria] = Number(b[criteria])
                if (a[criteria] > b[criteria]) {
                    return 1
                } else if (a[criteria] < b[criteria]) {
                    return -1
                }
                return null
            }
            else if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) {
                return 1
            } else if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) {
                return -1
            } else return 0
        } else {
            return null
        }
    })
    return orderedList
}

