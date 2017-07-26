
/*===== Model =====*/

var model = {
	
	currentCat: null,

	cats:[
		{
			name: 'a',
			img: '1.jpg',
			clickCount: 0
		},
		{
			name: 'b',
			img: '2.jpg',
			clickCount: 0
		}
	]
};

/*===== Octopus =====*/

var octopus = {

	init: function(){

		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
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
		model.currentCat.clickCount++;
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

			elem = document.createElement('li');
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

octopus.init();