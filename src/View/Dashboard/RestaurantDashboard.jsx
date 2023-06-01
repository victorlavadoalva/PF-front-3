import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loading_Login from "../Loading";
import style from "./RestaurantDashboard.module.css";
import ValorationsMonth from "./dashComponents/ValorationsMonth";
import TopUsers from "./dashUsers/topUsers";
import Deliverys from "./raiting/Deliverys";

const Dashboards = () => {
  const [dataDhas, setDataDhas] = useState(null);
  const isMounted = useRef(true);
  const dataStorage = localStorage.getItem("UserLogVerificate");
  const dataParsed = JSON.parse(dataStorage);
  const token = dataParsed.token;
  console.log(token);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `https://pf-backend-production-83a4.up.railway.app/restaurants/dashboard/${dataParsed.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            },
          }
        )
        .then((response) => {
          if (isMounted.current) {
            setDataDhas(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);
  console.log(dataDhas);

  return (
    <>
      <div className={style.banerCont}>
        <h1>{dataParsed.name}</h1>
      </div>
      <div className={style.container}>
        <ValorationsMonth data={dataDhas ? dataDhas : []} />
        <Deliverys data={dataDhas ? dataDhas : []} />
        {/* <ResMensual /> */}
      </div>
      <div className={style.banerCont}>
        <h1>Clientes Destacados</h1>
      </div>
      <div className={style.container}>
        {dataDhas ? (
          dataDhas.topFiveUsers.map((user) => {
            return <TopUsers data={user} />;
          })
        ) : (
          <Loading_Login />
        )}
      </div>
    </>
  );
};

export default Dashboards;
