import {
  AppBar, Drawer, Toolbar, Typography, IconButton, List, ListItem,
  ListItemText, ListItemButton, CssBaseline, useMediaQuery, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const drawerContent = (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/"
          onClick={() => setMobileOpen(false)}
          selected={location.pathname === '/'}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/list"
          onClick={() => setMobileOpen(false)}
          selected={location.pathname === '/list'}
        >
          <ListItemText primary="List" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            ShortLink App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      ) : (
        // Drawer for desktop
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8, 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
