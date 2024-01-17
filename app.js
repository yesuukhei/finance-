
//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrigs = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: '.add__value',
        addBtn:  '.add__btn'
    }

  return {
    getInput: function() {
        return {
            type: document.querySelector(DOMstrigs.inputType).value,

            description : document.querySelector(DOMstrigs.inputDescription).value,

            value: document.querySelector(DOMstrigs.inputValue).value

        };
    },
    getDOMstrings: function() {
        return DOMstrigs;
    }
  };
})();


// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }

})();


//Программын холбогч контроллер
var appController = (function(uiController, finController) {

    

    var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийн дэлгэцээс олж ана.
       console.log(uiController.getInput());
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгалана.
    // 3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь хадгалана.

    // 4. Төсвийг тооцоолно

    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд хэвлэнэ
    }
   
    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener('click', function(){
        ctrlAddItem(); });

    document.addEventListener("keypress", function(event) {
        if(event.keyCode === 13) {
            ctrlAddItem();
        }
    })
    }

    return {
        init: function() {
            console.log('Application started..');
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();