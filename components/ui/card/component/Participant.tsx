import Icon from '../../../../../../../../../Library/Mobile Documents/.Trash/components/utils/Icon';

function Participant({
  participantCount,
  capacity,
}: {
  participantCount: number;
  capacity: number;
}) {
  return (
    <div className="flex flex-row items-center">
      <Icon path="card/user" />
      <div className="font-['Pretendard'] text-sm font-medium leading-tight text-[#595959]">
        {participantCount}/
      </div>
      <div className="font-['Pretendard'] text-sm font-medium leading-tight text-[#d9d9d9]">
        {capacity}
      </div>
    </div>
  );
}

export default Participant;
