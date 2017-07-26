
/*===== Model =====*/

var model = {
    
    currentCat: null,

    cats:[
        {
            name: 'ana',
            img: '1.jpg',
            count: 0
        },
        {
            name: 'melisa',
            img: '2.jpg',
            count: 0
        },
        {
            name: 'anastasia',
            img: '3.jpg',
            count: 0
        },
        {
            name: 'krystal',
            img: '4.jpg',
            count: 0
        },
        {
            name: 'karlie',
            img: '5.jpg',
            count: 0
        }


    ]
};

/*===== Octopus =====*/

var octopus = {

    init: function(){

        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
        adminView.init();

    },

    getCurrentCat: function(){
        return model.currentCat;
    },

    getCats: function(){
        return model.cats;
    },

    setCurrentCat: function(cat){
         model.currentCat = cat;
    },

    incrementCounter: function(){
        model.currentCat.count++;
        catView.render();
    }
};

var catView = {
    init: function(){
        this.catElem = document.getElementById('cat');
        this.catName = document.getElementById('cat-name');
        this.catImage = document.getElementById('cat-img');
        this.catCount = document.getElementById('cat-count');

        this.catImage.addEventListener('click',function(){
            octopus.incrementCounter();
        });
    this.render();
    },

    render: function(){
        var cat = octopus.getCurrentCat();
        this.catName.textContent = cat.name;
        this.catImage.src = cat.img;
        this.catCount.textContent = cat.count;
    }
};

var catListView = {
    init: function(){
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function(){
        var elem, cat, i;

        var cats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for(i=0; i<cats.length; i++){

            cat = cats[i];

            elem = document.createElement('div');
            elem.textContent = cat.name;

            elem.addEventListener('click',(function(catCopy){
                return function(){
                octopus.setCurrentCat(catCopy);
                catView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
    init: function(){
        this.adminElem = document.getElementById('admin');
        this.adminViewElem = document.getElementById('admin-view');
        this.formName = document.getElementById('form-name');
        this.formLink = document.getElementById('form-link');
        this.formCount = document.getElementById('form-count');
        this.cancelButton = document.getElementById('cancel-button');
        this.saveButton = document.getElementById('save-button');

        this.adminElem.addEventListener('click',function(){
            document.getElementById('admin-view').style.display ='block';
            adminView.render();
        });

    },

    render: function(){
        var cat;
        cat = octopus.getCurrentCat();
        console.log(cat);
        this.formName.value = cat.name;
        this.formLink.value = cat.img;
        this.formCount.value = cat.count;

        this.cancelButton.addEventListener('click',function(e){
            this.adminViewElem.style.display = 'none';
            e.preventDefault();
            adminView.reset();   
        });

        this.saveButton.addEventListener('click',function(e){
            cat.name = document.getElementById('form-name').value;
            cat.img = document.getElementById('form-link').value;
            cat.count = document.getElementById('form-count').value;
            e.preventDefault();
            adminView.render();
            catView.render();
            catListView.render();
            document.getElementById('admin-view').style.display = 'none';
        });
    }
};

octopus.init();