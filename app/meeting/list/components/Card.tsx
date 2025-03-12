import { ReactNode } from 'react';

import ChipInfo from '@/components/ui/chip/ChipInfo';

import ConfirmedStatus from '../../components/ConfirmedStatus';
import Participant from '../../components/Participant';
import ProgressBar from '../../components/ProgressBar';

import Like from './Like';
import Title from './Title';

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
