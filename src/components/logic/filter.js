


const filterProduct = (prod,sort) =>{
    if(sort ){
      return prod.sort((a,b)=>sort === 'lowtohigh'?a.price - b.price:b.price - a.price)
    }
  }


export default filterProduct