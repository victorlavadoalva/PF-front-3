import { Box, Paper, Typography } from "@mui/material";
import PedidosCliente from "../../Components/PedidosCliente";
// import { pedidosClienteRows } from "../../dataHardcodeo/constants";
import axios from "axios";
import { useEffect, useState } from "react";

// import styles from "./styles.module.css";

export const Transactions = ({ restId }) => {
  const [pedidoRows, setPedidoRows] = useState([]);

  useEffect(() => {
    const fetchPedidosCliente = async () => {
      try {
        const { data } = await axios.get(
          `https://pf-backend-production-83a4.up.railway.app/users/transactions/${restId}`
        );
        setPedidoRows(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidosCliente();
  }, [restId]);

  return (
    <Box>
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" align="left">
            Mis Pedidos
          </Typography>
          <PedidosCliente rows={pedidoRows} />
        </Paper>
      </Box>
    </Box>
  );
};
