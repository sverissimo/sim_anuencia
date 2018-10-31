const showDate = (date) => {

    if (/\d/.test(date)) {
        return new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear() + ', '+ new Date(date).getHours() + ':' + new Date(date).getMinutes()+'h'
    } else {
        return date
    }
};

export default showDate;