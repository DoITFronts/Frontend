export default function MyPageLayout({
  profile,
  meeting,
}: {
  profile: React.ReactNode;
  meeting: React.ReactNode;
}) {
  console.log('meeting: ', meeting);
  return (
    <div className="mx-auto mt-[72px] flex max-w-[1200px] flex-col gap-[38px]">
      <div className="font-dunggeunmo text-3xl text-black">마이 페이지</div>
      <div className="flex h-auto w-full flex-col gap-10">
        <section>{profile}</section>
        <section>{meeting}</section>
      </div>
    </div>
  );
}
