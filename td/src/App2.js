import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Packingslipprint from './Pages/Packingslipprint';
import Reco from './Pages/Reco';
import Setnumreco from './Pages/Setnumreco';
import Scanreco from './Pages/Scanreco';
import Scansetnumberreco from './Pages/Scansetnumberreco';
import Scanpackingslip from './Pages/Scanpackingslip';

function App2() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/packingdata' element={<Packingslipprint />} />
                <Route path='/reco' element={<Reco />} />
                <Route path='/setnumreco' element={<Setnumreco />} />
                <Route path='/scanreco' element={<Scanreco></Scanreco>}></Route>
                <Route path='/scansetnumberreco' element={<Scansetnumberreco></Scansetnumberreco>}></Route>
                <Route path='/scanpackingslip/packingdata' element={<Scanpackingslip></Scanpackingslip>}></Route>
                {/* Add a route for the home page if needed */}
                {/* <Route path='/' element={<Home />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App2;
