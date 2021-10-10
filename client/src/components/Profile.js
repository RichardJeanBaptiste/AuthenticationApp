import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Profile(){

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    let { id } = useParams();

    useEffect(() => {

        fetch('/check-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            // es-lint-disable-next-line
            body: JSON.stringify({loginId : id})
          })
          .then((response) => response.text())
          .then((data) => {
            if(data === 'Authenticated'){
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
          })

        // es-lint-disable-next-line
    },[])

    const ProfilePage = () => {
        if(isLoggedIn){
            return (
                <h1>Profile Page</h1>
            )
        }else{
            return (
                <h1>Not Logged In</h1>
            )
        }
    }

    return (
        <>
            {id}
            <ProfilePage/>
        </>
    )
}