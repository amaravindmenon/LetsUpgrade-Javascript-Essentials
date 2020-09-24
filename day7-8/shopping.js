///////////////////////// cart update
let updatecart = () => {
    let count = 0;
    if (localStorage.cartlocal) {
        cart = JSON.parse(localStorage.cartlocal);
        cart.forEach(element => {
            count++;
        });
    }
    document.getElementById("productcount").innerText = `(${count})`
}

/////////////////////////// global variable
productarr = []
cart = [];
let sno = 0;


///////////////////////////////// add item in cart 
let addtocart = (id) => {
    if (localStorage.cartlocal) {
        isavilable = false;
        cartitem = JSON.parse(localStorage.cartlocal);
        cartitem.forEach(element => {
            if (element.pid == id) {
                isavilable = true;
            }
        });
        if (isavilable) {
            Swal.fire({
                icon: 'error',
                title: 'Ohh Snap!!',
                text: 'Product is already in cart',
            })
        } else {
            var cartobj = { "pid": id };
            cart.push(cartobj);
            localStorage.cartlocal = JSON.stringify(cart);
            updatecart();
            Swal.fire({
                icon: 'success',
                title: 'Cool!!.',
                text: 'Product Added into cart',
            })
        }
    } else {
        var cartobj = { "pid": id };
        cart.push(cartobj);
        localStorage.cartlocal = JSON.stringify(cart);
        updatecart();
        Swal.fire({
            icon: 'success',
            title: 'Cool!!.',
            text: 'Product Added into cart',
        })
    }

}


//////////////////////// display all cart product
let cartdisplay = () => {
    var template = "";
    if (localStorage.cartlocal) {
        cart = JSON.parse(localStorage.cartlocal);
        cart.forEach(cartit => {
            productarr = JSON.parse(localStorage.product);
            productarr.forEach(element => {
                if (cartit.pid == element.sno) {
                    template += `<div class="card p-4">
            <div class="row">
                <div
                    class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                    <img src="${element.pimg}"
                        height="300" width="300" alt="" srcset="">
                </div>
                <div class="col-md-7 col-11 mx-auto px-4 mt-2">
                    <div class="row">
                        <div class="col-6 card-title">
                            <h1 class="mb-4 product-name">${element.pname}</h1>
                            <p class="mb-2">${element.pdesc}</p>
                            <p class="mb-2">Color: <span>${element.pcolor}</span></p>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col-8 d-flex justify-content-between remove_wish">
                            <p> <i class="fas fa-trash-alt"> </i>&nbsp;Remove item</p>
                            <p> <i class="fas fa-heart"> </i>&nbsp;Remove item</p>
                        </div>
                        <div class="col-4 d-flex justify-content-end price_money">
                            <h3>$ <span id="iteamval">${element.pprice}</span> </h3>
                        </div>
                    </div>
                </div>
            </div>
          </div>`;
                }
            });
        });
        document.getElementById(`cartitems`).innerHTML = template;
    }
}


//////////////////////// display all product
function init() {
    var template = "";
    if (localStorage.product) {
        productarr = JSON.parse(localStorage.product);
        productarr.forEach(element => {
            sno++;
            template += `<div class="card p-4">
        <div class="row">
            <div
                class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                <img src="${element.pimg}"
                    height="300" width="300" alt="" srcset="">
            </div>
            <div class="col-md-7 col-11 mx-auto px-4 mt-2">
                <div class="row">
                    <div class="col-6 card-title">
                        <h1 class="mb-4 product-name">${element.pname}</h1>
                        <p class="mb-2">${element.pdesc}</p>
                        <p class="mb-2">Color: <span>${element.pcolor}</span></p>
                    </div>
                    <div class="col-6">
                        <ul class="pagination justify-content-end set-qty">
                            <button class="btn btn-primary" onclick="addtocart(${element.sno})" >Add To cart</button>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 d-flex justify-content-between remove_wish">
                        <p> <i class="fas fa-trash-alt"> </i>&nbsp;Remove item</p>
                        <p> <i class="fas fa-heart"> </i>&nbsp;Remove item</p>
                    </div>
                    <div class="col-4 d-flex justify-content-end price_money">
                        <h3>$ <span id="iteamval">${element.pprice}</span> </h3>
                    </div>
                </div>
            </div>
        </div>
      </div>`;
        });
    }
    document.getElementById(`procontainer`).innerHTML = template;
    updatecart()
}

init();

///////////////////////// insert data
additem.addEventListener('click', () => {
    pname = document.getElementById("pname").value;
    pcolor = document.getElementById("pcolor").value;
    pprice = document.getElementById("pprice").value;
    pimg = document.getElementById("pimg").value;
    pdesc = document.getElementById("pdesc").value;

    sno++;
    let itemobj = { "sno": sno, "pname": pname, "pcolor": pcolor, "pprice": pprice, "pimg": pimg, "pdesc": pdesc };
    productarr.push(itemobj)
    localStorage.product = JSON.stringify(productarr);
    init();
    $("#exampleModal").modal('hide')
    Swal.fire({
        icon: 'success',
        title: 'Cool!!.',
        text: 'Product Added',
    })

})


//////////////////////////// apply filter

applyfilter.addEventListener('click', () => {
    min = document.getElementById("minprice").value;
    max = document.getElementById("maxprice").value;
    if (min == "" || max == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Ohh Snap!!.',
            text: 'Fill the range',
        })
    } else {
        document.getElementById("resetfilter").classList.remove("hide");
        var template = "";
        if (localStorage.product) {
            productarr = JSON.parse(localStorage.product);
            productarr.forEach(element => {
                if (element.pprice >= min && element.pprice <= max) {
                    template += `<div class="card p-4">
          <div class="row">
              <div
                  class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                  <img src="${element.pimg}"
                      height="300" width="300" alt="" srcset="">
              </div>
              <div class="col-md-7 col-11 mx-auto px-4 mt-2">
                  <div class="row">
                      <div class="col-6 card-title">
                          <h1 class="mb-4 product-name">${element.pname}</h1>
                          <p class="mb-2">${element.pdesc}</p>
                          <p class="mb-2">Color: <span>${element.pcolor}</span></p>
                      </div>
                      <div class="col-6">
                          <ul class="pagination justify-content-end set-qty">
                              <button class="btn btn-primary" onclick="addtocart(${element.sno})" >Add To cart</button>
                          </ul>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-8 d-flex justify-content-between remove_wish">
                          <p> <i class="fas fa-trash-alt"> </i>&nbsp;Remove item</p>
                          <p> <i class="fas fa-heart"> </i>&nbsp;Remove item</p>
                      </div>
                      <div class="col-4 d-flex justify-content-end price_money">
                          <h3>$ <span id="iteamval">${element.pprice}</span> </h3>
                      </div>
                  </div>
              </div>
          </div>
        </div>`;
                }
            });
            document.getElementById(`procontainer`).innerHTML = template;
        }
    }
})


resetfilter.addEventListener('click', () => {
    document.getElementById('resetfilter').classList.add("hide");
    init();
})

////////////////// for clear textbox
let cleartextbox = () => {
    document.getElementById("pname").value = "";
    document.getElementById("pcolor").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pimg").value = "";
    document.getElementById("pdesc").value = "";
}