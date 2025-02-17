async function Description() {
  const detail = {
    title: '번개에 대해 자세히 알아보세요!',
    description: `
    함께하면 더 집중되는 시간! 카공 & 작업 모임
    혼자서 공부하거나 작업할 때, 자꾸 딴짓하게 되고 집중이 안 되지 않나요? 함께 모이면
    자연스럽게 몰입할 수 있고, 지루함도 덜해요! 💡

    이번 번개에서는 각자 목표한 공부나 작업을 하면서 조용한 집중의 시간을 가질 예정이에요.
    중간중간 쉬는 시간에는 가벼운 대화도 나누면서 서로에게 좋은 자극을 주면 좋겠어요! 작업,
    공부, 독서 무엇이든 환영이며, 자유로운 분위기에서 함께 하면 더 좋을 것 같아요.

    📍 이런 분들에게 추천해요!
    ✔️ 카페에서 혼자 공부하거나 작업하면 쉽게 늘어지는 분
    ✔️ 다른 사람과 함께하면 집중력이 더 올라가는 분
    ✔️ 공부, 업무, 글쓰기, 디자인, 코딩 등 몰입이 필요한 작업을 하려는 분

    🕒 모임 진행 방식
    모임 장소에 도착하면 자유롭게 자리 잡고 작업 시작!
    필요하면 타이머를 맞춰서 포모도로 기법(25분 집중 + 5분 휴식) 도 활용 가능
    대화는 쉬는 시간에만! 작업 시간에는 조용한 분위기 유지 🎧

    ☕ 장소는 카페에서 진행되며, 음료 주문 후 참여 가능해요!
    각자 할 일을 하면서도 서로 좋은 에너지를 주고받을 수 있는 시간!
    즐겁고 생산적인 하루를 함께 만들어봐요. 🚀
  `,
  };

  return (
    <>
      <div className="font-dunggeunmo text-2xl font-normal text-black">{detail.title}</div>
      <div className="font-['Pretendard'] text-base font-medium leading-normal text-neutral-800">
        {detail.description.split('\n').map((line) => (
          <p key={line} className="mt-2">
            {line}
          </p>
        ))}
      </div>
    </>
  );
}

export default Description;
