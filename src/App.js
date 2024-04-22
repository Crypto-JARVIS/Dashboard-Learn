import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Team from "./components/team/Team";
import Navigation from "./components/navigation/Navigation";
import AppTheme from "./components/AppTheme";
import Contacts from "./components/contacts/Contacts";
import Invoices from "./components/invoices/Invoices";
import Form from "./components/form/Form";
import Calendar from "./components/calendar/Calendar";
import FAQ from "./components/faq/FAQ";
import Bar from "./components/bar/Bar";
import Pie from "./components/pie/Pie";
import Line from "./components/line/Line";
import Geography from "./components/geography/Geography";

function App() {
  return (
    <AppTheme>
      <Navigation>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/geography" element={<Geography />} />
        </Routes>
      </Navigation>
    </AppTheme>
  );
}

export default App;
