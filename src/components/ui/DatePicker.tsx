import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "Select dates",
  className = "",
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Parse initial value
  useEffect(() => {
    if (value && value.includes(" - ")) {
      const [start, end] = value.split(" - ");

      // Parse dates more reliably - try multiple year contexts
      const currentYear = new Date().getFullYear();
      let startDate: Date | null = null;
      let endDate: Date | null = null;

      // Try current year + 1, then current year, then current year + 2
      const yearsToTry = [currentYear + 1, currentYear, currentYear + 2];

      for (const year of yearsToTry) {
        const testStart = new Date(`${start} ${year}`);
        const testEnd = new Date(`${end} ${year}`);

        if (!isNaN(testStart.getTime()) && !isNaN(testEnd.getTime())) {
          startDate = testStart;
          endDate = testEnd;
          break;
        }
      }

      if (startDate && endDate) {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      } else {
        console.warn("Could not parse dates:", start, end);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      }
    } else {
      // Clear selection if no valid value
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatDisplayValue = (): string => {
    if (selectedStartDate && selectedEndDate) {
      return `${formatDate(selectedStartDate)} - ${formatDate(
        selectedEndDate
      )}`;
    }
    if (value && value.includes(" - ")) {
      return value;
    }
    return placeholder;
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);

    // Get first day of week for the first day of month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const current = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date: Date, month: Date): boolean => {
    return (
      date.getMonth() === month.getMonth() &&
      date.getFullYear() === month.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate)
      return date.toDateString() === selectedStartDate.toDateString();

    const time = date.getTime();
    return (
      time >= selectedStartDate.getTime() && time <= selectedEndDate.getTime()
    );
  };

  const isInRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const time = date.getTime();
    return (
      time > selectedStartDate.getTime() && time < selectedEndDate.getTime()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setIsSelectingEnd(true);
    } else if (isSelectingEnd) {
      // Complete selection
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
      setIsSelectingEnd(false);

      // Update parent component
      const startFormatted =
        date < selectedStartDate ? date : selectedStartDate;
      const endFormatted = date < selectedStartDate ? selectedStartDate : date;
      const formattedValue = `${formatDate(startFormatted)} - ${formatDate(
        endFormatted
      )}`;
      onChange(formattedValue);

      // Close picker after selection
      setTimeout(() => setIsOpen(false), 100);
    }
  };

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="checkout__datepicker" ref={pickerRef}>
      <div className="checkout__label">Dates</div>
      <input
        className={`checkout__input js-date-single ${className}`}
        type="text"
        readOnly
        value={formatDisplayValue()}
        disabled={disabled}
      />
      <div className="checkout__controls">
        <button
          className="checkout__edit js-date-open"
          type="button"
          onClick={() => {
            if (!isOpen && selectedStartDate) {
              // Set current month to the month of selected start date when opening
              setCurrentMonth(
                new Date(
                  selectedStartDate.getFullYear(),
                  selectedStartDate.getMonth(),
                  1
                )
              );
            }
            setIsOpen(!isOpen);
          }}
          disabled={disabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            id="icon-edit"
            className="icon icon-edit"
          >
            <path d="M13.283 14c.368 0 .667.298.667.667s-.299.667-.667.667H2.617c-.368 0-.667-.298-.667-.667S2.248 14 2.617 14h10.667zM12.031 1.138l1.448 1.448a2 2 0 0 1 0 2.828l-6.862 6.862c-.25.25-.589.39-.943.39H3.283c-.736 0-1.333-.597-1.333-1.333V8.943c0-.354.14-.693.391-.943l6.862-6.862a2 2 0 0 1 2.828 0zM3.617 8.609l-.333.333v2.391h2.391L6.007 11l-2.391-2.39zm5-5L4.56 7.666l2.391 2.39L11.007 6 8.617 3.609zm1.529-1.529l-.586.586 2.39 2.391.586-.586c.26-.26.26-.682 0-.943l-1.448-1.448c-.26-.26-.682-.26-.943 0z"></path>
          </svg>
        </button>
      </div>

      <div
        className="date-picker-wrapper no-shortcuts no-topbar no-gap single-month"
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="month-wrapper">
          <table className="month1" cellSpacing="0" cellPadding="0">
            <thead>
              <tr className="caption">
                <th>
                  <span className="prev" onClick={goToPrevMonth}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z"
                        fill="#777e91"
                      />
                    </svg>
                  </span>
                </th>
                <th colSpan={5} className="month-name">
                  <div className="month-element">
                    {monthNames[currentMonth.getMonth()].toLowerCase()}
                  </div>
                  <div className="month-element">
                    {currentMonth.getFullYear()}
                  </div>
                </th>
                <th>
                  <span className="next" onClick={goToNextMonth}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.793 7.793a1 1 0 0 0 0 1.414L12.586 12l-2.793 2.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414l-3.5-3.5a1 1 0 0 0-1.414 0z"
                        fill="#777e91"
                      />
                    </svg>
                  </span>
                </th>
              </tr>
              <tr className="week-name">
                <th>su</th>
                <th>mo</th>
                <th>tu</th>
                <th>we</th>
                <th>th</th>
                <th>fr</th>
                <th>sa</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, weekIndex) => {
                // Check if this week has any days from current month
                const weekDays = Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayNumber = weekIndex * 7 + dayIndex;
                  return days[dayNumber];
                });
                
                const hasCurrentMonthDays = weekDays.some(date => isSameMonth(date, currentMonth));
                
                // Skip weeks that don't have any current month days
                if (!hasCurrentMonthDays) {
                  return null;
                }
                
                return (
                  <tr key={weekIndex}>
                    {weekDays.map((date, dayIndex) => {
                      const isCurrentMonth = isSameMonth(date, currentMonth);
                      const isSelectedDate = isSelected(date);
                      const isInDateRange = isInRange(date);
                      const isTodayDate = isToday(date);
                      const isFirstSelected = selectedStartDate && date.toDateString() === selectedStartDate.toDateString();
                      const isLastSelected = selectedEndDate && date.toDateString() === selectedEndDate.toDateString();
                      
                      let className = "day valid";
                      if (!isCurrentMonth) {
                        className += date < currentMonth ? " lastMonth" : " nextMonth";
                      } else {
                        className += " toMonth";
                      }
                      
                      // Add selection classes
                      if (isSelectedDate) className += " checked";
                      if (isFirstSelected) className += " first-date-selected";
                      if (isLastSelected) className += " last-date-selected";
                      if (isInDateRange) className += " in-range";
                      if (isTodayDate) className += " real-today";

                      return (
                        <td key={dayIndex}>
                          <div
                            className={`${className} date-picker__day--clickable`}
                            onClick={() => handleDateClick(date)}
                          >
                            {date.getDate()}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              }).filter(Boolean)}
            </tbody>
          </table>
          <div className="dp-clearfix"></div>
          <div className="time">
            <div className="time1"></div>
            <div className="time2"></div>
          </div>
          <div className="dp-clearfix"></div>
        </div>
        <div className="footer"></div>
        <div className="date-range-length-tip"></div>
      </div>
    </div>
  );
};

export default DatePicker;
