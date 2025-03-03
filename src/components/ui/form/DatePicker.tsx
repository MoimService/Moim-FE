'use client';

import { Input } from '@/components/ui/Input';
import { cn } from '@/util/cn';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

interface DatePickerProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  validationRules?: RegisterOptions;
}

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  label,
  placeholder = '날짜를 선택해주세요',
  errorMessage,
  required = false,
  validationRules = {},
}) => {
  const { control, setValue, register } = useFormContext();

  React.useEffect(() => {
    if (required) {
      register(name, {
        required: '시작 날짜는 필수입니다',
        ...validationRules,
      });
    } else {
      register(name, validationRules);
    }
  }, [register, name, required, validationRules]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  // API 형식 (YYYY-MM-DD)로 날짜 변환
  const formatDateValue = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 화면에 표시되는 형식 (YYYY년 MM월 DD일)
  const formatDateDisplay = (value: string) => {
    if (!value) return '';

    // YYYY-MM-DD 형식인지 확인
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = datePattern.exec(value);

    if (match) {
      const [_, year, month, day] = match;
      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    }

    return value; // 그 외의 경우 원본 값 반환
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const isSameDay = (date: Date, dateString: string) => {
    if (!dateString) return false;

    const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = datePattern.exec(dateString);

    if (match) {
      const [_, year, month, day] = match;
      return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() === parseInt(month) - 1 &&
        date.getDate() === parseInt(day)
      );
    }

    return false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="typo-body1 font-medium text-Cgray700">
          {label}
        </label>
      )}

      <div className="relative w-full" ref={calendarRef}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsOpen(!isOpen);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="relative">
                  <Input
                    id={id}
                    readOnly
                    value={formatDateDisplay(field.value)}
                    placeholder={placeholder}
                    errorMessage={errorMessage}
                    className="cursor-pointer"
                  />
                  <CalendarIcon
                    className="absolute right-[16px] top-1/2 size-5 -translate-y-1/2 text-Cgray500"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md bg-BG_2 p-4 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="rounded-full p-1 text-Cgray700"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <div className="typo-body1 font-medium text-white">
                      {currentMonth.getFullYear()}년{' '}
                      {currentMonth.getMonth() + 1}월
                    </div>
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="rounded-full p-1 text-Cgray700"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>

                  <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                    {DAYS_OF_WEEK.map((day, index) => (
                      <div
                        key={day}
                        className={cn(
                          'typo-caption1 pb-2',
                          index === 0 ? 'text-warning' : '',
                          index === 6 ? 'text-main' : '',
                          index !== 0 && index !== 6 ? 'text-Cgray700' : '',
                        )}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {getDaysInMonth(currentMonth).map((dayInfo, index) => {
                      const { date, isCurrentMonth } = dayInfo;
                      const isSelected = isSameDay(date, field.value);
                      const dayOfWeek = date.getDay();
                      const isSunday = dayOfWeek === 0;
                      const isSaturday = dayOfWeek === 6;
                      const disabled = isDisabled(date);

                      return (
                        <button
                          key={index}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            if (!disabled) {
                              // 선택한 날짜를 YYYY-MM-DD 형식으로 변환하여 저장
                              const formattedDate = formatDateValue(date);
                              field.onChange(formattedDate);
                              setValue(name, formattedDate);
                              setIsOpen(false);
                            }
                          }}
                          className={cn(
                            'hover:bg-gray-700 typo-caption1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-Cgray500',
                            !isCurrentMonth && 'text-Cgray300 opacity-30',
                            isCurrentMonth &&
                              !isSelected &&
                              isSunday &&
                              !disabled &&
                              'text-warning',
                            isCurrentMonth &&
                              !isSelected &&
                              isSaturday &&
                              !disabled &&
                              'text-main',
                            isCurrentMonth &&
                              !isSelected &&
                              !isSunday &&
                              !isSaturday &&
                              !disabled &&
                              'text-Cgray700',
                            isSelected && 'bg-main text-white',
                            isToday(date) &&
                              !isSelected &&
                              !disabled &&
                              'border border-main text-main',
                            disabled && 'cursor-not-allowed opacity-30',
                          )}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
