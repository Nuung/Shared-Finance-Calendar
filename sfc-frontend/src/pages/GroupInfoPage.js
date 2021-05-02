import React from "react";
import ScheduleEndModal from "../components/modal/ScheduleEndModal";
import Toast from "../components/modal/Toast";
import Header from "../components/Header";

// 3. 캘린더에 등록한 일정 중에 모임이 끝나고 정산한 것만 / 월 별로 <Toast />
const GroupInfoPage = () => {
  return (
    <>
      <Header />
      <ScheduleEndModal />
    </>
  );
};

export default GroupInfoPage;
