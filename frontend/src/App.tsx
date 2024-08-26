import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Appbar } from "./components/Appbar";
import { Blogs } from "./pages/Blogs";
import { CreateandEdit } from "./pages/CreateandEdit";
function App() {
  return (
    <>
      <Appbar />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/id/:id" element={<Blog />} />
          <Route path="/blog/all" element={<Blogs />} />
          <Route path="/create" element={<CreateandEdit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
