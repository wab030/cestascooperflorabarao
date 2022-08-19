import SideBar from "../SideBar/SideBar";
import PageTitle from "../PageTitle/PageTitle";
import './MainPage.css';
import MainChart from "../ChartsArea/MainChart";
import Charts from "../Charts/Charts";
import Footer from "../Footer/Footer";

const MainPage = () => {
  return (
    <div className="MainPage">
      <PageTitle />
      <div className="Main">
        <div className="Block1">
          <SideBar />
        </div>
        <div className="Block2">
          <MainChart />
        </div>
      </div>
      <div className="Charts">
        <Charts />
      </div>
      <Footer />
    </div>
  )
}

export default MainPage;