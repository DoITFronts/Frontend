import { ReactNode } from 'react';
import Title from './Title';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';
import Like from './Like';
import Participant from './Participant';
import ConfirmedStatus from './ConfirmedStatus';

const Card = ({ children }: { children: ReactNode }) => {
  return { children };
};

Card.Title = Title;
Card.DateDisplay = DateDisplay;
Card.TimeDisplay = TimeDisplay;
Card.Like = Like;
Card.Participant = Participant;
Card.ConfirmedStatus = ConfirmedStatus;

export default Card;
