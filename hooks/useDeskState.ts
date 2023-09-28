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
            Authorization: authToken.getJwtToken(),
          };
          const response = await axios
            .get(`${process.env.NEXT_PUBLIC_APIURL}/desk`, { headers: headers })
            .then((response) => {
              // Handle the response here
              console.log(response.data); // Example: Logging the response data
              setDeskData(response.data);
            })
            .catch((error) => {
              // Handle any errors here
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
        .put(`${process.env.NEXT_PUBLIC_APIURL}/desk/${id}`, {
          headers: headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          // Handle any errors here
          console.error("An error occurred:", error);
        });
      changeOldDesk(response.username);
      setDeskData((prevState) =>
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
          // Handle any errors here
          console.error("An error occurred:", error);
        });
      setDeskData((prevState) =>
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
              createdAt: obj.createdAt,
              updatedAt: obj.updatedAt,
            }
          : obj
      )
    );
  };

  return {
    deskData,
    setDeskData,
    changeSitDesk,
    changeStandDesk,
    changeOldDesk,
  };
};
