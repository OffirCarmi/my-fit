const makeId = (length = 7) => {
    let newId = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        newId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return newId
}

const convertTimestampToDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const date = String(dateObj.getDate());
    const month = String(dateObj.getMonth() + 1);
    const year = dateObj.getFullYear().toString().substr(-2);

    return `${date}/${month}/${year}`
}

const convertTimeToTimer = (time) => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(time % 1000).padStart(3, "0");

    return `${hours}:${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const isSameArray = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2)

const isEdited = (obj1, obj2) => {
    if (obj1.name !== obj2.name || obj1.weight !== obj2.weight || obj1.bodyAreaId !== obj2.bodyAreaId) return true;
    return false;  // אם הכל זהה, מחזירים false
}

export const utilService = {
    makeId,
    convertTimestampToDate,
    convertTimeToTimer,
    isSameArray,
    isEdited
}