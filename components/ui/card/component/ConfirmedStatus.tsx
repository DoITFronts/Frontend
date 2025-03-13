import CheckIcon from '../../../../../../../../../Library/Mobile Documents/.Trash/components/Icons/CheckIcon';

function ConfirmedStatus({ isConfirmed }: { isConfirmed: boolean }) {
  if (!isConfirmed) return null;

  return (
    <div className="inline-flex h-6 items-center justify-start gap-1">
      <CheckIcon variant="filled-yellow" size="lg" />
      <div className="font-['Pretendard'] text-base font-semibold leading-tight text-[#ffd500]">
        개설확정
      </div>
    </div>
  );
}

export default ConfirmedStatus;
