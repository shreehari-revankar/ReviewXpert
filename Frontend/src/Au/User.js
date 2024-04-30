import { useState, useEffect } from "react";
import Signin from "./Signin";
import Login from "./Login";


function User(){

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css';
        link.integrity = 'sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    
        return () => {
          document.head.removeChild(link);
        };
      }, []);
    const [isSignin, setIsSignin] = useState(false);

    useEffect(() => {
        console.log('isSignin updated:', isSignin);
    }, [isSignin]);

    const toggleSignin = () => {
        setIsSignin(!isSignin);
    }



    return (
        <div className="my-body">
            {isSignin ? <Signin onToggle={toggleSignin} /> : <Login onToggle={toggleSignin} />}
        </div>
    );
}

export default User;
