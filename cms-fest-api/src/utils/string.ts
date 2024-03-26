
export function getRandomInt(min: number, max: number) {
    let data = new Date();
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + data.getDay() + data.getHours() + data.getMinutes() + data.getSeconds();
}


export function getRandomString() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz0123456789";
    let length = 8

    let res01 = getRandomInt(1111, 9999);

    var res02 = '';
    for (let i = length; i > 0; --i) {
        res02 += chars[Math.floor(Math.random() * chars.length)];
    }
    return res01 + res02;
}