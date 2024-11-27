
import { useState } from 'react';
import BeamInwardEdit from './Pages/BeamInwardEdit';
import BeamInwardPrint from './Pages/BeamInwardPrint';
import BeamInwardReport from './Pages/BeamInwardReport';
import Beaminward from './Pages/Beaminward';
import Beaminwardprintsample from './Pages/Beaminwardprintsample';
import BillPending from './Pages/BillPending';
import Billing from './Pages/Billing';
import BillingReport from './Pages/BillingReport';
import Dashboard from './Pages/Dashboard';
import Packingprint from './Pages/PackingPrint';
import PackingSlip from './Pages/PackingSlip';
import PackingSlipEdit from './Pages/PackingSlipEdit';
import PackingSlipReport from './Pages/PackingSlipReport';
import Production from './Pages/Production';
import ProductionReport from './Pages/ProductionReport';
import Reconsilation from './Pages/Reconsilation';
import Setting from './Pages/Setting';
import YarnInward from './Pages/YarnInward';
import YarnInwardEdit from './Pages/YarnInwardEdit';
import YarnInwardReport from './Pages/YarnInwardReport';
import Signup from './Pages/Signup';


import Sidebar from './Sidebar';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import BillPrint from './Pages/BillPrint';
import BillEdit from './Pages/BillEdit';
import CompanyRegistration from './Pages/CompanyRegistration';
import CompanyBankDetails from './Pages/CompanyBankDetails';
import Companybedit from './Pages/Companybedit';
import Party from './Pages/Party';
import PartyEdit from './Pages/PartyEdit';
import ShiftSetting from './Pages/ShiftSetting';
import PasswordRecovery from './Pages/PasswordRecovery';
import ChartExamples from './Pages/ChartExamples';
import Title from './Pages/Title';
import Header from './sidebar/Header';
import Forgot from './Pages/Forgot';
import Landingpage from './Pages/Landingpage';
import LoomStatus from './Pages/LoomStatus';
import ProfileSetting from './Pages/ProfileSetting';
import MonthlyProduction from './Pages/MonthlyProduction';
import EmployeeManagement from './Pages/EmployeeManagement';
import AddEmployee from './Pages/AddEmployee';
import Attendance from './Pages/Attendance';
import Payroll from './Pages/Payroll';
import EmployeeAdvance from './Pages/EmployeeAdvance';
import Payslip from './Pages/Payslip';
import Employeeedit from './Pages/Employeeedit';
import DrawIn from './Pages/DrawIn';
import Beamdrawinpending from './Pages/Beamdrawinpending';
import Datewisereport from './Pages/Datewisereport';
import Datewisebeaminwardreport from './Pages/Datewisebeaminwardreport';
import Daterangepackingreport from './Pages/Daterangepackingreport';
import Daterangeyarninwardreport from './Pages/Daterangeyarninwardreport';
import Partybillpending from './Pages/Partybillpending';
import Partywisebillpending from './Pages/Partywisebillpending';
import Tablepagination from './Tablepagination';
import Table2 from './Table2';
import ProductionEdit from './Pages/ProductionEdit';
import ProductionEditDatewise from './Pages/ProductionEditDatewise';
import SetnumberwiseReco from './Pages/SetNumberwiseReco';
import Omkar from './Omkar';
import DrawinPrint from './Pages/DrawinPrint';
import Yarngatepassimage from './Pages/yarngatepassimage';
import MIS from './Pages/MIS';
import NewEncrypt from './NewEncrypt';
import Fabricpendingreport from './Pages/Fabricpendingreport';
import Designpaperprint from './Pages/Designpaperprint';
import TableToPDF from './Pages/TableToPDF'
import Billingsetting from './Pages/Billingsetting';
import Billprintcopy from './Pages/Billprintcopy';
import Packingslipbillpendingreport from './Pages/Packingslipbillpendingreport';
import Countconverter from './Countconverter';
import Sessionexpired from './Sessionexpired';
import Loggedout from './Loggedout';

import Privacypolicy from './Pages/Privacypolicy';
import Termsofservice from './Pages/Termsofservice';








