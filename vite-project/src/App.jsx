import React, { useState, useEffect } from 'react';


const Exercicio16 = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProduct] = useState([]);

  async function fetchData(){
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);
      
         if(!productsResponse.ok || !categoriesResponse.ok){
           throw new Error('Erro');
         }

      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

    setProdutos(productsData);
    setCategorias(categoriesData);
    setFilteredProduct(productsData)  
      
    } catch (error) {
      setError("Erro:",error);
    }finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    fetchData();
  }, [])


 

  const handleCategoryChange = (event) => {
    const category = event.target.value 
    setSelectedCategory(category);

if (category === ''){
  setFilteredProduct(produtos);
} else{
  const filtered = produtos.filter(product => product.category === category);
  setFilteredProduct(filtered);
}

    
  }

   


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


   return (
      <div>
        <h1>Produtos</h1>
        <select onChange={handleCategoryChange} defaultValue={selectedCategory}>
        <option value="" disabled> Selecione um produto</option>
          {categorias.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>



        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <strong>${product.price}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Exercicio16;