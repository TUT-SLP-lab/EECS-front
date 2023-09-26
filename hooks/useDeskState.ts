import { useEffect, useState } from "react";
import axios from "axios";

export const useDeskState = () => {
  const [deskData, setDeskData] = useState<DeskDataType[]>([]);
  const [isAPIWaiting, setIsSPIWaiting] = useState<boolean>(false);

  // useEffect(() => {
  //   (async() => {
  //       const url = "http://api";
  //       const response = await axios
  //       .get(url)
  //       .then((res) => res)
  //       .catch((error) => error);
  //       console.log(response);
  //   })
  // }, []);

  const changeSitDesk = (id: string, email: string, name: string) => {
    setDeskData((prevState) =>
      prevState.map((obj) =>
        obj.desk_id === id
          ? {
              room: obj.room,
              desk_id: obj.desk_id,
              email: email,
              username: name,
              position: { x: obj.position.x, y: obj.position.y },
              size: { x: obj.size.x, y: obj.size.y },
              timestamp: {
                createdAt: obj.timestamp.createdAt,
                updatedAt: obj.timestamp.updatedAt,
              },
            }
          : obj
      )
    );
  };

  const changeStandDesk = (id: string) => {
    setDeskData((prevState) =>
      prevState.map((obj) =>
        obj.desk_id === id
          ? {
              room: obj.room,
              desk_id: obj.desk_id,
              email: undefined,
              username: undefined,
              position: { x: obj.position.x, y: obj.position.y },
              size: { x: obj.size.x, y: obj.size.y },
              timestamp: {
                createdAt: obj.timestamp.createdAt,
                updatedAt: obj.timestamp.updatedAt,
              },
            }
          : obj
      )
    );
  };

  const changeOldDesk = (name: string) => {
    setDeskData((prevState) =>
      prevState.map((obj) =>
        obj.username === name
          ? {
              room: obj.room,
              desk_id: obj.desk_id,
              email: undefined,
              username: undefined,
              position: { x: obj.position.x, y: obj.position.y },
              size: { x: obj.size.x, y: obj.size.y },
              timestamp: {
                createdAt: obj.timestamp.createdAt,
                updatedAt: obj.timestamp.updatedAt,
              },
            }
          : obj
      )
    );
  }

  useEffect(() => {
    const tmpDeakData: DeskDataType[] = [
      {
        room: "F-301",
        desk_id: "100",
        email: undefined,
        username: "aaa",
        position: { x: 10, y: 10 },
        size: { x: 100, y: 100 },
        timestamp: { createdAt: "aaa", updatedAt: "bbb" },
      },
      {
        room: "F-301",
        desk_id: "101",
        email: undefined,
        username: undefined,
        position: { x: 100, y: 500 },
        size: { x: 50, y: 100 },
        timestamp: { createdAt: "aaa", updatedAt: "bbb" },
      },
      {
        room: "F-310",
        desk_id: "102",
        email: undefined,
        username: undefined,
        position: { x: 10, y: 200 },
        size: { x: 100, y: 50 },
        timestamp: { createdAt: "aaa", updatedAt: "bbb" },
      },
      {
        room: "F-301",
        desk_id: "103",
        email: undefined,
        username: undefined,
        position: { x: 10, y: 300 },
        size: { x: 100, y: 100 },
        timestamp: { createdAt: "aaa", updatedAt: "bbb" },
      },
      {
        room: "F-310",
        desk_id: "104",
        email: undefined,
        username: undefined,
        position: { x: 400, y: 10 },
        size: { x: 100, y: 100 },
        timestamp: { createdAt: "aaa", updatedAt: "bbb" },
      },
    ];
    setDeskData([...tmpDeakData]);
  }, []);

  return { deskData, setDeskData, changeSitDesk, changeStandDesk, changeOldDesk };
};