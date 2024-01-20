
//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrigs = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: '.add__value',
        addBtn:  '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        tusuvLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        huviLabel: '.budget__expenses--percentage',
        container: '.container'
    }


    // tusuv: data.tusuv,
    // huvi: data.huvi,
    // totalInc: data.totals.inc,
    // totalExp: data.totals.exp,
  return {
    deleteListItem: function(id){
        var el = document.getElementById(id);
        el.parentNode.removeChild(el);
    },
    
    tusuviigUzuuleh: function(tusuv){
        document.querySelector(DOMstrigs.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrigs.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMstrigs.expenseLabel).textContent = tusuv.totalExp;
        if(tusuv.huvi === 0)
        document.querySelector(DOMstrigs.huviLabel).textContent = tusuv.huvi;
        else document.querySelector(DOMstrigs.huviLabel).textContent = tusuv.huvi + '%';

    },

    getInput: function() {
        return {
            type: document.querySelector(DOMstrigs.inputType).value,

            description : document.querySelector(DOMstrigs.inputDescription).value,

            value: parseInt( document.querySelector(DOMstrigs.inputValue).value)

        };
    },
    getDOMstrings: function() {
        return DOMstrigs;
    },

    addListItem: function(item, type) {
        var html, list;
        // Орлого зарлагын элэмэнтийш агуулсан HTML ийг бэлтгэнэ
        if(type === 'inc') {
            list =  DOMstrigs.incomeList;

            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">##value##</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else {
            list = DOMstrigs.expenseList;
            html = html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">##value##</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилнө
        html = html.replace('%id%',item.id);
        html = html.replace("$$DESCRIPTION$$", item.description );
        html = html.replace("##value##",item.value);
        // Бэлтгэсэн HTMl ээ DOM руу хийж өгнө
        document.querySelector(list).insertAdjacentHTML('beforeend',html);
    },
    
    clearField: function() {
        var fields = document.querySelectorAll(DOMstrigs.inputDescription + ',' + DOMstrigs.inputValue);

        //convert list to array
        var fieldArr = Array.prototype.slice.call(fields);

        fieldArr.forEach(function(el, index, array) {
            el.value = "";
        });

        fieldArr[0].focus();

        // for(var i =0; i< fieldArr.length; i++) {
        //     fieldArr[i].value = "";
        // }
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
        },
        tusuv: 0,
        huvi: 0,
    }
    var calculateTotal = function(type) {
        var sum=0;
        data.items[type].forEach(function(el){
            sum += el.value;
        })

        data.totals[type] = sum;
    }

    return {
        deleteItem: function(type, id) {
            var ids = data.items[type].map(function(el){
                return el.id;
            });

            var index = ids.indexOf(id);

            if(index !== -1) {
                data.items[type].splice(index, 1);
            }
        },

        tusuvTootsoloh: function() {
            calculateTotal('inc');
            calculateTotal('exp');

            data.tusuv = data.totals.inc - data.totals.exp;

            //zarlagin huvi
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        tusviigAwah: function() {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            }
        },

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
            
            return item;
        
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
        if(input.description !== "" && input.value !== "")
        {
            // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгалана.
            var item =  financeController.addItem(input.type, input.description, input.value);
            // 3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь хадгалана.
            uiController.addListItem(item, input.type);
            uiController.clearField();
            // 4. Төсвийг тооцоолно
            financeController.tusuvTootsoloh();
            financeController.tusuvTootsoloh();
            // 5. Эцсийн үлдэгдэл
            var tusuv = financeController.tusviigAwah();
            //6. тооцоог дэлгэцэнд хэвлэнэ//
            uiController.tusuviigUzuuleh(tusuv);

        }

    
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

    document.querySelector(DOM.container).addEventListener('click',function(event){
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(id){
            var arr = id.split("-");
            var type = arr[0];
            var itemId = parseInt(arr[1]);
    
            // 1. Санхүүгийн модулиас  type, id ашиглан устгана
            financeController.deleteItem(type,itemId);
            // 2. Дэлгэц дээрээс энэ элэментийг устгана
            uiController.deleteListItem(id);
            // 3. Үлдэгдэл тооцоог шинэчилж харуулна
        }
        
    
    })

    }

    return {
        init: function() {
            console.log('Application started..');
            setupEventListeners();
            uiController.tusuviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0,
            });
        }
    }

})(uiController, financeController);

appController.init();