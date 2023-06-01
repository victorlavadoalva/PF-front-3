import axios from 'axios';
import { useEffect, useState } from 'react';
import Table, { Direction } from 'react-data-table-component';
import SelectSmall from '../../Components/Select';
import imgDefault from '../../Img/ImgCardLanding/default.png';
import Loading_Login from '../Loading';
import style from './Table.module.css';


const TableAdmin = () => {
    
    const [bandera, setBandera] = useState(null);
    const [typeUser, setType_user] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [galleta, setGalleta] = useState(false);

    const dataStorage = localStorage.getItem("UserLogVerificate");
    const dataParsed = JSON.parse(dataStorage);
    
    // const token = dataParsed.token;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODU1NDc1MzUsImV4cCI6NDg0MTMwNzUzNX0.7fDrfKD497Nfcsjcn7hE0Qkd8Mp-lbAq6uCBL4exIxc"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODU2MzA4MTksImV4cCI6NDg0MTM5MDgxOX0.oTz390vmjqpfXdULMY7m0fkcWdBBoLNRQ5pTWz6DYQk"
    const password = "uhsjkew-2-3.wkjdss--s.d";

    const columns = [
        {
            name: 'Name',
            cell: (row) => (
                <div style={{ justifyContent: 'center', display: 'contents' }}>
                    <img src={row.image || imgDefault} alt="Avatar" style={{ width: '40px', marginRight: '1em', borderRadius: '2em' }} />
                    {row.name}
                </div>
            ),
            sortable: true
        },
        {name: 'Email', selector: row => row.email, sortable:true},
        {name: 'Rol', selector: row => row.rol, sortable:true},
        {
            name: 'Status', 
            cell: (row) => (
                <p className={
                    row.status === "active" 
                    ? style.status 
                    : row.status === "banned" 
                    ? style.statusBanned 
                    : style.statusInactive
                }>{row.status}</p> 
            ),
            sortable:true
        },
        {name: 'Rating', selector: row => row.rating, sortable:true},
        {name: 'Country', selector: row => row.country, sortable:true},
        {
            name: 'Actions', cell:(row) => (
            bandera && bandera.email === row.email 
            ? row.status == "active" 
            ? row.rol.toLowerCase() == "user"
            ?
            <div className={style.contBanadmin}>
                <button id={row.id} name={row.rol} className={style.button} onClick={handlerBan}>Ban</button>
                <button id={row.id} name={row.rol} className={style.buttonAdmin} onClick={handlerSetAdmin}>Set Admin</button>
            </div> 
            : row.rol.toLowerCase() == "admin"
            ? 
            <div className={style.contBanadmin}>
                <button id={row.id} name={row.rol} className={style.button} onClick={handlerBan}>Ban</button>
                <button id={row.id} name={row.rol} className={style.buttonAdminChau} onClick={handlerRemoveAdmin}>Rem. Admin</button>
            </div>
            : <button id={row.id} name={row.rol} className={style.button} onClick={handlerBan}>Ban</button>
            : <button id={row.email} className={style.buttonUndo} onClick={handlerUnban}>Unban</button>
            : null)
        }
    ]

    let datas;
    useEffect(async () => {
        // datas = await axios.get(`http://pf-backend-production-83a4.up.railway.app/admin`, {
        datas = await axios.get(`http://localhost:3001/admin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        let filteredData = datas.data;
      
        if (typeUser !== "") {
          filteredData = filteredData.filter((data) => data.rol.toLowerCase() === typeUser);
        }
      
        if (status !== "") {
          filteredData = filteredData.filter((data) => data.status === status);
        }
      
        if (!filteredData.length) {
          setData([0]);
        } else {
          setData(filteredData);
        }
    }, [typeUser, status, galleta]);

    const handlerClick = (row) => {
        setBandera(row);
    }

    const type_user = [
        {
            id:'restaurante',
            name:'restaurante'
        },
        {
            id:'user',
            name:'user'
        },
        {
            id:'admin',
            name:'admin'
        }
    ]
    const typeStatus = [
        {
            id:'banned',
            name:'banned'
        },
        {
            id:'active',
            name:'active'
        },
        {
            id:'innactive',
            name:'innactive'
        }
    ]


    const handleTypeUser = (event) => {
        setData([])
        const selectedType = event.target.value || '';
        // const selectedType = 'User';
        setType_user(selectedType);
    };
    const handlerStatus = (event) => {
        setData([])
        const selectedStatus = event.target.value || '';
        setStatus(selectedStatus);

    }

    const handlerBan = (event) => {
        // axios.get(event.target.name == "Restaurant" ? `http://pf-backend-production-83a4.up.railway.app/restaurants/${event.target.id}` : `http://pf-backend-production-83a4.up.railway.app/users/${event.target.id}`)
        axios.get(event.target.name == "Restaurant" ? `http://localhost:3001/restaurants/${event.target.id}` : `http://localhost:3001/users/${event.target.id}`)
        .then((data) => {
            // axios.post(`http://pf-backend-production-83a4.up.railway.app/banned`,{
            axios.post(`http://localhost:3001/banned`,{
                user_banned:data.data
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setGalleta(!galleta);
        }
        ).catch((error) => console.log(error))
    }

    const handlerSetAdmin = (event) => {
        // axios.get(event.target.name == "Restaurant" ? `http://pf-backend-production-83a4.up.railway.app/restaurants/${event.target.id}` : `http://pf-backend-production-83a4.up.railway.app/users/${event.target.id}`)
        axios.put(`http://localhost:3001/users/${event.target.id}?password=${password}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((data) => {

            const existingData = localStorage.getItem('UserLogVerificate');
            const userData = JSON.parse(existingData);

            userData.isAdmin = data.data.isAdmin;
            userData.token = data.data.token;

            const updatedData = JSON.stringify(userData);

            localStorage.setItem('UserLogVerificate', updatedData);
            let datoas = localStorage.getItem('UserLogVerificate')
            console.log(JSON.parse(datoas));
            setGalleta(!galleta);
        }
        ).catch((error) => console.log(error))
    }
    const handlerRemoveAdmin = (event) => {
        // axios.get(event.target.name == "Restaurant" ? `http://pf-backend-production-83a4.up.railway.app/restaurants/${event.target.id}` : `http://pf-backend-production-83a4.up.railway.app/users/${event.target.id}`)
        axios.put(`http://localhost:3001/users/${event.target.id}?password=removeAdmin`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((data) => {
            const existingData = localStorage.getItem('UserLogVerificate');
            const userData = JSON.parse(existingData);

            userData.isAdmin = data.data.isAdmin;
            userData.token = data.data.token;

            const updatedData = JSON.stringify(userData);

            localStorage.setItem('UserLogVerificate', updatedData);

            let datoas = localStorage.getItem('UserLogVerificate')
            console.log(JSON.parse(datoas));
            setGalleta(!galleta);
        }
        ).catch((error) => console.log(error))
    }

    const handlerUnban = (event) => {
        console.log(token);
        // axios.get(`http://pf-backend-production-83a4.up.railway.app/banned?email=${event.target.id}`,{
        axios.get(`http://localhost:3001/banned?email=${event.target.id}`,{
            headers: {
                Authorization: `Bearer ${token}`
                // 'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            // axios.delete(`http://pf-backend-production-83a4.up.railway.app/banned/${data.data._id}`,{
            axios.delete(`http://localhost:3001/banned/${data.data._id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                    // 'Content-Type': 'application/json'
                }
            })
            setGalleta(!galleta);
        }
        ).catch((error) => console.log(error))
    }

    return(
        <>
        <SelectSmall value={typeUser} onChange={handleTypeUser} items={type_user} title="Filter Rol..." />
        <SelectSmall value={status} onChange={handlerStatus} items={typeStatus} title="Filter Status..." />
        {
            data.length
            ? <Table 
                columns={columns}
                data={data}
                direction={Direction.AUTO}
                // customStyles={styles}
                highlightOnHover={true}
                pointerOnHover={true}
                theme="solarized"
                onRowClicked={handlerClick}
                pagination={true}
                paginationPerPage={10}
            />
            : <Loading_Login />
        }
        
        </>
    );
};

export default TableAdmin
