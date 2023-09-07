import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeIcon from '@mui/icons-material/Home';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type Page = {
  name: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const LargeStyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

const SmallStyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

const pages: Page[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Converter', href: '/converter', icon: AutorenewIcon },
  { name: 'Workout Timer', href: '/workouttimer', icon: AlarmOnIcon },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar variant='dense'>
          <ConstructionIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MultiTool
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {React.createElement(page.icon)}
                  <Typography textAlign='center'>
                    <SmallStyledLink to={page.href}>
                      {page.name}
                    </SmallStyledLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ConstructionIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MultiTool
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <LargeStyledLink to={page.href} key={page.name}>
                <Button sx={{ color: 'white' }}>
                  {React.createElement(page.icon, {
                    sx: { mr: 1 },
                  })}
                  {page.name}
                </Button>
              </LargeStyledLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
