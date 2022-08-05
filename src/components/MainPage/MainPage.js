import SideBar from "../SideBar/SideBar";
import ChartsArea from "../ChartsArea/ChartsArea";
import PageTitle from "../PageTitle/PageTitle";

const MainPage = () => {
  return(
    <div>
      <PageTitle />
      <SideBar />  
      <ChartsArea />      
    </div>
  )
}

export default MainPage;