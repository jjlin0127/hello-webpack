var state = {
  selectedFruits: [],
  totalPrice: 0,
  healthyValue1 : 0, 
  healthyValue2 : 0, 
  healthyValue3 : 0
}
var newImg = document.createElement('img');
var storage = sessionStorage;

window.addEventListener("load",function(){
  //獲取果甘
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status == 200) {
        cusFruits = xhr.responseText;
        if(cusFruits=="error"){
          alert("出了一點問題, 取回果甘資料失敗")
        } else{
          success = JSON.parse(xhr.responseText);
          success.forEach(function(e){
            switch(e.healthyType){
              case "1": $("#layer1").append(
                ` <div>
                      <img src="./images/cusFruits/${e.fruitTypePic}" class="draggable" data-fruit="${e.fruitTypeNo}"
                          data-price="${e.fruitUnitPrice}" data-point1="1" data-point2="0" data-point3="0">
                      <span></span>
                  </div>
                `
              ); 
              break;
              case "2": $("#layer2").append(
                ` <div>
                      <img src="./images/cusFruits/${e.fruitTypePic}" class="draggable" data-fruit="${e.fruitTypeNo}"
                          data-price="${e.fruitUnitPrice}" data-point1="0" data-point2="1" data-point3="0">
                      <span></span>
                  </div>
                `
              ); 
              break;
              case "3": $("#layer3").append(
                ` <div>
                      <img src="./images/cusFruits/${e.fruitTypePic}" class="draggable" data-fruit="${e.fruitTypeNo}"
                          data-price="${e.fruitUnitPrice}" data-point1="0" data-point2="0" data-point3="1">
                      <span></span>
                  </div>
                `
              ); 
              break;   
            }
          })
          $('[data-fruit]').click(addImg);
        }
    } else {
      alert(xhr.status);
    }
  }

  xhr.open("get", "../php/getCusfruits.php", true);
  xhr.send(null);
})

//選購過程
function addImg(e){
  if(state.selectedFruits.length<6) {
    var src = $(this).attr('src'); // "/build/images/foo.png"
    var fruitId = $(this).attr('data-fruit');
    var unitPrice = $(this).attr('data-price');
    var healthyValue1 = $(this).attr('data-point1');
    var healthyValue2 = $(this).attr('data-point2');
    var healthyValue3 = $(this).attr('data-point3');
    newImg.src = src;
    newImg.dataFruit = fruitId;
    newImg.price = unitPrice;
    newImg.healthyIndex1 = healthyValue1;
    newImg.healthyIndex2 = healthyValue2;
    newImg.healthyIndex3 = healthyValue3;
    state.selectedFruits.push(fruitId);
    
    updateItemTotal()
    plusCountEach(state.selectedFruits,newImg.dataFruit)
    plusItemPrice()
    plusHealthyIndex1()
    plusHealthyIndex2()
    plusHealthyIndex3()
    updateData()
    
    $('#selectedTable').append(
      `<tr>
          <td>
            <img class="shown" src="${newImg.src}" data-fruit="${newImg.dataFruit}" data-price="${newImg.price}"
            data-point1="${newImg.healthyIndex1}" data-point2="${newImg.healthyIndex2}" data-point3="${newImg.healthyIndex3}">
          </td>
          <td class="droppedzone">
            <input type="reset" value="" class="btn_s" data-btn="${newImg.dataFruit}">
          </td>
        </tr>`
    );

    // $(this).siblings('span').append(
    //   `
    //   <input type="reset" value="" class="btn_s" data-btn="${newImg.dataFruit}">
    //   `
    // );

    $(`[data-btn="${newImg.dataFruit}"]`).unbind('click').click(removeNewImg);

    if(state.selectedFruits.length >= 6){
      $('[type="submit"]').removeClass("disabled");
    }
  } else {
    $("#alertBox").css("backgroundColor","firebrick").
                   css("boxShadow","2px 2px 5px rgba(178, 34, 34, 0.75)");
    $("#alertBox").removeClass('hidden');
    $("#alertMessage").html("太多好吃果甘讓你心動嗎? <br>但是不好意思^_^\" 只能選擇6樣喔!");

    setTimeout(function(){
        $("#alertBox").addClass('hidden');
    }, 2000);
  }
}


