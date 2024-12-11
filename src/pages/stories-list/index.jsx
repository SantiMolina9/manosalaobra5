import { useEffect, useState } from "react";
import Header from "../../components/header";
import CargandoComponent from "../../components/CargandoComponent";
function StoriesList(){

    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/stories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setStories(data.data)
            setIsLoading(false);
        })
    }, [])

    return(
        <>
        <Header nombre = 'STORIES LIST'/>
    
        <div>
                <ul>
                    {
                    isLoading ? <CargandoComponent/> 
                    :
                    stories.map((story) => (
                                <li key={story._id} className="item-stories">
                                    <li className = "stories">
                                        <h2>{story.name}</h2>
                                        <p>{story.description}</p>
                                    </li>
                                    {console.log(story)}
                                </li>
                            ))
                        }
                </ul>
            </div>  
        </>
    )
}
export default StoriesList;
