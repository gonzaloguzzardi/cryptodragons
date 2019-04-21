/*class Dragon {
  constructor(id, precio, imagen) {
    this.id = id;
    this.precio = precio;
    this.imagen = imagen;
  }
  set id(_id){
    return this._id;
  }
  set precio(_precio){
    return this._precio;
  }
  set imagen(_image){
    return this._imagen;
  }
  get id(){
    return this.id;
  }
  get precio(){
    return this.precio;
  }
  get imagen(){
    return this.imagen;
  }
}
class Consumible {
  constructor(id, precio, imagen, efecto) {
    this.id = id;
    this.precio = precio;
    this.imagen = imagen;
    this.efecto = efecto;
  }
  set id(_id){
    return this._id;
  }
  set precio(_precio){
    return this._precio;
  }
  set imagen(_image){
    return this._imagen;
  }
  set efecto(_efecto){
    return this._efecto;
  }
  get id(){
    return this.id;
  }
  get precio(){
    return this.precio;
  }
  get imagen(){
    return this.imagen;
  }
  get efecto(){
    return this.efecto;
  }
}
class UniqueObject {
  constructor(id, precio, imagen, efecto) {
    this.id = id;
    this.precio = precio;
    this.imagen = imagen;
    this.efecto = efecto;
  }
  set id(_id){
    return this._id;
  }
  set precio(_precio){
    return this._precio;
  }
  set imagen(_image){
    return this._imagen;
  }
  set efecto(_efecto){
    return this._efecto;
  }
  get id(){
    return this.id;
  }
  get precio(){
    return this.precio;
  }
  get imagen(){
    return this.imagen;
  }
  get efecto(){
    return this.efecto;
  }

}

var dragon1 = new Dragon(1, 1, "portada.jpg");
var dragon2 = new Dragon(2, 2, "portada2.jpg");
var dragon3 = new Dragon(3, 3, "portada3.jpg");
var dragon4 = new Dragon(4, 4, "portada.jpg");
var dragon5 = new Dragon(5, 5, "portada2.jpg");
var dragon6 = new Dragon(6, 6, "portada3.jpg");
var dragon7 = new Dragon(7, 7, "portada.jpg");
var dragon8 = new Dragon(8, 8, "portada2.jpg");

var consumible1 = new Consumible(1, 1, "consumible1.jpg", "matadragones");
var consumible2 = new Consumible(2, 2, "consumible2.jpg", "matadragones");
var consumible3 = new Consumible(3, 3, "consumible3.jpg", "matadragones");
var consumible4 = new Consumible(4, 4, "consumible1.jpg", "matadragones");
var consumible5 = new Consumible(5, 5, "consumible2.jpg", "matadragones");
var consumible6 = new Consumible(6, 6, "consumible3.jpg", "matadragones");
var consumible7 = new Consumible(7, 7, "consumible1.jpg", "matadragones");

var uniqueObject1 = new UniqueObject(1, 1, "uniqueobject1.jpg", "gema misteriosa");
var uniqueObject2 = new UniqueObject(2, 2, "uniqueobject2.jpg", "gema misteriosa");
var uniqueObject3 = new UniqueObject(3, 3, "uniqueobject3.jpg", "gema misteriosa");

var l_dragones = [dragon1,dragon2,dragon3,dragon4,dragon5,dragon6,dragon7,dragon8];
var l_consumibles = [consumible1,consumible2,consumible3,consumible4,consumible5,consumible6,consumible7];
var l_objunicos = [uniqueObject1,uniqueObject2,uniqueObject3];
*/

var dragon1 = {id:1, precio:1, imagen:"d1.png"};
var dragon2 = {id:2, precio:2, imagen:"d2.png"};
var dragon3 = {id:3, precio:3, imagen:"d3.png"};
var dragon4 = {id:4, precio:4, imagen:"d4.png"};
var dragon5 = {id:5, precio:5, imagen:"d5.png"};
var dragon6 = {id:6, precio:6, imagen:"d6.png"};
var dragon7 = {id:7, precio:7, imagen:"d7.png"};
var dragon8 = {id:8, precio:8, imagen:"d8.png"};

