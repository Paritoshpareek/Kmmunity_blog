import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarComponent";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";

export const UserContext = createContext({})

const App = () => {
    const [userAuth, setUserAuth] = useState({});
    useEffect(() => {
        let userInSession = lookInSession("user");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
    }, [])
    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }} >
            <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage />} />
                    <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                    <Route path="search/:query" element={<SearchPage />} />
                    <Route path="user/:id" element={<ProfilePage />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="blog/:blog_id" element={<BlogPage />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    );
}

export default App; 