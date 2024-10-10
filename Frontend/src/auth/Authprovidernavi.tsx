// import { createUserRegister } from "@/api/userApi";
import {  AppState, Auth0Provider,  } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom"; 

type Props = {
    children: React.ReactNode;
};

const Authprovidernavi = ({ children }: Props) => {
    const navigate = useNavigate()

    // const { createUser } = createUserRegister();
    const domain = "dev-zf5e8av4e6h0kw1h.us.auth0.com"; 
    const clientId = "QzpYIMBjFju317eyl7loCnGVZyfThUIC";
    const redirecturi = "https://food-delivery-app-oigi.onrender.com";
    const audience = "Food-Delivery Project";

    if (!domain || !clientId || !redirecturi ||!audience ) {
        throw new Error("Unable to configure Auth0");
    }

    // Moving the hook inside the component

    const Onredirect = async (appState?:AppState) => {
      navigate(appState?.returnTo || '/auth-callback');
        // if (user?.sub && user?.email) {
        // //    createUser({auth0Id:user.sub, email:user.email})
        // }
        // console.log("User", user);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: redirecturi, audience}}
            onRedirectCallback={Onredirect}
            
        >
            {children}
        </Auth0Provider>
    );
};

export default Authprovidernavi;
