import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Navigation from './Navigation'
import { useEffect } from 'react';

function Dashboard() {


  return (
    <>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <Navigation />
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
              <h1 class="h2">Dashboard</h1>
            </div>
            {/* <canvas
              class="my-4 w-100"
              id="myChart"
              width="900"
              height="380"
            ></canvas> */}

            <div className="col-md-3">
              <div className="border rounded p-3  text-center shadow-sm" style={{ backgroundColor: '#6b5757ef', color: 'white' }} >
                <h3>Page</h3>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  )


}

export default Dashboard