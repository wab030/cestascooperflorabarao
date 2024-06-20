import './SideBar.css';
import { data } from '../../data/cooperflorabarao';
import logoCooperflora from '../../assets/logosemfundo.png';
// import { ReactComponent as LocationIcon } from '../../assets/icons/location-pin.svg';
import LocationIcon from '../../assets/icons/location.png';
import { MdAttachMoney } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';

import { ImListNumbered } from 'react-icons/im';

// import { ReactComponent as MoneyIcon } from '../../assets/icons/credit.svg';
// import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
// import { ReactComponent as TimeIcon } from '../../assets/icons/back-in-time.svg';
// import { ReactComponent as ListNumberIcon } from '../../assets/icons/list-numbered.svg';

const SideBar = () => {
  console.log(data.cooperflorabarao.group.name);
  return (
    <div className='SideBar'>
      <h3 className='sub-title'>
        Grupo de Consumo:{data.cooperflorabarao.group.name}
      </h3>
      <div>
        <img
          className='Logo'
          src={logoCooperflora}
          alt='Logo da Cooperativa Cooperflora'
        />
      </div>
      <ul>
        <li className='SideBar-Line text'>
          {/* <span className='Icon-Box'><LocationIcon className='Icon1' /></span> */}
          <span className='Icon-Box'>
            <img
              src={LocationIcon}
              className='Icon1'
              alt='Icone de localização'
            />
          </span>
          Endereço: {data.cooperflorabarao.group.address}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <MdAttachMoney />
          </span>
          Preço da Cesta: R${' '}
          {parseFloat(data.cooperflorabarao.group.baseProductsPrice).toFixed(2)}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <span className='Icon-Box'>
              <MdAttachMoney />
            </span>
          </span>
          Taxa de Entrega: R${' '}
          {parseFloat(data.cooperflorabarao.group.deliveryFee).toFixed(2)}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <FaCalendarAlt className='Icon1' />
          </span>
          Frequência: {data.cooperflorabarao.group.deliveryFrequencyInDays}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <FaCalendarAlt className='Icon1' />
          </span>
          Dia da Entrega: {data.cooperflorabarao.group.deliveryWeekDay}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <IoMdTimer className='Icon1' />
          </span>
          Horário da Entrega: {data.cooperflorabarao.group.deliveryFee}
        </li>
        <li className='SideBar-Line text'>
          <span className='Icon-Box'>
            <ImListNumbered className='Icon1' />
          </span>
          Número de membros: {data.cooperflorabarao.group.consumers}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
