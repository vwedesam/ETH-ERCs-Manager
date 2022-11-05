
import { Box, Link } from "@mui/material"
import { useState } from "react";
import ERC20Create from "./ERC20Create";
import ERC20Import from "./ERC20Import";
import ERC20MainMenu from "./ERC20MainMenu";

const Menu = {
    Main: 0,
    Create: 1,
    Import: 2
}

function ECR20App(){

    const [menu, setMenu] = useState(Menu.Main);
    const [tokenAddress, setTokenAddress] = useState("");

    const onClickCreate = () => setMenu(Menu.Create)
    const importToken = (address) => {
        setTokenAddress(address)
        setMenu(Menu.Import)
    }

    return(
        <div>
            {
                menu !== Menu.Main && 
                <Box>
                    <Link href="#" 
                        onClick={()=> setMenu(Menu.Main)}
                        sx={{ min: 1}}
                        >
                            Back
                        </Link>
                </Box>
            }
            { menu === Menu.Main && <ERC20MainMenu importToken={importToken} onClickCreate={onClickCreate} />}
            { menu === Menu.Create && <ERC20Create importToken={importToken} />}
            { menu === Menu.Import && <ERC20Import tokenAddress={tokenAddress} />}
        </div>
    )

}

export default ECR20App;