function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(false);






  return (
   <>
   <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<Landingpage></Landingpage>}></Route>
    <Route path='/sidebar' element={<Sidebar></Sidebar>}></Route>
    <Route path='/dashboard' element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Dashboard>}></Route>
    <Route path='/beaminward' element={<Beaminward isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Beaminward>}></Route>
    <Route path='/production' element={<Production isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Production>}></Route>
    <Route path='/packingslip' element={<PackingSlip isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></PackingSlip>}></Route>
    <Route path='/yarninward' element={<YarnInward isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></YarnInward>}></Route>
    <Route path='/beaminwardreport' element={<BeamInwardReport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></BeamInwardReport>}></Route>
    <Route path='/packingslipreport' element={<PackingSlipReport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></PackingSlipReport>}></Route>
    <Route path='/yarninwardreport' element={<YarnInwardReport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></YarnInwardReport>}></Route>
    <Route path='/billingreport' element={<BillingReport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></BillingReport>}></Route>
    <Route path='/billpending' element={<BillPending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></BillPending>}></Route>
    <Route path='/setting' element={<Setting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Setting>}></Route>
    <Route path='/productionreport' element={<ProductionReport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ProductionReport>}></Route>
    <Route path='/billing' element={<Billing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billing>}></Route>
    <Route path='/beaminwardprint/:id1/:id2' element={<BeamInwardPrint></BeamInwardPrint>}></Route>
    <Route path='/beaminwardprintsample' element={<Beaminwardprintsample></Beaminwardprintsample>}></Route>
    <Route path='/beaminwardedit/:id' element={<BeamInwardEdit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></BeamInwardEdit>}></Route>
    <Route path='/reconsilation/:id/:id1' element={<Reconsilation></Reconsilation>}></Route>
    <Route path='/packingprint/:id1/:id2/:id3/:id4' element={<Packingprint></Packingprint>}></Route>
    <Route path='/packingslipedit/:id' element={<PackingSlipEdit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></PackingSlipEdit>}></Route>
    <Route path='/yarninwardedit/:id' element={<YarnInwardEdit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></YarnInwardEdit>}></Route>
    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/billprint/:id' element={<BillPrint></BillPrint>}></Route>
    <Route path='/billedit/:id' element={<BillEdit></BillEdit>}></Route>
    <Route path='/companyregistration' element={<CompanyRegistration isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CompanyRegistration>}></Route>
    <Route path='/companybankdetails' element={<CompanyBankDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CompanyBankDetails>}></Route>
    <Route path='/companybedit/:id' element={<Companybedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Companybedit>}></Route>
    <Route path='/party' element={<Party isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Party>}></Route>
    <Route path='/partyedit/:id' element={<PartyEdit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></PartyEdit>}></Route>
    <Route path='/shiftsetting' element={<ShiftSetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ShiftSetting>}></Route>
    <Route path='/passwordrecovery' element={<PasswordRecovery isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></PasswordRecovery>}></Route>
    <Route path='/chartexamples' element={<ChartExamples></ChartExamples>}></Route>
    {/* <Route path='/packingslipprint' element={<Packingslipprint></Packingslipprint>}></Route> */}
    <Route path='/title' element={<Title></Title>}></Route>
    <Route path='/header' element={<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>}></Route>
    <Route path='/forgot' element={<Forgot></Forgot>}></Route>
    <Route path='/loomstatus' element={<LoomStatus isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LoomStatus>}></Route>
    <Route path='/profilesetting' element={<ProfileSetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ProfileSetting>}></Route>
    <Route path='/monthlyproduction' element={<MonthlyProduction isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></MonthlyProduction>}></Route>
    <Route path='/employeemanagement' element={<EmployeeManagement isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></EmployeeManagement>}></Route>
    <Route path="/addemployee" element={<AddEmployee isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></AddEmployee>}></Route>
    <Route path='/attendance' element={<Attendance isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Attendance>}></Route>
    <Route path='/payroll' element={<Payroll isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Payroll>}></Route>
    <Route path="/employeeadvance/:id" element={<EmployeeAdvance isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></EmployeeAdvance>}></Route>
    <Route path="/payslip/:id/:id1/:id2" element={<Payslip></Payslip>}></Route>
    <Route path="/employeeedit/:id" element={<Employeeedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Employeeedit>}></Route>
    <Route path='/drawin' element={<DrawIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></DrawIn>}></Route>
    <Route path='/beamdrawinpending' element={<Beamdrawinpending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Beamdrawinpending>}></Route>
    <Route path='/datewisereport' element={<Datewisereport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Datewisereport>}></Route>
    <Route path='/datewisebeaminwardreport' element={<Datewisebeaminwardreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Datewisebeaminwardreport>}></Route>
    <Route path='/daterangepackingreport' element={<Daterangepackingreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Daterangepackingreport>}></Route>
    <Route path='/daterangeyarninwardreport' element={<Daterangeyarninwardreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Daterangeyarninwardreport>}></Route>
    <Route path="/partybillpending" element={<Partybillpending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Partybillpending>}></Route>
    <Route path="/partywisebillpending/:id" element={<Partywisebillpending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Partywisebillpending>}></Route>
    <Route path='/productionedit' element={<ProductionEdit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ProductionEdit>}></Route>
    <Route path='/production_edit_datewise/:id' element={<ProductionEditDatewise isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></ProductionEditDatewise>}></Route>
    <Route path='/setnumberwisereco/:id/:id1' element={<SetnumberwiseReco></SetnumberwiseReco>} ></Route>
    <Route path='/drawinprint/:id1/:id2' element={<DrawinPrint></DrawinPrint>}></Route>
    <Route path="/yarngatepassimage" element={<Yarngatepassimage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Yarngatepassimage>}></Route>
    <Route path='/mis' element={<MIS isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></MIS>}></Route>
    <Route path='/fabricpendingreport' element={<Fabricpendingreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Fabricpendingreport>}></Route>
    <Route path='designpaperprint' element={<Designpaperprint isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Designpaperprint>}></Route>
    <Route path='/billingsetting' element={<Billingsetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billingsetting>}></Route>
    <Route path='/billprintcopy' element={<Billprintcopy></Billprintcopy>}></Route>
    <Route path='/packingslipbillpendingreport' element={<Packingslipbillpendingreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Packingslipbillpendingreport>}></Route>
    <Route path='/countconverter' element={<Countconverter></Countconverter>}></Route>
    <Route path='/sessionexpired' element={<Sessionexpired></Sessionexpired>}></Route>
    <Route path='/loggedout' element={<Loggedout></Loggedout>}></Route>
   
    
    
    <Route path='/termsofservice' element={<Termsofservice></Termsofservice>}></Route>
    <Route path='/privacypolicy' element={<Privacypolicy></Privacypolicy>}></Route>    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <Route path='/tablepagination' element={<Tablepagination></Tablepagination>}></Route>
    <Route path='/table2' element={<Table2></Table2>}></Route>
    <Route path='/omkar' element={<Omkar></Omkar>}></Route>
    <Route path='newencrypt' element={<NewEncrypt></NewEncrypt>}></Route>
    <Route path='/tabletopdf' element={<TableToPDF></TableToPDF>}></Route>
   
    
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
 
