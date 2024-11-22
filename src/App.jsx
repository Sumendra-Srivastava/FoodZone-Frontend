import { useEffect, useState } from "react";
import styled from "styled-Components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL="https://foodzone-backend-i1fq.onrender.com";



const App=()=>{
  const [data, setData]=useState(null);
  const[filteredData, setFilteredData]=useState(null);
  const [loading, setLoding]=useState(false);
  const [error, setError]=useState(null);
  const [selectedbtn, setSelectedbtn]=useState("all");
 
    useEffect(() =>{
 const fetchFoodData= async()=>{
    setLoding(true);

    try{


    const response = await fetch(BASE_URL);

    const json= await response.json();
   

    setData(json);
    setFilteredData(json);
    setLoding(false);
    
    } catch(error){
      setError("unable to fetch data");
    }

    
    
  };

  fetchFoodData();
    },[]);

    const filterFood=(type)=>{

      if(type === "all"){
        setFilteredData(data);
      setSelectedbtn("all");
      return;
      }
      const filter=data?.filter((food)=>
         food.type.toLowerCase().includes(type.toLowerCase())
  );      

  setFilteredData(filter);
  setSelectedbtn(type);
    };
    const filterbtns=[
      {
        name:"All",
        type: "all",
      },

      {
        name:"Breakfast",
        type: "breakfast",
      },

      {
        name:"Lunch",
        type: "lunch",
      },

      {
        name:"Dinner",
        type: "dinner",
      },
    ]




const searchFood=(e)=>{
  const searchValue=e.target.value;

  if(searchValue === ""){
    setFilteredData(null);
  }
  const filter=data?.filter((food)=> food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilteredData(filter);
};
  

  if(error)
    return <div>{error}</div>;
  if(loading) 
    return <div>loading...</div>;


  return (
  <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="search">
      <input onChange={searchFood}placeholder="Search Food..." />
      </div>
    </TopContainer>
    <FilterContainer>
      {filterbtns.map((value)=>(<Button 
        onClick={()=>filterFood(value.type)}>{value.name}</Button>
        ))}
    
    
    </FilterContainer>
    
    

  </Container>
  <SearchResult data={filteredData}/></>
  );
};
export default App;

export const Container=styled.div`
max-width: 1200px;
margin: 0 auto;

`;
const TopContainer=styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
  background-color: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
}

`;
const FilterContainer=styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 10px;
`;
 export const Button=styled.button`
background-color: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: aliceblue;
  color: red;
  font-weight: bold;
 
}

`;

