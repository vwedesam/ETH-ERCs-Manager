import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material"

function ERC20MainMenu({
    onClickCreate,
    importToken
}){

    const [contractAddress, setContractAddress] = useState('')

    const _importToken = () => {
        importToken(contractAddress)
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                    Import token
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx={{ m: 1, width: '35ch' }}
                    size="small"
                    placeholder="0x0000000000000000000000000000000000000000"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)} 
                    />
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={_importToken}
                    // disabled={loading}
                >
                    Import Token
                </Button>
            </Grid>
            <Grid item xz={2}>
                <Button
                    onClick={onClickCreate}
                    sx={{ min: 1 }}
                    variant="contained"
                >
                    Create Token
                </Button>
            </Grid>
        </Grid>
    )
}

export default ERC20MainMenu;
