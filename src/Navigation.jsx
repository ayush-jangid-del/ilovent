import { NavLink, useNavigate } from "react-router-dom";


function Navigation() {
  const navigate =useNavigate()
  const handletoke =async ()=>{
    sessionStorage.removeItem('token');
    navigate('/')

  }
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">

            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/all-page"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Page
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/all-category"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Category
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/all-faq"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Faq
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/all-contact"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/all-platform"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Platform
              </NavLink>
            </li>

             <li className="nav-item">
              <NavLink
                to="/all-submitform"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                Submit form
              </NavLink>
            </li>

          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <button className="nav-link d-flex align-items-center gap-2" onClick={handletoke}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
