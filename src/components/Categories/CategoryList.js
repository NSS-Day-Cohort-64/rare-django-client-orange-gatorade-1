import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categories";
import { CreateCategory } from "./CreateCategory";

export const CategoryList = () => {
    const [categoryList, setList] = useState([]);
    const [showForm, updateShowForm] = useState(false)

  const updateCategories = () => {
    getCategories()
      .then((categoryList) => {
        setList(categoryList);
      })
  }

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
        <article className="is-flex is-justify-content-space-evenly">
          
      
          <section className="categories">
            <h2 className="categoryList">List of Categories</h2>
            {categoryList
              .sort((a, b) => a.label.localeCompare(b.label)) 
              .map((list) => (
                <section className="category" key={list.id}>
                  <div className="categoryName">{list.label}</div>
                  <footer>{deleteButton()}</footer>
                  <footer>{editButton()}</footer>
                </section>
              ))}
          </section>
          <section className="createCategory">
            
          {
            showForm
              ? <CreateCategory
                updateShowForm={updateShowForm}
                categoryList={categoryList}
                updateCategories={updateCategories} />
              : <button className="showCreateCategory"
                onClick={click => updateShowForm(!showForm)}
              >Create New</button>
          }
          </section>
        </article>
      );
      

}

