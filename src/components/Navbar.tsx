import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import NavMenu from './Menu';
import { IBasicSelectorState } from '../store/reducers/basicReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const acumulatedFee = useSelector((state: IBasicSelectorState) => state.basicState.acumulatedFee);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <NavMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Cripto-Challenge - Acumulated fee (current rate %1.5):
            {' '}
            {acumulatedFee}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
