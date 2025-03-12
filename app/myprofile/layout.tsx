export default function MyPageLayout({
  profile,
  meeting,
}: {
  profile: React.ReactNode;
  meeting: React.ReactNode;
}) {
  console.log('meeting: ', meeting);
  return (
    <div className="mx-auto max-w-[1200px] mt-[72px] mb-20 flex flex-col gap-[38px]">
      <div className="text-black font-dunggeunmo text-3xl">마이 페이지</div>
      <div className="w-full h-auto flex flex-col gap-10">
        <section>{profile}</section>
        <section>{meeting}</section>
      </div>
    </div>
  );
}
