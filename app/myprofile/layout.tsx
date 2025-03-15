export default function MyPageLayout({
  profile,
  meeting,
}: {
  profile: React.ReactNode;
  meeting: React.ReactNode;
}) {
  console.log("meeting: ", meeting);
  return (
    <div className="mx-auto mt-[30px] flex max-w-[1200px] flex-col gap-6 sm:px-[15px] md:mt-[72px] md:px-8 lg:mb-20 lg:mt-[72px] lg:gap-[38px]">
      <div className="font-dunggeunmo text-3xl text-black">마이 페이지</div>
      <div className="flex h-auto w-full flex-col gap-4 md:gap-10 lg:gap-10">
        <section className="w-[330px] md:w-full lg:w-full">{profile}</section>
        <section>{meeting}</section>
      </div>
    </div>
  );
}
