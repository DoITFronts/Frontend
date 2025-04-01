import {
  handleSelectFirstLocation,
  handleSelectSecondLocation,
  handleResetDate,
  handleDateConfirm,
  handleSelectFilter,
  handleResetFilter,
} from "@/components/handler/MeetingHandler";
import Icon from "@/components/shared/Icon";
import {
  defaultFirstOption,
  defaultFilter,
  participantFilter,
  defaultSecondOption,
} from "@/lib/constants/meeting";
import getDayStyle from "@/styles/calendar";
import { regions } from "@/types/map/regions";
import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import DropDown from "../dropdown/DropDown";
import FilterDropdown from "../dropdown/FilterDropdown";
import { useMemo } from "react";
import { formatShortDate } from "@/utils/timeUtils/formatDateTime";

interface FilteringProps {
  selectedFirstLocation: string;
  selectedSecondLocation: string;
  selectedDate: Date | null;
  selectedFilter: string;
  setSelectedSecondLocation: (value: string) => void;
  setSelectedDate: (value: Date | null) => void;
  setTempDate: (value: Date | null) => void;
  tempDate: Date | null;
  searchParams: URLSearchParams;
  setSelectedFilter: (value: string) => void;
  router: any;
  updateSearchParams: (key: string, value: string) => void;
}

const Filtering = ({
  selectedFirstLocation,
  selectedSecondLocation,
  selectedDate,
  selectedFilter,
  setSelectedSecondLocation,
  setSelectedDate,
  setTempDate,
  tempDate,
  searchParams,
  setSelectedFilter,
  router,
  updateSearchParams,
}: FilteringProps) => {
  const meetingLocationFirst = useMemo(
    () => [defaultFirstOption, ...Object.keys(regions)],
    [],
  );
  const meetingLocationSecond = useMemo(
    () => [defaultSecondOption, ...(regions[selectedFirstLocation] || [])],
    [selectedFirstLocation],
  );

  return (
    <div className="mb-[30px] flex justify-between md:mb-10">
      <div className="flex-start flex gap-[6px] md:gap-3">
        <FilterDropdown
          options={meetingLocationFirst}
          selectedValue={selectedFirstLocation}
          onSelect={(selected) =>
            handleSelectFirstLocation(
              selected,
              selectedSecondLocation,
              router,
              searchParams,
              defaultFirstOption,
              regions,
            )
          }
        />
        <FilterDropdown
          options={meetingLocationSecond}
          selectedValue={selectedSecondLocation}
          onSelect={(selected) =>
            handleSelectSecondLocation(
              selected,
              setSelectedSecondLocation,
              router,
            )
          }
        />
        <DropDown
          align="middle"
          options={
            <div className="flex flex-col gap-[10px] p-3">
              <DatePicker
                locale={ko}
                inline
                selected={tempDate}
                onChange={setTempDate}
                minDate={new Date()}
                calendarClassName="custom-calendar"
                renderDayContents={(day, date) => (
                  <div style={getDayStyle(date, tempDate, selectedDate)}>
                    {day}
                  </div>
                )}
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() =>
                    handleResetDate(
                      setSelectedDate,
                      setTempDate,
                      updateSearchParams,
                    )
                  }
                  className="inline-flex items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-xl border border-[#1e1e1e] bg-white py-2.5"
                >
                  <div className="relative w-[145px] justify-start text-center font-['Pretendard'] text-sm font-semibold leading-tight text-[#1e1e1e]">
                    초기화
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDateConfirm(
                      tempDate,
                      setSelectedDate,
                      updateSearchParams,
                    )
                  }
                  className="inline-flex w-[145px] items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-xl bg-black py-2.5"
                >
                  <div className="relative justify-start text-center font-['Pretendard'] text-sm font-semibold leading-tight text-white">
                    완료
                  </div>
                </button>
              </div>
            </div>
          }
          trigger={
            <div className="font-pretandard inline-flex h-9 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white md:h-10">
              {selectedDate
                ? formatShortDate(selectedDate.toISOString())
                : "날짜"}
              <div
                onClick={() =>
                  handleResetDate(
                    setSelectedDate,
                    setTempDate,
                    updateSearchParams,
                  )
                }
              >
                <Icon path={selectedDate ? "exit" : "chevron_down"} />
              </div>
            </div>
          }
          onSelect={() => null}
        />
      </div>
      <DropDown
        align="right"
        options={[defaultFilter, participantFilter]}
        selectedValue={selectedFilter}
        onSelect={(selectedFilter) =>
          handleSelectFilter(
            selectedFilter,
            setSelectedFilter,
            updateSearchParams,
          )
        }
        trigger={
          <div className="font-pretandard inline-flex h-9 flex-row items-center justify-center rounded-xl border border-[#8c8c8c] bg-white px-2.5 py-2 text-center text-sm font-medium leading-tight text-[#8c8c8c] hover:bg-[#595959] hover:text-white md:h-10">
            <div
              onClick={() =>
                handleResetFilter(setSelectedFilter, updateSearchParams)
              }
              aria-label="필터 초기화"
              className="cursor-pointer"
            >
              <Icon path={selectedFilter ? "exit" : "sort"} />
            </div>
          </div>
        }
        optionClassName="justify-start min-w-[115px] py-[10px] px-4 text-[#8c8c8c] text-base font-semibold font-pretandard leading-normal"
      />
    </div>
  );
};

export default Filtering;
