// import ProfileCard from './components/PropfileCard';

// export default function MyPage() {
//   return (
//     <div className="mx-auto max-w-[1200px] mt-[72px] flex flex-col gap-[38px]">
//       <div className="text-black font-dunggeunmo text-3xl">마이 페이지</div>
//       <div className="w-full h-auto flex felx-col gap-10">
//         {/* <ProfileCard name={'홍준기'} nickname={'홍당무'} /> */}
//       </div>
//     </div>
//   );
// }

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
