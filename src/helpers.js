export const containsMedia = (backlog, media) => {
    for(let i = 0; i < backlog.length; i++) {
        if(backlog[i].imdbID === media.imdbID) {
            return i;
        }
    }
    return -1;
}

export const swap = (arr, first, second) => {
    let newArr = [...arr];
    let temp = newArr[first];
    newArr[first] = newArr[second];
    newArr[second] = temp;
    return newArr;
}
