import './App.css';
import AddPage from './Component/Page/AddPage';
import AllPage from './Component/Page/AllPage';
import EditPage from './Component/Page/EditPage';

import AllCategory from './Component/Category/AllCategory';
import EditCategory from './Component/Category/EditCategory';
import AddCategory from './Component/Category/AddCategory';

import AllsubCategory from './Component/SubCategory/AllSubcategory';
import EditsubCategory from './Component/SubCategory/EditSubcategory';
import AddsubCategory from './Component/SubCategory/AddSubcategory';

import AllFaq from './Component/Faq/AllFaq';
import EditFaq from './Component/Faq/EditFaq';
import AddFaq from './Component/Faq/AddFaq';

import AllContact from './Component/Contact/AllContact';

import AllPlatForm from './Component/Platform/AllPlatform';
import EditPlatForm from './Component/Platform/EditPlatForm';
import AddPlatForm from './Component/Platform/AddPlatForm';

import AllSubmitform from './Component/SubmitForm/AllSubmitform';
import EditSubmitform from './Component/SubmitForm/EditSubmitform';


import Dashboard from './Dashboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute ';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Login />} />
          {/* Protected Routes */}
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/all-page' element={<ProtectedRoute><AllPage /></ProtectedRoute>} />
        <Route path='/add-page' element={<ProtectedRoute><AddPage /></ProtectedRoute>} />
        <Route path='/edit-page/:id' element={<ProtectedRoute><EditPage /></ProtectedRoute>} />


        <Route path='/all-category' element={<ProtectedRoute><AllCategory/></ProtectedRoute>} />
        <Route path='/add-category' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path='/edit-category/:category_id' element={<ProtectedRoute><EditCategory/></ProtectedRoute>} />

        <Route path='/all-subcategory/:category_id' element={<ProtectedRoute><AllsubCategory/></ProtectedRoute>}/>
        <Route path='/add-subcategory/:category_id' element={<ProtectedRoute><AddsubCategory /></ProtectedRoute>} />
        <Route path='/edit-subcategory/:subcategory_id' element={<ProtectedRoute><EditsubCategory/></ProtectedRoute>} />

        <Route path='/all-faq' element={<ProtectedRoute><AllFaq/></ProtectedRoute>}/>
        <Route path='/add-faq' element={<ProtectedRoute><AddFaq /></ProtectedRoute>} />
        <Route path='/edit-faq/:faq_id' element={<ProtectedRoute><EditFaq/></ProtectedRoute>} />

        <Route path='/all-contact' element={<ProtectedRoute><AllContact /></ProtectedRoute>} />

         <Route path='/all-platform' element={<ProtectedRoute><AllPlatForm/></ProtectedRoute>}/>
        <Route path='/add-platform' element={<ProtectedRoute><AddPlatForm /></ProtectedRoute>} />
        <Route path='/edit-platform/:platform_id' element={<ProtectedRoute><EditPlatForm/></ProtectedRoute>} />

         <Route path='/all-submitform' element={<ProtectedRoute><AllSubmitform/></ProtectedRoute>}/>
        <Route path='/edit-submitform/:submit_id' element={<ProtectedRoute><EditSubmitform/></ProtectedRoute>} />


      </Routes>
    </Router>
  );
}

export default App;
