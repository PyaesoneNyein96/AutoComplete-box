


const api = "https://fakestoreapi.com/products";


let productData;

// fetch(api).then((response)=>{
//     const fetchData = response.json();
//     return fetchData;
// }).then((getData)=>{
//     finaldata = getData;
// })

//------------
// const change = async()=>{ 
//     const fetchdata = await fetch(api);
//     const getData = fetchdata.json();

//     finaldata = await getData;
//     console.log(finaldata);
// }
// change();
//------------
const change = async () => {
    productData = await (await fetch(api)).json();
    console.log("Data has Arrived", productData);
    inputboxTag.disabled = false;
}
change().catch((err) => {
    console.log("error :", err)
});

//-------------- 

const inputboxTag = document.querySelector(".inputbox");
const resultboxTag = document.querySelector(".resultBox");
const errMessage = document.createElement("div");
const cartContainer = document.querySelector(".cartContainer");



let productFilter = [];

inputboxTag.addEventListener("keyup", (event) => {

    if (event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter"
    ) {
        navigationSelector(event.key);
        return
    }

    const inputtext = event.target.value.toLowerCase();

    productFilter = productData.filter((product) => {
        return product.title.toLowerCase().includes(inputtext)

    });

    index = -1;
    resultboxTag.innerHTML = "";



    if (inputtext.length === 0) {
        return
    };
    const isThereProduct = productFilter.length > 0;
    if (isThereProduct) {
        for (let i = 0; i < productFilter.length; i++) {

            const productContainer = document.createElement("div");
            productContainer.classList.add("productContainer");
            productContainer.id = productFilter[i].id;

            const productName = document.createElement("div");
            productName.classList.add("productName");
            productName.append(productFilter[i].title);

            const productImg = document.createElement("img");
            productImg.classList.add("productImg");
            productImg.src = productFilter[i].image;

            productContainer.append(productName, productImg);
            resultboxTag.append(productContainer);
        }
    }
});

let index;

const navigationSelector = (key) => {

    try {
        if (key === "ArrowDown") {
            if (index === productFilter.length - 1) {
                index = -1;
                deselect();

     
                return
            }

            index += 1;
            select(index);

            index > 0 ? deselect() : //;
            select(index);


        } else if (key === "ArrowUp") {
            if (index === 0) {
                deselect();
                index = -1;
                return
            }
            if (index === -1) {
                index = productFilter.length - 1;
                console.log(index)
                select(index);
                console.log(index)
                return
            }
            index -= 1;
            deselect();
            select(index);


        } else {

            if (inputboxTag.value) {
                const left = document.querySelector(".left");
                left.classList.add("col-lg-6");

                const cartProduct = productFilter[index].id.toString();
                const cart = document.getElementById(cartProduct);
                cart.classList.add("cart");



                const itemContainer = document.createElement("div");
                itemContainer.classList.add("itemContainer");

                const btn = document.createElement("button");
                btn.classList.add("btn-close");

                itemContainer.append(cart, btn);


                cartContainer.append(itemContainer);

                btn.addEventListener("click", () => {
                    itemContainer.remove();
                    const hasChild = cartContainer.childElementCount;

                    if (hasChild > 0) {
                        //
                    } else {
                        left.classList.remove("col-lg-6");

                    }


                }) 
            }else{
                errMsg(err);
            }
            
            inputboxTag.value = "";
            resultboxTag.innerHTML = "";
           

        }

    } catch (err) {

        resultboxTag.innerHTML = "";
        errMsg(err);


    }


}

const select = (index) => {
    const selectProduct = productFilter[index].id.toString();
    const selectProductDiv = document.getElementById(selectProduct);
    selectProductDiv.style.backgroundColor = "#95a5a6"
    selectProductDiv.style.color = "white";
    selectProductDiv.classList.add("selected");
    return selectProductDiv;
}

const deselect = () => {
    const deselect = document.querySelector(".selected");
    deselect.style.backgroundColor = "white";
    deselect.style.color = "black";
    deselect.classList.remove("selected");
}

const errMsg = (err) => {
    errMessage.classList.add("alertbox");
    resultboxTag.append(errMessage)
    errMessage.innerHTML = "type something";


    setTimeout(() => {
        errMessage.classList.remove("alertbox");
        errMessage.innerHTML = "";

    }, 2000);

    console.log("error", err);
}