function removeNewImg(e) {
  e.preventDefault();

  toBeRemovedFruitId = $(this).attr('data-btn');
  itemIndex = state.selectedFruits.indexOf(toBeRemovedFruitId);
  state.selectedFruits.splice(itemIndex, 1);

  toBeMinusedIndex1 = $(`[data-btn="${toBeRemovedFruitId}"]`).parent('td').siblings().children('img').attr('data-point1');
  toBeMinusedIndex2 = $(`[data-btn="${toBeRemovedFruitId}"]`).parent('td').siblings().children('img').attr('data-point2');
  toBeMinusedIndex3 = $(`[data-btn="${toBeRemovedFruitId}"]`).parent('td').siblings().children('img').attr('data-point3');

  updateItemTotal()
  minusCountEach(toBeRemovedFruitId)
  minusItemPrice()
  minusHealthyIndex1(toBeMinusedIndex1)
  minusHealthyIndex2(toBeMinusedIndex2)
  minusHealthyIndex3(toBeMinusedIndex3)
  updateData()

  $(this).parent('td').parent('tr').remove();
  $('[type="submit"]').addClass("disabled");
}

function plusCountEach(array,value){
  var n = 0;
  $(`[data-fruit="${value}"]`).siblings().addClass("imgClicked");
  for(i = 0; i < array.length; i++){
      if(array[i] == value){n++}
  }
  $(`[data-fruit="${value}"]`).siblings().text(n);
  return n;
}

function minusCountEach(value){
  var n = $(`[data-fruit="${value}"]`).siblings().text();
  if(n>1){
    n--;
    $(`[data-fruit="${value}"]`).siblings().text(n);
  }else if(n<=1){
    $(`[data-fruit="${value}"]`).siblings().removeClass("imgClicked");
    $(`[data-fruit="${value}"]`).siblings().text("")
  }
}

function updateItemTotal() {
  $('#items').text(state.selectedFruits.length);
}

function plusItemPrice(){
  state.totalPrice += Number(newImg.price);
  $('#totalPrice').text(state.totalPrice); 
}

function minusItemPrice(){
  state.totalPrice -= Number(newImg.price);
  $('#totalPrice').text(state.totalPrice); 
}

function plusHealthyIndex1(){
  state.healthyValue1 += Number(newImg.healthyIndex1);
  return
}

function plusHealthyIndex2(){
  state.healthyValue2 += Number(newImg.healthyIndex2);
  return
}

function plusHealthyIndex3(){
  state.healthyValue3 += Number(newImg.healthyIndex3);
  return
}

function minusHealthyIndex1(a){
  state.healthyValue1 -= Number(a);
  return
}

function minusHealthyIndex2(b){
  state.healthyValue2 -= Number(b);
  return
}

function minusHealthyIndex3(c){
  state.healthyValue3 -= Number(c);
  return
}

function updateData(){
  heyChart.data.datasets[0].data[0] = Number(state.healthyValue1);
  heyChart.data.datasets[0].data[1] = Number(state.healthyValue2);
  heyChart.data.datasets[0].data[2] = Number(state.healthyValue3);
  heyChart.update();
}

$('[type="submit"]').click(function(){
  var checkPoint = $('#items').text()
  var cusFruitsName = $('[name="bagname"]').val()
  if(checkPoint==6){
    storage['cusFruitsName'] = cusFruitsName;
    storage['prodNo1'] = state.selectedFruits[0];
    storage['prodNo2'] = state.selectedFruits[1];
    storage['prodNo3'] = state.selectedFruits[2];
    storage['prodNo4'] = state.selectedFruits[3];
    storage['prodNo5'] = state.selectedFruits[4];
    storage['prodNo6'] = state.selectedFruits[5];
    storage['cusFruitsPrice'] = state.totalPrice;
  }else{
    $("#alertBox").css("backgroundColor","firebrick").
                   css("boxShadow","2px 2px 5px rgba(178, 34, 34, 0.75)");
    $("#alertBox").removeClass('hidden');
    $("#alertMessage").text("尚未添齊 6 種水果喔! 請再添購");

    setTimeout(function(){
    $("#alertBox").addClass('hidden');
    }, 2000);
  }
})