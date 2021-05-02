import React, { useState, useEffect, useReducer } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Button, Grid, Label, Modal, Segment, Input } from "semantic-ui-react";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function modalReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true };
    default:
      throw new Error("Unsupported action...");
  }
}

function checkModalReducer(state, action) {
  switch (action.type) {
    case "close":
      return { check_open: false };
    case "open":
      return { check_open: true };
    default:
      throw new Error("Unsupported action...");
  }
}

const CalendarForm = () => {
  const [events, setEvents] = useState([]);
  const [targetInfo, setTargetInfo] = useState([]);
  const [
    registrationModal,
    dispatch_registrationModal,
  ] = useReducer(modalReducer, { open: false });

  const [checkModal, dispatch_checkModal] = useReducer(checkModalReducer, {
    check_open: false,
  });
  const { open } = registrationModal;
  const { check_open } = checkModal;

  const { userId } = JSON.parse(localStorage.getItem("userInfo")).result;
  const date = moment().format("YYYY/M/D").split("/");

  useEffect(() => {
    axios.get(`/api/schedule/${userId}?year=${date[0]}`).then((res) => {
      const events = res.data.result.map((event) => {
        const eventObj = {
          title: event.memo,
          start: event.startTime,
          end: event.endTime,
          allDay: false,
          // resource: "1234",
        };
        return eventObj;
      });

      setEvents(events);
    });
  }, []);

  console.log(targetInfo);
  return (
    <div className="Calendar__wrapper">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        events={events}
        selectable
        popup
        onSelectEvent={async (e) => {
          await setTargetInfo(e);
          dispatch_checkModal({ type: "open" });
        }} // 기존 이벤트 확인
        onSelectSlot={(e) => {
          dispatch_registrationModal({ type: "open" });
        }} // 새로운 이벤트 추가
        views={["day", "week", "month"]}
        defaultView="month"
        style={{ width: "100%", height: "100vh" }}
      />

      {/* 일정 등록을 위한 modal */}
      <Modal
        size="small"
        open={open}
        onClose={async () => {
          await dispatch_registrationModal({ type: "close" });
          setTargetInfo({});
        }}
      >
        <Modal.Header>새로운 모임 생성</Modal.Header>
        <Modal.Content>
          여기다가 이제 sharedUserId:array, startTime, endTime, location, memo
          넣어줘야됨
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => dispatch_registrationModal({ type: "close" })}
          >
            취소
          </Button>
          <Button
            positive
            onClick={() => {
              // 이벤트 생성
              return dispatch_registrationModal({ type: "close" });
            }}
          >
            확인
          </Button>
        </Modal.Actions>
      </Modal>

      {/* 기존 스케쥴 정보를 보기 위한 modal */}
      <Modal
        size="small"
        open={check_open}
        onClose={() => dispatch_checkModal({ type: "close" })}
      >
        <Modal.Header>스케쥴 확인</Modal.Header>
        <Modal.Content>
          <div>{targetInfo.title}</div>
          <div>{targetInfo.start}</div>
          <div>{targetInfo.end}</div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => dispatch_checkModal({ type: "close" })}
          >
            취소
          </Button>
          <Button
            positive
            onClick={() => {
              // 이벤트 생성
              return dispatch_checkModal({ type: "close" });
            }}
          >
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CalendarForm;
