import { ReactNode } from 'react';

import ChipInfo from '@/components/ui/chip/ChipInfo';

import ConfirmedStatus from './component/ConfirmedStatus';
import Participant from './component/Participant';
import ProgressBar from './component/ProgressBar';

import Like from './component/Like';
import Title from './component/Title';

interface CardProps {
  children: ReactNode;
  mode?: 'list' | 'detail';
}

function Card({ children, mode = 'list' }: CardProps) {
  return <div className={mode === 'list' ? 'card-list' : 'card-detail'}>{children}</div>;
}

Card.Title = Title;
Card.ChipInfo = ChipInfo;
Card.Like = Like;
Card.Participant = Participant;
Card.ConfirmedStatus = ConfirmedStatus;
Card.ProgressBar = ProgressBar;

export default Card;
