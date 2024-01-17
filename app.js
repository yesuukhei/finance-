
//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  
})();


// Санхүүтэй ажиллах контроллер
var financeController = (function() {

})();


//Программын холбогч контроллер
var appController = (function(uiController, finController) {

    var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийн дэлгэцээс олж ана.
        console.log("Дэлгэцээс өгөгдлөө авах хэсэг");

    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгалана.


    // 3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь хадгалана.

    // 4. Төсвийг тооцоолно

    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд хэвлэнэ
    }
   
    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem(); });

    document.addEventListener("keypress", function(event) {
        if(event.keyCode === 13) {
            ctrlAddItem();
        }
    })

})(uiController, financeController);
