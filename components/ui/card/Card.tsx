import { ReactNode } from 'react';

import ChipDate from '@/components/ui/chip/ChipDate';

import ConfirmedStatus from './component/ConfirmedStatus';
import Like from './component/Like';
import Participant from './component/Participant';
import ProgressBar from './component/ProgressBar';
import Title from './component/Title';

interface CardProps {
  children: ReactNode;
  mode?: 'list' | 'detail';
}

function Card({ children, mode = 'list' }: CardProps) {
  return <div className={mode === 'list' ? 'card-list' : 'card-detail'}>{children}</div>;
}

Card.Title = Title;
Card.ChipInfo = ChipDate;
Card.Like = Like;
Card.Participant = Participant;
Card.ConfirmedStatus = ConfirmedStatus;
Card.ProgressBar = ProgressBar;

export default Card;
