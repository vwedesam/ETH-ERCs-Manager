import { CssBaseline, Divider, Drawer, List, ListItemButton,
    ListItemText, Typography, AppBar, Toolbar, Box } from '@mui/material';
import ECR20App from './ERC20/ERC20App';

function AppAuthenticated(){
    const drawerWidth = 140;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Ethereum ERCs Manager
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant="permanent"
            anchor="left">
            <Toolbar />
            <Divider />
            <List>
                <ListItemButton>
                    <ListItemText primary="ERC-20" />
                </ListItemButton>
            </List>
            
        </Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p:3 }}>
                <Toolbar />
            {/* {ERCIndex === allERCs.findIndex((x) => x === ERC.ERC20) && <ERC20App />} */}
            <ECR20App/>
        </Box>
    </Box>
    )
}

export default AppAuthenticated;
