var storage = sessionStorage;
//var storage = localStorage;
function doFirst(){
    if(storage['addItemList'] == null){
        storage['addItemList'] = '';
    }

    //建立示建聆聽功能
    let list = document.querySelectorAll('.putin');
    for(let i=0; i<list.length; i++){
        list[i].addEventListener('click', function(){
            let prodInfo = document.querySelector(`#${this.id} input`).value;
            addItem(this.id,prodInfo);
        });
    }
}
function addItem(itemId,itemValue){
    //---------------------------------------------
    //alert(`${itemId} : ${itemValue}`);
    let image = document.createElement('img');
    //控制圖片尺寸的大小以及來源
    image.style ='width:40px;';
    image.src = 'images/cusFruits/' + itemValue.split('|')[1];

    let title = document.createElement('span');
    //讓產生的span元素有個綠色邊框
    title.style = 'border:1px solid green';
    title.innerText = itemValue.split('|')[0];

    let price = document.createElement('span');
    price.innerText = parseInt(itemValue.split('|')[2]);

    let newItem = document.getElementById('newItem');
    //newItem.appendChild(image);
    //newItem.appendChild(title);
    //newItem.appendChild(price);

    //存入storage
    if(storage[itemId]){
        //alert('您的購物車已經有這項商品了！');
    }else{
        //storage['addItemList'] += itemId + ', ';
        storage['addItemList'] += `${itemId}, `;
        storage[itemId] = itemValue;
    }

    //計算購買數量和小計
    let itemString = storage.getItem('addItemList');
    let items = itemString.substr(0,itemString.length - 2).split(', ');
    console.log(items);  //["putin_1","putin_2","putin_3"]

    subtotal = 0;
    for(let key in items){  //use items[key]
        let itemInfo = storage.getItem(items[key]);
        let itemPrice = parseInt(itemInfo.split('|')[2]);

        subtotal += itemPrice;
    }


    document.getElementById('itemCount').innerText = items.length;
    document.getElementById('subtotal').innerText = subtotal;
    document.getElementById('a_count').innerText = items.length;
    document.getElementById('b_count').innerText = items.length;
}
window.addEventListener('load',doFirst)