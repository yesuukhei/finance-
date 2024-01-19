
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
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem: function(type, desc, val) {
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
             id =  data.items[type][data.items[type].length - 1].id + 1;
            }


            if(type === 'inc') {
                item = new Income(id, desc, val)
            } else {
                item = new Expense(id, desc, val)
            }

            data.items[type].push(item);
        
        },

        seeData : function() {
            return data;
        }
    }

})();


//Программын холбогч контроллер
var appController = (function(uiController, finController) {
    var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийн дэлгэцээс олж ана.
    var input = uiController.getInput();

    console.log(input);
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгалана.
    financeController.addItem(input.type, input.description, input.value);
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