import React, { useEffect } from 'react';
import Filters from './components/filters';
import Playlist from './components/playlist';
import { makeStyles } from '@material-ui/core/styles';
import callSpotfy from './hooks/spotfyPlaylist';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();

  const [listMusic, setListMusic] = React.useState(null);

  const [filters, setFilters] = React.useState({
    locale: 'en_AU',
    country: 'AU',
    limit: '50',
    offset: '1',
  });

  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setLoading(false);
  };

  const getPlayList = async (params = '') => {
    setLoading(true);
    const responsePlaylist = await callSpotfy(params);

    if (responsePlaylist && responsePlaylist.playlists)
      setListMusic(responsePlaylist.playlists);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const concatParams = () => {
    let params = '';
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    for (let i = 0; i < keys.length; i++) {
      params += `${keys[i]}=${values[i]}&`;
    }
    return params;
  };

  useEffect(() => {
    setInterval(() => {
      getPlayList(concatParams());
    }, 30000);
  }, []);

  useEffect(() => {
    getPlayList(concatParams());
  }, [filters]);

  return (
    <div className="app">
      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>
            Bem vindo a Playlist de lançamentos!
          </div>
          <Filters setFilters={setFilters} />
          <Playlist listMusic={listMusic || []} />
        </div>
      </div>
    </div>
  );
}

export default App;
