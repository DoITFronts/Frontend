interface ActivityFilterProps {
  selectedActivityTab: string;
  handleActivityClick: (tab: string) => void;
  activityTabs: string[];
}

export default function ActivityFilter({
  selectedActivityTab,
  handleActivityClick,
  activityTabs,
}: ActivityFilterProps) {
  return (
    <div className="flex h-auto w-fit items-center justify-between md:gap-3 lg:gap-3">
      {activityTabs.map((activity) => (
        <button
          key={activity}
          className={`border-black-1 rounded-[12px] border py-2 pl-2.5 pr-[6px] text-black-6 ${
            selectedActivityTab === activity ? "bg-black text-white" : ""
          }`}
          onClick={() => handleActivityClick(activity)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex size-[24px] items-center justify-center">
              <div className="flex size-4 items-center justify-center rounded-[5px] border border-black-6 bg-white">
                {selectedActivityTab === activity ? (
                  <svg
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.00004 2.5L4.50009 6C6.98524 3.21054 6.46948 3.78946 8.95464 1"
                      stroke="#595959"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span className="text-sm"># {activity}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
