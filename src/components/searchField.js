import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchField({ history, setListMusic }) {
  const classes = useStyles();

  const handleSearch = (event) => {
    const searchText = event.target.value;
    if (searchText !== '')
      setListMusic(history.filter((item) => item.name.toUpperCase().includes(searchText.toUpperCase())));
    else setListMusic(history);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Buscar músicas"
        onChange={handleSearch}
        inputProps={{ 'aria-label': 'Buscar músicas' }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