var consumible1 = {id:1, precio:1, imagen:"c1.png", efecto:"matadragones"};
var consumible2 = {id:2, precio:2, imagen:"c2.png", efecto:"matadragones"};
var consumible3 = {id:3, precio:3, imagen:"c3.png", efecto:"matadragones"};
var consumible4 = {id:4, precio:4, imagen:"c4.png", efecto:"matadragones"};
var consumible5 = {id:5, precio:5, imagen:"c5.png", efecto:"matadragones"};
var consumible6 = {id:6, precio:6, imagen:"c6.png", efecto:"matadragones"};
var consumible7 = {id:7, precio:7, imagen:"c7.png", efecto:"matadragones"};

var uniqueObject1 = {id:1, precio:1, imagen:"u1.png", efecto:"gema misteriosa"};
var uniqueObject2 = {id:2, precio:2, imagen:"u2.png", efecto:"gema misteriosa"};
var uniqueObject3 = {id:3, precio:3, imagen:"u3.png", efecto:"gema misteriosa"};

var l_dragones = [dragon1,dragon2,dragon3,dragon4,dragon5,dragon6,dragon7,dragon8];
var l_consumibles = [consumible1,consumible2,consumible3,consumible4,consumible5,consumible6,consumible7];
var l_objunicos = [uniqueObject1,uniqueObject2,uniqueObject3];

window.onload = function() {

  var numberPorPage = 3;

  var divCatalog = document.getElementById("catalogo");
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");


  //ADD DRAGONES
  var j = 0;
  var fila = document.createElement("tr");
  for (var i = 0; i < l_dragones.length; i++) {
    if ( j >= numberPorPage ){
        tblBody.appendChild(fila);
        j = 0;
        fila = document.createElement("tr");
    }
    var celda = document.createElement("td");
    var img = document.createElement("img");
    img.src = "./Images/" + l_dragones[i].imagen;
    img.height = 200;
    img.width = 200;

    var textoCelda = document.createTextNode(l_dragones[i].id);
    celda.appendChild(textoCelda);
    celda.appendChild(img);
    fila.appendChild(celda);
    j++;
  }
  tblBody.appendChild(fila);


  //ADD CONSUMIBLES
  var j = 0;
  var fila = document.createElement("tr");
  for (var i = 0; i < l_consumibles.length; i++) {
    if ( j >= numberPorPage ){
        tblBody.appendChild(fila);
        j = 0;
        fila = document.createElement("tr");
    }
    var celda = document.createElement("td");
    var img = document.createElement("img");
    img.src = "./Images/" + l_consumibles[i].imagen;
    img.height = 200;
    img.width = 200;
    var textoCelda = document.createTextNode(l_consumibles[i].id);
    celda.appendChild(textoCelda);
    celda.appendChild(img);
    fila.appendChild(celda);
    j++;
  }
  tblBody.appendChild(fila);

  //ADD UNIQUE ITEMS
  var j = 0;
  var fila = document.createElement("tr");
  for (var i = 0; i < l_objunicos.length; i++) {
    if ( j >= numberPorPage ){
        tblBody.appendChild(fila);
        j = 0;
        fila = document.createElement("tr");
    }
    var celda = document.createElement("td");
    var img = document.createElement("img");
    img.src = "./Images/" + l_objunicos[i].imagen;
    img.height = 200;
    img.width = 200;
    var textoCelda = document.createTextNode(l_objunicos[i].id);
    celda.appendChild(textoCelda);
    celda.appendChild(img);
    fila.appendChild(celda);
    j++;
  }
  tblBody.appendChild(fila);

  tabla.appendChild(tblBody);
  divCatalog.appendChild(tabla);
}
