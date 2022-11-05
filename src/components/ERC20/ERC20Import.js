import { useState, useEffect } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Allowance from './Methods/Allowance';
import BalanceOf from './Methods/BalanceOf';
import Approve from './Methods/Approve';
import TransferFrom from './Methods/TransferFrom';
import Transfer from './Methods/Transfer';

const ERC20Token = require("./ERC20Token");
const { web3, applyDecimals } = require("../../utils/ethereumAPI");

function ERC20Import({
    tokenAddress
}){
    // connect to deployed contract
    const web3Token = new web3.eth.Contract(ERC20Token.abi, tokenAddress)
    const [tokenRefresh, setTokenRefresh] = useState(0);
    const [tokenData, setTokenData] = useState([
        { id: 0, name: 'Address', value: tokenAddress },
        { id: 1, name: 'Name', value: '' },
        { id: 2, name: 'Symbol', value: '' },
        { id: 3, name: 'TotalSupply', value: '' },
        { id: 4, name: 'Decimals', value: '' },
        { id: 5, name: 'Current balance', value: '' }
    ]);

    const columns = [
        { field: 'name', headerName: 'Token', width: 150 },
        { field: 'value', headerName: 'Value', width: 500 }
    ];

    const refreshDataGrid = () => setTokenRefresh(t => ++t);

    useEffect(()=>{
        async function fetchData(){
            // contract interactions
            const name = await web3Token.methods.name().call();
            const symbol = await web3Token.methods.symbol().call();
            const decimals = await web3Token.methods.decimals().call();
            const totalSupply = await web3Token.methods.totalSupply().call();

            const accounts = await web3.eth.getAccounts();
            const currentBalance = await web3Token.methods.balanceOf(accounts[0]).call();

            setTokenData([
                tokenData[0],
                { ...tokenData[1], value: name },
                { ...tokenData[2], value: symbol },
                { ...tokenData[3], value: applyDecimals(totalSupply, decimals) },
                { ...tokenData[4], value: decimals },
                { ...tokenData[5], value: applyDecimals(currentBalance, decimals) }
            ])
        }

        fetchData()
    }, [tokenAddress])

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                        Token info
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ height: '450px' }}>
                    <DataGrid rows={tokenData} columns={columns} />
                </Grid>
            </Grid>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <BalanceOf web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Allowance web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Transfer web3Token={web3Token} tokenData={tokenData} refreshDataGrid={refreshDataGrid}/>
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <TransferFrom web3Token={web3Token} refreshDataGrid={refreshDataGrid} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Approve web3Token={web3Token} refreshDataGrid={refreshDataGrid} tokenData={tokenData} />
            </Box>
        </div>
    )
}

export default ERC20Import;

