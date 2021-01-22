import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const getFilters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `http://www.mocky.io/v2/5a25fade2e0000213aa90776`,
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};

function Filters({ setFilters }) {
  const classes = useStyles();
  const [listFilters, setListFilters] = React.useState(null);
  
  useEffect(() => {
    const getInitialData = async () => {
      const responseFilters = await getFilters();
      setListFilters(responseFilters.filters);
    };
    getInitialData();
  }, []);

  const handleChange = (event, itemId) => {
    if (itemId === 'timestamp') {
      const dateFormated = `${event.target.value}:00.000Z`;
      setFilters((oldState) => ({ ...oldState, [itemId]: dateFormated }));
    } else {
      setFilters((oldState) => ({ ...oldState, [itemId]: event.target.value }));
    }
  };

  return (
    <div className={classes.container}>
      {listFilters &&
        listFilters.map((item) => (
          <>
            {item.values && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  {item.name}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id={item.id}
                  value={item.values[0].value}
                  name={item.name}
                  onChange={(e) => handleChange(e, item.id)}
                >
                  {item.values.map((item) => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {item.validation && item.validation.primitiveType === 'STRING' && (
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id={item.id}
                  name={item.name}
                  onChange={(e) => handleChange(e, item.id)}
                  label={item.name}
                  type="datetime-local"
                  defaultValue={`${new Date()}:00.000Z`}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            )}
            {item.validation && item.validation.primitiveType === 'INTEGER' && (
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id={item.id}
                  type="number"
                  name={item.name}
                  label={item.name}
                  value={item.id === 'limit' ? 10 : 1}
                  onChange={(e) => handleChange(e, item.id)}
                  inputProps={{
                    min: item.validation.min || 1,
                    max: item.validation.max || 50,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            )}
          </>
        ))}
    </div>
  );
}

export default Filters;
