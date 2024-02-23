const instance = axios.create({
    baseURL: "http://localhost:3000/products",
    headers: { "Content-Type": "application/json" },
  });
const productList = document.getElementById('productList')
const getProduct  = async () =>{
    try {
        const {data} = await instance.get('/')
        data.forEach((product) => {
            const trEle = document.createElement('tr')
            trEle.innerHTML = /*html*/`
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.desc}</td>
                <td>
                <button class='btn btn-primary' id="btnEdit${product.id}">Sửa</button>
                <button class='btn btn-danger' id="btnDelete${product.id}">Xóa</button>
                </td>
            `
            productList.appendChild(trEle)
            const btnEdit = document.getElementById(`btnEdit${product.id}`)
            btnEdit.addEventListener('click', ()=> editProduct(product.id))
            const btnDelete = document.getElementById(`btnDelete${product.id}`)
            btnDelete.addEventListener('click', ()=> deleteProduct(product.id))
        })
    } catch (error) {
        console.log(error);
    }
}
const editProduct = async (id) => {
    try {
        const btnUpdate = document.getElementById('btnUpdate')
        const {data} = await instance.get('/' + id)
        console.log(data);
        document.getElementById('name').value = data.name
        document.getElementById('price').value = data.price
        document.getElementById('desc').value = data.desc
        btnAdd.style.display = 'none'
        btnUpdate.style.display = 'block'
    } catch (error) {
        console.log(error);
}
    const btnUpdate = document.getElementById('btnUpdate')
        btnUpdate.onclick = async () => {
            const name = document.getElementById('name').value
            const price = document.getElementById('price').value
            const desc = document.getElementById('desc').value

            const formUpdate = {
                name,
                price,
                desc
            }
            await instance.put('/' + id, formUpdate)
        }
}
const btnAdd = document.getElementById('btnAdd')
btnAdd.addEventListener('click', ()=> addProduct())

const addProduct = async () => {
    try {
        const name = document.getElementById('name').value
        const price = Number(document.getElementById('price').value)
        const desc = document.getElementById('desc').value
        if(validate(name,price,desc)){
            const formAdd = {
                name,
                price,
                desc
            }
            await instance.post('/' ,formAdd)            
        }
    } catch (error) {
       console.log(error); 
    }
}
const deleteProduct = async (id) => {
    const cf = confirm('muon xoa k')
    if (cf) {
        const {data} = await instance.delete('/' + id)
        if (data) {
            alert('da xoa')
        }
    }
}
const validate =  (name, price, desc) => {
    if (name == '' || price == '' || desc == '' ) {
        alert('không được bỏ trống')
        return 
    }
    if(!Number(price)){
        alert('price phai la so')
        return
    }
    if (price < 0) {
        alert('price phai lon hon 0')
        return 
    }
    return true
}

getProduct()