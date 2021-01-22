import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: 30,
    backgroundColor: '#252525',
    width: '100%',
  },
  listItem: {
    height: 50,
    color: '#fff',
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgb(52,56,59)',
    },
  },
}));

function Playlist({ listMusic }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.list}>
      {listMusic.items && listMusic.items.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem className={classes.listItem} key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={value.images[0].url}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value.name} />
          </ListItem>
        );
      })}
    </List>
  );
}
export default Playlist;