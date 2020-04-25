var storage = sessionStorage;
//var storage = localStorage;
let cartItems = [];
function doFirst(){
    let itemString = storage.getItem('addItemList');
    let items = itemString.substr(0,itemString.length -2).split(', ');
    console.log(items); //["A1001", "A1006", "A1005", "A1002"]
    console.log("------------1");
    //-----------
    for(let i=0; i<items.length; i++){
        console.log(i, ":", items[i].substr(6));
        cartItems[i] = {};
        cartItems[i].prodNo = items[i].substr(6);
    }
    console.log("------------2");
    //-------------
    //newDiv = document.createElement('div'); 
    newTable = document.createElement('table');
    //老師是將table放進div，再將div放進cartList裡；我這邊是直接把newTable放進cartList裡面
    //newDiv.appendChild(newTable);
    document.getElementById('cartList').appendChild(newTable);

    total = 0;
    //每購買一個品項，就呼叫createCartList新增一個<tr>
    for(let key in items){  //use items[key]
        let itemInfo = storage.getItem(items[key]);
        createCartList(items[key],itemInfo);

        let itemPrice = parseInt(itemInfo.split('|')[2]);
        cartItems[key].price = itemPrice;
        total += itemPrice;
    }
    document.getElementById('total').innerText = total;

    //...................btnSendOrder
    document.getElementById("btnSendOrder").onclick = function(e){
        alert("buy")
        //-----------get all input
        let qtys = document.getElementsByName("qty");
        for(let i=0; i<qtys.length; i++){
            cartItems[i].qty = qtys[i].value;
        }

        //--------------------send data to server
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            alert(xhr.responseText);
            if( xhr.responseText.indexOf("OK")!=-1){ //OK
                storage.clear();
                document.getElementById("cartList").innerHTML = "";
                document.getElementsByClassName("sum")[0].innerHTML = "";
                document.getElementById("btnSendOrder").style.display ="none";
                alert("天然甘感謝您的購買！");
            }else{
                alert("請登入會員");
            }
        }

        let cartStr = JSON.stringify(cartItems);
        let url = "php/putOrder.php?cartItems=" + cartStr + "&total=" + document.getElementById("total").innerText;
        console.log("cart : ", url);
        xhr.open("get", url, true);
        xhr.send(null);

    }

}
function createCartList(itemId,itemValue){
    //alert(`${itemId} : ${itemValue}`);
    let itemTitle = itemValue.split('|')[0];
    let itemImage = 'images/cusFruits/' + itemValue.split('|')[1];
    let itemPrice = parseInt(itemValue.split('|')[2]);

    //建立每個品項的清單區域--tr
    let trItemList = document.createElement('tr');
    trItemList.claasName = 'item';  //trItemList.setAttribute('class','item);
    trItemList.id = itemId;
    //↑↑↑為了因應我的表格結構，要把itemId要放到button所在的父層，這樣刪除鍵才會生效

    newTable.appendChild(trItemList);

    //建立商品圖片--第一個td.tdImage(放圖片用)
    let tdImage = document.createElement('td');
    tdImage.className = 'tdImage';  //這一行跟老師的示範不一樣

    let image = document.createElement('img');
    image.src = itemImage;
    image.className = 'prodImage'; //購物車所有的商品圖片，class名稱都是"prodImage"

    tdImage.appendChild(image);
    trItemList.appendChild(tdImage);

    //建立商品名稱和價格--第二個td
    let tdTitle = document.createElement('td');
    //↓↓↓由我我的表格結構長得跟老師的不一樣，所以itemId不應該放入第二個td裡面，這樣第四個td(有刪除鍵的)會抓不到itemId
    // tdTitle.id = itemId;
    
    let hTitle = document.createElement('h3');
    hTitle.innerText = itemTitle;
    hTitle.className = 'prodName';

    let price = document.createElement('h4');
    price.innerText = `價格:${itemPrice}點`; 
    //`價格${itemTitle}點`;
    price.className = 'priceLabel';

    tdTitle.appendChild(hTitle);
    tdTitle.appendChild(price);
    trItemList.appendChild(tdTitle);

    //建立數量--第三個td
    let tdItemCount = document.createElement('td');

    let  titleCount = document.createElement('h4');
    titleCount.innerText = '數量:';
    titleCount.style.textAlign = 'left';
    titleCount.style.lineHeight = '1.3';
    
    let itemCount = document.createElement('input');
    itemCount.type = 'number';
    itemCount.value = 1;
    itemCount.min = 1;
    itemCount.name="qty";
    
    let pSubtotal = document.createElement('p');
    pSubtotal.className = 'p_subtotal';

    itemCount.addEventListener('input',changeItemCount);
    tdItemCount.appendChild(titleCount);
    tdItemCount.appendChild(itemCount);
    tdItemCount.appendChild(pSubtotal);
    trItemList.appendChild(tdItemCount);

    pSubtotal.innerText = itemPrice * itemCount.value;
    //建立兩個按鈕--第四個td
    let tdButton = document.createElement('td');
    tdButton.className = 'td_button';

    // let cashButton = document.createElement('button');
    // cashButton.innerText = '單筆結帳';
    // cashButton.className = 'orange_btn';

    let delButton = document.createElement('button');
    delButton.innerText = '單筆刪除';
    delButton.className = 'grey_btn';
    delButton.addEventListener('click', deleteItem);
    let delIcon = document.createElement('img');

   // tdButton.appendChild(cashButton);
    //tdButton.appendChild(cashIcon);
    tdButton.appendChild(delButton);
    //tdButton.appendChild(delIcon);

    trItemList.appendChild(tdButton);
}
function deleteItem(){
    let itemId = this.parentNode.parentNode.getAttribute('id');
    alert(itemId);
    //1.扣除總金額
    //let itemValue = storage.getItem(itemId);
    let pSubtotal = this.parentNode.previousSibling.lastChild.innerText;

    //缺少項目數量
    //total -= parseInt(itemValue.split('|')[2]);
    total -=pSubtotal;

    document.getElementById('total').innerText = total;

    //2.清除storage資料
    storage.removeItem(itemId);
    storage['addItemList'] = storage['addItemList'].replace(`${itemId},`,' ');

    //3.刪除該筆tr
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    //↑↑↑這個指令長得跟老師的不一樣。this指的是這個button，第一個parentNode是包住刪除鍵的td,第二個parentNode是tr，第三個parentNode是table。我們要remove的是tr
}

function changeItemCount(){
    
    let itemId = this.parentNode.parentNode.id;
    let itemPrice = parseInt(storage.getItem(itemId).split('|')[2]);
    
    let pSubtotal = this.parentNode.lastChild;
    pSubtotal.innerText = itemPrice * this.value;
    let items = document.getElementsByClassName('p_subtotal');
    total = 0;
    for (let i = 0; i< items.length; i++) {
        total += parseInt(items[i].innerText);
    }
    document.getElementById('total').innerText = total;
}


window.addEventListener('load',doFirst);
