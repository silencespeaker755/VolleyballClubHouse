import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useMutation, useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useUserInfo } from "../hooks/useInfo";
import { useDateInfo } from "../hooks/useDate";
import instance from "../setting";
import PostModal from "./modals/PostModal";
import EventModal from "./modals/EventModal";
import AttendModal from "./modals/AttendModal";
import Loading from "../components/Loading";
import "../css/Calendar.css";

export default function Calendar(props) {
  const { showErrorModel } = props;
  const ref = useRef();
  const { userInfo } = useUserInfo();
  const { dateInfo } = useDateInfo();
  const [edit, setEdit] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [attendModal, setAttendModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentEvent, setCurrentEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: events,
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "calendarFetching",
    async () => {
      const { data = { events: [] } } = await instance.get(
        "/api/home/calendar"
      );
      return data.events;
    },
    {
      retry: false,
      onSuccess: () => setIsLoading(false),
    }
  );

  const handleEdit = (event) => (e) => {
    setEdit(true);
    setCurrentEvent(event);
    setAttendModal(true);
  };

  const handleEditFinish = () => {
    setAttendModal(false);
    setEdit(false);
  };

  const handleEventRender = ({ event, el, view, timeText }) => {
    const dateAttr = moment(event.start).format("YYYY-MM-DD");
    if (view.type !== "dayGridWeek") {
      if (!$(`#${dateAttr}`).hasClass("detected")) {
        if (!$(`#${dateAttr}`).length || $(`#${dateAttr}`).has("no-detected")) {
          $(`#${dateAttr}`).remove();
          $(`[data-date='${dateAttr}']`).append(
            `
            <span id='${dateAttr}'>
              <img src='create_pen.svg' class='custom_edit_pen' alt='modify calendar' />
              <span class='custom_attend_number'>${event.extendedProps.attendance.length}</span>
            </span>
            `
          );
        }
        $(`#${dateAttr}`).on("click", handleEdit(event));
        $(`#${dateAttr}`).removeClass("no-detected");
        $(`#${dateAttr}`).addClass("detected");
      }
    } else {
      $(`#${dateAttr}`).removeClass("detected");
      $(`#${dateAttr}`).addClass("no-detected");
    }
    return el;
  };

  const handleDateClick = (event) => {
    if (!edit && userInfo.isAdmin) {
      setCurrentDate(event.dateStr);
      setPostModal(true);
    }
  };

  const handleEventClick = ({ event }) => {
    setCurrentEvent(event);
    setEventModal(true);
  };

  useEffect(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInfo.current)) return;
    if (ref && ref.current) {
      const calendarApi = ref.current.getApi();
      if (calendarApi) calendarApi.gotoDate(dateInfo.current);
    }
  }, [dateInfo.current]);

  if (isEventsError) return "error";
  if (isEventsLoading || isLoading)
    return (
      <div className="margin-top-250">
        <Loading />
      </div>
    );

  return (
    <div className="calendar-frame">
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, interactionPlugin]}
        viewClassNames="control-modify-entry"
        dayCellClassNames="test-day-class"
        eventContent={handleEventRender}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridDay,dayGridWeek,dayGridMonth",
        }}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        droppable={false}
        eventClick={handleEventClick}
      />
      <PostModal
        open={postModal}
        date={currentDate}
        handleClose={() => setPostModal(false)}
        refetchEvents={refetchEvents}
      />
      <EventModal
        open={eventModal}
        event={currentEvent}
        handleClose={() => setEventModal(false)}
        showEventModal={() => setEventModal(true)}
        showErrorModel={showErrorModel}
        setLoading={setIsLoading}
        refetchEvents={refetchEvents}
      />
      <AttendModal
        open={attendModal}
        event={currentEvent}
        onClose={handleEditFinish}
        handleError={() => {
          handleEditFinish();
          showErrorModel();
        }}
        refetchEvents={refetchEvents}
        setLoading={setIsLoading}
      />
    </div>
  );
}
