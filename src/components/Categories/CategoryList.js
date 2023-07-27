import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../managers/categories";

export const CategoryList = () => {
    const [categoryList, setList] = useState([]);

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setList(categoryList);
            })
        
    }, []); 

    const deleteButton = () => {
        return (<button>Delete </button>)
    } 

    const editButton = () => {
        return(<button> Edit</button>)
    }
    return (
        <>
          <h2 className="categoryList">List of Categories</h2>
      
          <article className="categories">
            {categoryList
              .sort((a, b) => a.label.localeCompare(b.label)) 
              .map((list) => (
                <section className="category" key={list.id}>
                  <div className="categoryName">{list.label}</div>
                  <footer>{deleteButton()}</footer>
                  <footer>{editButton()}</footer>
                </section>
              ))}
          </article>
        </>
      );
      

}

