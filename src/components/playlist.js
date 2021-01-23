import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: 30,
    backgroundColor: '#252525',
    width: '100%',
    borderRadius: 5,
  },
  listItem: {
    height: 50,
    color: '#fff',
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgb(52,56,59)',
    },
  },
  selected: {
    fontSize: 40,
    color: '#40ff40',
  },
  noSelected: {
    fontSize: 40,
    color: 'gray',
  },
}));

function Playlist({ listMusic }) {
  const classes = useStyles();
  const [selectedMusic, setSelectedMusic] = useState(0);

  return (
    <List dense className={classes.list}>
      {listMusic.items && listMusic.items.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem onClick={() => setSelectedMusic(index)} className={classes.listItem} key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={value.images[0].url}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value.name} />
            {selectedMusic === index ? <PlayCircleOutlineIcon className={classes.selected} /> : <PlayCircleOutlineIcon className={classes.noSelected} />}
          </ListItem>
        );
      })}
    </List>
  );
}
export default Playlist;