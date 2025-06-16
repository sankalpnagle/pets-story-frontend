import React, { useEffect, useState } from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import { enUS } from "date-fns/locale";
import { addDays } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getPetIdsByUserId } from "../../services/PetServicesApi/PetService";

interface JournalCalenderProps {
  journalData?: Array<{
    date: string;
    status: string;
    missingPetIds: string[];
    completedData: string[];
  }>;
  onDateSelect?: (data: { date: Date; journalType: string }) => void;
  pendingData: Array<{ createdAt: string }>;
}

const JournalCalender: React.FC<JournalCalenderProps> = ({
  journalData = [],
  onDateSelect,
  pendingData,
  completedData,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  const [selected, setSelected] = useState<Date>(new Date());
  const [petIds, setPetIds] = useState<any[]>([]);
  const currentDate = new Date();

  const fetchPets = async () => {
    try {
      const res = await getPetIdsByUserId(userId);
      setPetIds(res?.data?.data?.map((pet: any) => pet) || []);
    } catch (error) {
      console.error("Failed to fetch pet IDs:", error);
      setPetIds([]);
    }
  };

  let pendDates: string[] = [];
  if (pendingData.length > 0) {
    pendDates = pendingData.map(
      (entry) => new Date(entry.createdAt).toISOString().split("T")[0]
    );
  }

  let compDates: string[] = [];
  if (completedData.length > 0) {
    compDates = completedData.map(
      (entry) => new Date(entry.createdAt).toISOString().split("T")[0]
    );
  }

  useEffect(() => {
    if (userId) fetchPets();
  }, [userId]);

  const isLastFriday = (date: Date): boolean => {
    const nextFriday = new Date(date);
    nextFriday.setDate(date.getDate() + 7);
    return nextFriday.getMonth() !== date.getMonth() && date.getDay() === 5;
  };

  const handleSelect = (date: Date) => {
    setSelected(date);
    const journalType = isLastFriday(date) ? "Comprehensive" : "Daily";

    if (onDateSelect) {
      onDateSelect({ date, journalType });
    }
  };

  const validPetIds = petIds.filter((item) => item.createdAt);

  const sortedData = validPetIds.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });

  const earliestDate =
    sortedData.length > 0 ? new Date(sortedData[0].createdAt) : new Date();

  const completedDates = journalData
    .filter((entry) => entry.status === "Completed")
    .map((entry) => new Date(entry.date).toISOString().split("T")[0]);

  const modifiers: DayPickerProps["modifiers"] = {
    Daily: (date) => date.getDay() === 2 || date.getDay() === 5,
    Comprehensive: (date) => isLastFriday(date),
    today: (date) => date.toDateString() === new Date().toDateString(),
    notify: (date) => {
      const dateStr = date.toISOString().split("T")[0];

      return (
        date <= new Date() &&
        (modifiers.Daily(date) || modifiers.Comprehensive(date)) &&
        date >= earliestDate &&
        !completedDates.includes(dateStr)
      );
    },
  };

  const modifiersStyles: DayPickerProps["modifiersStyles"] = {
    Comprehensive: { backgroundColor: "#BDC2FF", borderRadius: "50%" },
    today: { backgroundColor: "#F6F4FF", borderRadius: "50%" },
  };

  const modifiersClassNames: DayPickerProps["modifiersClassNames"] = {
    Daily: "daily",
    notify: "calendar-notify",
  };

  const customLocale = {
    ...enUS,
    options: {
      ...enUS.options,
      weekStartsOn: 0,
    },
    localize: {
      ...enUS.localize,
      day: (n) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][n],
    },
  };

  const colors = ["#f5cf9f", "#f5a7a6", "#d5d1e9", "#f3f5a9", "#d0e4ee"];

  const formatDay = (date: Date) => {
    const today = new Date();
    const localDateStr = date.toISOString().split("T")[0];

    const entry = journalData.find(
      (entry) =>
        new Date(entry.date).toISOString().split("T")[0] === localDateStr
    );

    const journalCount = entry?.missingPetIds.length || 0;
    const journalsCount = entry?.journals.length || 0;

    console.log(journalsCount, "journalsCount");

    const toUTCDate = (date: Date) => {
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
    };

    const groupedPetIds = petIds.reduce((acc, pet) => {
      const petDate = new Date(pet.createdAt);
      const petUTCDate = toUTCDate(petDate).toISOString().split("T")[0];
      if (!acc[petUTCDate]) acc[petUTCDate] = [];
      acc[petUTCDate].push(pet.id);
      return acc;
    }, {} as { [key: string]: string[] });

    let adjustedDots = 0;

    let currentDate = toUTCDate(date);
    const earliestDate = toUTCDate(
      new Date(
        Math.min(...petIds.map((pet) => new Date(pet.createdAt).getTime()))
      )
    );

    while (currentDate >= earliestDate) {
      const currentDateStr = currentDate.toISOString().split("T")[0];
      adjustedDots += groupedPetIds[currentDateStr]?.length || 0;
      currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    }

    let finalDots;
    if (journalCount > 0) {
      finalDots = journalCount;
    } else {
      if (journalsCount === adjustedDots) {
        finalDots = [];
      } else {
        finalDots = adjustedDots;
      }
    }

    const isTuesdayOrFriday = date.getDay() === 2 || date.getDay() === 5;
    const isPastOrToday = date.getTime() <= today.getTime();

    return (
      <div className="relative text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">{date.getDate()}</div>
        {isTuesdayOrFriday && isPastOrToday && finalDots > 0 && (
          <div
            className="absolute"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: finalDots }).map((_, index) => (
              <span
                key={index}
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: colors[index % colors.length],
                  margin: "53px 3px 0px 0px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="items-center min-w-[370px] overflow-x-hidden w-[370px]">
      <div className="w-fit overflow-x-hidden">
        <DayPicker
          mode="single"
          captionLayout="label"
          showOutsideDays
          selected={selected}
          onSelect={handleSelect}
          formatters={{ formatDay }}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          modifiersClassNames={modifiersClassNames}
          locale={customLocale}
          className="w-full no-border border-spacing-8"
        />
      </div>
      <div className="flex ml-3 items-center text-sm sm:hidden block font-bold my-3 text-[#2734A9] w-full justify-start">
        {selected?.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        <hr className="border-[#C4C7C7] w-[190px] ml-2" />
      </div>
    </div>
  );
};

export default JournalCalender;
