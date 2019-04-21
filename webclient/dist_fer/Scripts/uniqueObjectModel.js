class UniqueObject {
  constructor(id, precio, imagen, efecto) {
    this.id = id;
    this.precio = precio;
    this.imagen = imagen;
    this.efecto = efecto;
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
