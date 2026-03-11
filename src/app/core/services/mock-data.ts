import { Fund } from '../models/fund.model';
import { User } from '../models/user.model';

/** Initial user data with a balance of COP $500.000 */
export const MOCK_USER: User = {
  id: '1',
  name: 'Laura Camacho',
  email: 'lauracamacholeon@gmail.com',
  phone: '+57 300 456 7899',
  balance: 500000,
};

/** Available investment funds provided by BTG Pactual */
export const MOCK_FUNDS: Fund[] = [
  {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minimumAmount: 75000,
    category: 'FPV',
    isSubscribed: false,
  },
  {
    id: 2,
    name: 'FPV_BTG_PACTUAL_ECOPETROL',
    minimumAmount: 125000,
    category: 'FPV',
    isSubscribed: false,
  },
  {
    id: 3,
    name: 'DEUDAPRIVADA',
    minimumAmount: 50000,
    category: 'FIC',
    isSubscribed: false,
  },
  {
    id: 4,
    name: 'FDO-ACCIONES',
    minimumAmount: 250000,
    category: 'FIC',
    isSubscribed: false,
  },
  {
    id: 5,
    name: 'FPV_BTG_PACTUAL_DINAMICA',
    minimumAmount: 100000,
    category: 'FPV',
    isSubscribed: false,
  },
];
