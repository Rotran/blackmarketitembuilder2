    var Item = Backbone.Model.extend({
        //Create a model to hold friend atribute
        name: null,
        ap: null,
        ad: null,
        id: 0,
        url: function (){
            return 'http://127.0.0.1:8080/fetchItemById/'+this.id
        }
    });
