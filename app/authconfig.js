
export const authConfig = {
    // providers is not written here as bcrypt lib is dependent on node.js
    providers:[],
    pages: {
        signIn: "/login",
    },
    callbacks:{
        authorized({auth,request}){
            const isLoggedIn = auth?.user
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
            if(isOnDashboard){
                if(isLoggedIn)
                    return true;
                return false;
            }
            else if(isLoggedIn){
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }
            return true;
        }
    }
};