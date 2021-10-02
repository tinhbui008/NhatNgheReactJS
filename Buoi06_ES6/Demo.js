//ES6 - ECMA2015

//1. Phân biệt let, var, const
//let: biến, phạm vi block {}
//var: global ==> ko nên xài
//const: hằng số, phạm vi block {}
function demo() {
    var x = 7;
    let y = 5;
    console.log("x=",x,"y=",y)
}
//console.log("outside x = ", x)
//console.log("outside y = ", y)

//2. Arrow function (hàm mũi tên)
const demo_another = () => {
    console.log("Inside demo another")
}
const cong = (a = 2, b = 1) => {
    return a + b;
}
console.log(demo_another())
console.log(cong())
console.log(cong(1))
console.log(cong(12, 4))

//3. Vòng lặp for/of
let cars = ["BMW", "Audi", "Mercedes",
    "VinFast", "Honda", "KIA"]
for (let car of cars) {
    console.log("Sẽ mua", car)
}
//hàm map
cars.map(item => {
    console.log("Buy a", item)
});


//4. Rest parameters (param có dấu 3 chấm)
const sum = (...args) => {
    let total = 0;
    for (let item of args) {
        total += item;
    }
    return total;
}
console.log(sum(1))
console.log(sum(1,9,11))
console.log(sum(1, 9, 11, 19, 31))

//5. ES6 Literal (chuỗi có format)
hoTen = "Nhất Nghệ"
console.log(`Xin chào bạn ${hoTen}`)
console.log(`Bạn ${2021 - 2003} tuổi`)

//6. Destructing (object/array)
let ngayThanhLap = [10, 3, 2003]
let [ngay, thang, nam] = ngayThanhLap;
console.log(ngay)
console.log(thang)
console.log(nam)
let [, month,] = ngayThanhLap;
console.log("Thang:", month)

let hocVien = {
    "ten": "Nhất Nghệ",
    "tuoi": 18,
    "conDiHoc": true
}
let { ten: tengi, tuoi, conDiHoc } = hocVien;
console.log(tengi)
console.log(tuoi)
console.log(conDiHoc)
