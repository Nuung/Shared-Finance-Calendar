import React, { useState, useEffect, useReducer, forwardRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Button, Modal, Input, Item, Label, Icon } from "semantic-ui-react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from "moment";
import "moment/locale/ko";
import ko from "date-fns/locale/ko";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarForm.css";

moment.locale("ko");
registerLocale("ko", ko);

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

  const [meetingName, setName] = useState("");
  const [friend, setFriend] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [scheduleLoading, loadSchedule] = useState(false);
  const [scheduleIdx, incrementIdx] = useState(0);
  const dateList = [
    {
      start: "Tue May 04 2021 13:45:00 GMT+0900 (Korean Standard Time)",
      end: "Tue May 04 2021 14:45:00 GMT+0900 (Korean Standard Time)",
    },
    {
      start: "Tue May 06 2021 11:30:00 GMT+0900 (Korean Standard Time)",
      end: "Tue May 06 2021 12:30:00 GMT+0900 (Korean Standard Time)",
    },
    {
      start: "Tue May 09 2021 18:45:00 GMT+0900 (Korean Standard Time)",
      end: "Tue May 09 2021 19:50:00 GMT+0900 (Korean Standard Time)",
    },
    {
      start: "Tue May 11 2021 13:45:00 GMT+0900 (Korean Standard Time)",
      end: "Tue May 11 2021 14:45:00 GMT+0900 (Korean Standard Time)",
    },
  ];

  const incrementIndex = () => {
    incrementIdx((scheduleIdx + 1) % 4);
  };

  const [
    registrationModal,
    dispatch_registrationModal,
  ] = useReducer(modalReducer, { open: false });

  const [checkModal, dispatch_checkModal] = useReducer(checkModalReducer, {
    check_open: false,
  });
  const { open } = registrationModal;
  const { check_open } = checkModal;

  const { userId, account } = JSON.parse(
    localStorage.getItem("userInfo")
  ).result;
  const date = moment().format("YYYY/M/D").split("/");

  useEffect(() => {
    const func = setInterval(() => {
      axios
        .get(`http://3.35.6.3:3000/api/schedule/${userId}?year=${date[0]}`)
        .then((res) => {
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
    }, 1000);
    return () => clearInterval(func);
  }, [open, check_open]);

  return (
    <div className="Calendar__wrapper">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        events={events}
        selectable={true}
        longPressThreshold={10}
        popup
        onSelectEvent={async (e) => { // ?????? ????????? click event
          await setTargetInfo(e);
          console.log(targetInfo);
          dispatch_checkModal({ type: "open" });
        }} // ?????? ????????? ??????
        onSelectSlot={async (e) => {
          dispatch_registrationModal({ type: "open" });
        }} // ????????? ????????? ??????
        views={["month"]}
        defaultView="month"
        style={{ width: "100%", height: "85vh" }}
      />

      {/* ?????? ????????? ?????? modal */}
      <Modal
        size="small"
        open={open}
        onClose={async () => {
          await dispatch_registrationModal({ type: "close" });
          setTargetInfo({});
        }}
      >
        <Modal.Header>???????????? ????????? ??????</Modal.Header>
        <Modal.Content>
          {/* userId, account, sharedUserId, startTime, endTime, memo */}
          <Input
            label="?????? ??????"
            placehoder="?????? ????????? ???????????????"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input
            label="??????????????? ??????"
            placehoder="?????? ???????????? ???????????????"
            onChange={(e) => setFriend(e.target.value)}
          />
          <br />
          <br />
          <div>
            <Label size="large">?????????</Label>
            <DatePicker
              className="calendar__datepicker"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              showTimeInput
              dateFormat="yyyy.MM.dd(eee) p"
              timeFormat="HH:mm"
              timeInputLabel="Time:"
              locale="ko"
              popperModifiers={{ preventOverflow: { enabled: true } }}
            />
          </div>
          <br />
          <div className="calendar__datepicker-wrapper">
            <div>
              <Label size="large">?????????</Label>
              <DatePicker
                className="calendar__datepicker"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                showTimeInput
                dateFormat="yyyy.MM.dd(eee) p"
                timeFormat="HH:mm"
                timeInputLabel="Time:"
                locale="ko"
                popperModifiers={{ preventOverflow: { enabled: true } }}
              />
            </div>
            <Button
              primary
              size="tiny"
              loading={scheduleLoading}
              onClick={async (e) => {
                await loadSchedule(true);
                await incrementIndex();
                const start = new Date(dateList[scheduleIdx].start);
                const end = new Date(dateList[scheduleIdx].end);
                setTimeout(() => {
                  setStartDate(start);
                  setEndDate(end);
                }, 500);
                setTimeout(() => loadSchedule(false), 1000);
              }}
            >
              <Icon name="world" />
              ????????????
            </Button>
          </div>
          <br />
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => dispatch_registrationModal({ type: "close" })}
          >
            ??????
          </Button>
          <Button
            positive
            onClick={() => {
              // ????????? ??????
              axios.post("http://3.35.6.3:3000/api/schedule", {
                userId: userId, // ???????????????
                account: account, // ??????
                sharedUserId: friend.split(","),
                startTime: startDate,
                endTime: endDate,
                location: [37.663998, 127.978462],
                memo: meetingName,
              });
              return dispatch_registrationModal({ type: "close" });
            }}
          >
            ??????
          </Button>
        </Modal.Actions>
      </Modal>

      {/* ?????? ????????? ????????? ?????? ?????? modal */}
      <Modal
        size="small"
        open={check_open}
        onClose={() => dispatch_checkModal({ type: "close" })}
      >
        <Modal.Header>????????? ??????</Modal.Header>
        <Modal.Content>
          {/* <div>{targetInfo.title}</div>
          <div>{targetInfo.start}</div>
          <div>{targetInfo.end}</div> */}
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as="a">{targetInfo.title}</Item.Header>
                <Item.Meta>
                  {moment(targetInfo.start).format("YYYY MMMM Do a h:mm:ss")}
                </Item.Meta>
                <Item.Meta>
                  {moment(targetInfo.end).format("YYYY MMMM Do a h:mm:ss")}
                </Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => dispatch_checkModal({ type: "close" })}
          >
            ????????????
          </Button>
          <Button
            positive
            onClick={() => {
              // ????????? ??????
              return dispatch_checkModal({ type: "close" });
            }}
          >
            ??????
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CalendarForm;
