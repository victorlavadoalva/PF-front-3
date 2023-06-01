import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { isAfter } from 'date-fns';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions';
import { reservasColumns } from '../../dataHardcodeo/constants';

export default function DataGridDemo() {

    const [isActive, setIsActive] = React.useState(false);
    const reservs = useSelector(state => state.reservs);
    const dispatch = useDispatch();
    const restDataStorage = window.localStorage.getItem('UserLogVerificate');
    const restData = JSON.parse(restDataStorage);
    const restoId = restData.id;

    console.log("Reservas : ",reservs);

    React.useEffect(() => {
        dispatch(actions.getReservs(restoId));

    }, [restoId]);

    const columns = reservasColumns;

    const today = new Date();
    let reservationsRows = reservs
        .filter((reserva) => isAfter(new Date(reserva.dia), today))
        .map((reserva) => {
            return{
                id: reserva.nombre._id,
                name: reserva.nombre.name,
                day: reserva.dia,
                hour: reserva.hora,
                quanty: reserva.people,
                email: reserva.nombre.email
            }
        });
    console.log("Reservas DATA : ", reservationsRows);

    const reservasRows2 = 
    [{
        id: 1,
        name: "Snow",
        day: "26/04",
        hour: "20:45",
        quanty: 4,
        phone: 36546545,
    }]

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={reservationsRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
};
