import './SideBar.css';
import { data } from '../../data/cooperflorabarao';
import logoCooperflora from '../../assets/logosemfundo.png'

const SideBar = () => {
  console.log(data.cooperflorabarao.group.name);
  return (
    <div className='SideBar'>
      <h3 className='sub-title'>Grupo de Consumo:{data.cooperflorabarao.group.name}</h3>
      <div >
        <img className='Logo' src={logoCooperflora} alt='Logo da Cooperativa Cooperflora' />
      </div>
      <h4 className='text'>Endereço: {data.cooperflorabarao.group.address} </h4>
      <h4 className='text'>Preço da Cesta: R$ {parseFloat(data.cooperflorabarao.group.baseProductsPrice).toFixed(2)} </h4>
      <h4 className='text'>Taxa de Entrega: R$ {parseFloat(data.cooperflorabarao.group.deliveryFee).toFixed(2)} </h4>
      <h4 className='text'>Frequência: {data.cooperflorabarao.group.deliveryFrequencyInDays} </h4>
      <h4 className='text'>Dia da Entrega: {data.cooperflorabarao.group.deliveryWeekDay} </h4>
      <h4 className='text'>Horário da Entrega: {data.cooperflorabarao.group.deliveryFee}</h4>
      <h4 className='text'>Número de membros: {data.cooperflorabarao.group.deliveryFrequencyInDays}</h4>
      {/* <h4 className='text'>Mapa da localização da entrega</h4> */}

    </div>
  )
};

export default SideBar;