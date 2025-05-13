import { useParams } from "react-router-dom";

export const Crypto = () => {

    const { id } = useParams();
    console.log(id);
    
    return (
        <div>
            <h1>Crypto</h1>
        </div>
    )
}

export default Crypto;