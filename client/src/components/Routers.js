import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Home from "../pages/Home";
import Create from "../pages/Create";
import Single from "../pages/Single";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Navbar from "./Nav";
import Signup from "../pages/Signup";
import Scroll from "./Scroll";
import All from "../pages/All";
import About from "../pages/About";
import Bio from "../pages/Bio";
import Error from "../pages/Error";
import Blogs from "../pages/Blogs";
import { AuthProvider } from "../contexts/AuthContext";
import Edit from "../pages/Edit";
import Temp from "../pages/Temp";
import EditProfile from "../pages/EditProfile";
import CreateBlogPage from "./sections";
import PrivateRoutes from "../utils/PrivateRoute";

const RouterComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single/:id" element={<Single />} />
          <Route path="/profile/:id/:name" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/blogs" element={<Blogs />}>
            <Route index element={<All />} />
            <Route path="/blogs/all" element={<All />} />

            <Route path="/blogs/:name/:id/:uid" element={<Temp />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/section" element={<CreateBlogPage />} />
            <Route element={<PrivateRoutes />}>
            <Route path="/create" element={<Create />} />
           </Route>
          <Route path="/bio/:id" element={<Bio />} />
          <Route path="/edit/blog/:blog_uid" element={<Edit />} />
          <Route
            path="/edit/user/:user_id/:user_uid"
            element={<EditProfile />}
          />

          <Route path="/*" element={<Error />} />
        </Routes>
        <Scroll />
      </AuthProvider>
    </Router>
  );
};

export default RouterComponent;
