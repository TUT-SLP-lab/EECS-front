import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionState } from "./useSessionState";

axios.defaults.withCredentials = true;

export const useDeskState = () => {
  const [deskData, setDeskData] = useState<DeskDataType[]>([]);
  const { sessionData } = useSessionState();
  const [isAPIWaiting, setIsSPIWaiting] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (sessionData != undefined) {
          const authToken = sessionData.getIdToken();
          const headers = {
            Authorization: authToken.getJwtToken()
          };
          await axios
            .get(`${process.env.NEXT_PUBLIC_APIURL}/desk`, { headers: headers })
            .then((response) => {
              // Handle the response here
              console.log(response.data); // Example: Logging the response data
            })
            .catch((error) => {
              // Handle any errors here
              console.error("An error occurred:", error);
            });
          // const response = await fetch(
          //   `${process.env.NEXT_PUBLIC_APIURL}/desk`,
          //   {
          //     headers: {
          //       Authorization: authToken.jwtToken,
          //     },
          //     mode: "cors",
          //   }
          // );
          // const data = await response.json();
          // console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sessionData]);

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
  };

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

  return {
    deskData,
    setDeskData,
    changeSitDesk,
    changeStandDesk,
    changeOldDesk,
  };
};
