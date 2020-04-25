function popupOpenClose(popup) {

    /* 先判斷燈箱裡有沒有一個.wrapper的div, 沒有的話就加上 */
    if ($(".wrapper").length == 0) {
        $(popup).wrapInner("<div class='wrapper'></div>");
    }

    /* 開啟燈箱 */
    $(popup).show();

    /* 使用者點擊畫面空白處可以關閉燈箱 */
    $(popup).click(function(e) {
        if (e.target == this) {
            if ($(popup).is(':visible')) {
                $(popup).hide();
            }
        }
    });

    /* 點擊close按鈕可以關閉燈箱 */
    $(popup).find("button[name=close]").on("click", function() {
        if ($(".formElementError").is(':visible')) {
            $(".formElementError").remove();
        }
        $(popup).hide();
    });
}

$(document).ready(function() {
    popupOpenClose($(".popup"));
    // $('.linktoqna').click(function(){
    //     popupOpenClose($(".popup2"))
    // });
});