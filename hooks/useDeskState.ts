import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionState } from "./useSessionState";

axios.defaults.withCredentials = true;

export const useDeskState = () => {
  const [deskDatas, setDeskDatas] = useState<DeskDataType[]>([]);
  const { sessionData } = useSessionState();

  useEffect(() => {
    (async () => {
      try {
        if (sessionData != undefined) {
          const authToken = sessionData.getIdToken();
          const headers = {
            Authorization: authToken.getJwtToken(),
          };
          await axios
            .get(`${process.env.NEXT_PUBLIC_APIURL}/desk`, { headers: headers })
            .then((response) => {
              setDeskDatas(response.data);
            })
            .catch((error) => {
              console.error("An error occurred:", error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sessionData]);

  async function changeSitDesk(id: string) {
    console.log("waiting");
    if (sessionData != undefined) {
      const authToken = sessionData.getIdToken();
      const headers = {
        Authorization: authToken.getJwtToken(),
      };
      const response = await axios
        .put(`${process.env.NEXT_PUBLIC_APIURL}/desk/${id}`,undefined, {
          headers: headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.error("An error occurred:", error);
        });
      changeOldDesk(response.username);
      setDeskDatas((prevState) =>
        prevState.map((obj) =>
          obj.desk_id === response.desk_id ? response : obj
        )
      );
    }
  }

  async function changeStandDesk(id: string) {
    if (sessionData != undefined) {
      const authToken = sessionData.getIdToken();
      const headers = {
        Authorization: authToken.getJwtToken(),
      };
      const response = await axios
        .delete(`${process.env.NEXT_PUBLIC_APIURL}/desk/${id}`, {
          headers: headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.error("An error occurred:", error);
        });
      setDeskDatas((prevState) =>
        prevState.map((obj) =>
          obj.desk_id === response.desk_id
            ? {
                room: response.room,
                desk_id: response.desk_id,
                email: undefined,
                username: undefined,
                position: {
                  x: response.position.x,
                  y: response.position.y,
                },
                size: { x: response.size.x, y: response.size.y },
                createdAt: response.createdAt,
                updatedAt: response.updatedAt,
              }
            : obj
        )
      );
    }
  }

  const changeOldDesk = (name: string) => {
    setDeskDatas((prevState) =>
      prevState.map((obj) =>
        obj.username === name
          ? {
              room: obj.room,
              desk_id: obj.desk_id,
              email: undefined,
              username: undefined,
              position: { x: obj.position.x, y: obj.position.y },
              size: { x: obj.size.x, y: obj.size.y },
              createdAt: obj.createdAt,
              updatedAt: obj.updatedAt,
            }
          : obj
      )
    );
  };

  return {
    deskDatas,
    setDeskDatas,
    changeSitDesk,
    changeStandDesk,
    changeOldDesk,
  };
};
