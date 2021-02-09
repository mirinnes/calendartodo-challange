import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import './calendar.scss';

let date = new Date();
date.setDate(1);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let prevMonth = date.getMonth() - 1;
if (prevMonth === -1) prevMonth = 11;
let nextMonth = date.getMonth() + 1;
if (nextMonth === 12) nextMonth = -1;

const renderCalendar = () => {
  document.querySelector('.header h1').innerHTML = months[date.getMonth()];
  document.querySelector('.header p').innerHTML = new Date().toDateString();

  // Update prev and next month
  prevMonth = date.getMonth() - 1;
  if (prevMonth === -1) prevMonth = 11;
  nextMonth = date.getMonth() + 1;
  if (nextMonth === 12) nextMonth = 0;

  const monthDays = document.querySelector('.days-container');

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    let idDay = months[prevMonth].toLowerCase() + x;

    days += `<button id=${idDay} class='day prev-month' >${
      prevLastDay - x + 1
    }</button>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    let idDay = months[date.getMonth()].toLowerCase() + i;
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<button id=${idDay} class='day today' >${i}</button>`;
    } else {
      days += `<button id=${idDay} class='day' >${i}</button>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    let idDay = months[nextMonth].toLowerCase() + j;

    days += `<button id=${idDay} class='day next-month' >${j}</button>`;
    monthDays.innerHTML = days;
  }
};

function Calendar() {
  const initialState = {
    january5: { todos: ['Im A W E S O M E'], check: true },
    january2: { todos: ['Set new todo', 'Play some sports!'], check: true },
    january21: {
      todos: ['Awesome UI designs!', 'Call friends!', 'Football'],
      check: false,
    },
  };
  const [stateTodos, setstateTodos] = useState(initialState);
  const [showTodoList, setshowTodoList] = useState(false);
  const [selectedDay, setselectedDay] = useState();

  const handlePreviousMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    addEventToDay(document.querySelectorAll('.day'));
    checkDaysWithTodos(document.querySelectorAll('.day'));
  };

  const handleNextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    addEventToDay(document.querySelectorAll('.day'));
    checkDaysWithTodos(document.querySelectorAll('.day'));
  };

  const handleCurrentDate = () => {
    date.setMonth(new Date().getMonth());
    renderCalendar();
    addEventToDay(document.querySelectorAll('.day'));
  };

  const handleDayClick = (e) => {
    setselectedDay(e.target.id);
    setshowTodoList(true);
  };

  const handleOnCloseTodoList = () => {
    setshowTodoList(!showTodoList);
  };

  const addEventToDay = (days) => {
    days.forEach((d) => {
      d.addEventListener('click', (e) => handleDayClick(e));
    });
  };

  const checkDaysWithTodos = (days) => {
    days.forEach((d) => {
      if (d.id in stateTodos) {
        d.classList.add('withTodos');
      }
    });
  };
  useEffect(() => {
    renderCalendar();
    addEventToDay(document.querySelectorAll('.day'));
    checkDaysWithTodos(document.querySelectorAll('.day'));
  });

  return (
    <section className='calendar'>
      <div className='container '>
        <header className='header'>
          <FontAwesomeIcon
            onClick={() => handlePreviousMonth()}
            icon={faChevronLeft}
            className='icon prev'
          />
          <div>
            <h1>Month Name</h1>
            <p onClick={() => handleCurrentDate()}>Date String</p>
          </div>
          <FontAwesomeIcon
            onClick={() => handleNextMonth()}
            icon={faChevronRight}
            className='icon next'
          />
        </header>
        <div className='month-container'>
          <div className='row-days'>
            <div className='day'>Sun</div>
            <div className='day'>Mon</div>
            <div className='day'>Tue</div>
            <div className='day'>Wed</div>
            <div className='day'>Thu</div>
            <div className='day'>Fri</div>
            <div className='day'>Sat</div>
          </div>
          <div className='days-container'></div>
        </div>
      </div>
      {showTodoList && (
        <TodoList
          onClose={() => handleOnCloseTodoList()}
          todos={stateTodos}
          setTodos={setstateTodos}
          day={selectedDay}
        />
      )}
    </section>
  );
}

export default Calendar;
