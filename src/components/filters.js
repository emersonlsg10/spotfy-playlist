import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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

function Filters() {
  const classes = useStyles();
  const [listFilters, setListFilters] = React.useState(null);
  useEffect(() => {
    const getInitialData = async () => {
      const responseFilters = await getFilters();
      setListFilters(responseFilters.filters);
    };
    getInitialData();
  }, []);

  const [filters, setFilters] = React.useState({
    locale: '',
    country: '',
    timestamp: '',
    limit: '',
    offset: '',
  });

  const handleChange = (event) => {
    console.log(event.target);
    // setFilters(event.target.value);
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
                  id="demo-simple-select"
                  // value={age}
                  onChange={handleChange}
                >
                  {item.values.map((item) => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {item.validation && item.validation.primitiveType === 'STRING' && (
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" onChange={(e) => console.log(e.target.value) } label={item.name} />
              </form>
            )}
            {item.validation && item.validation.primitiveType === 'INTEGER' && (
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="filled-number"
                  type="number"
                  label={item.name}
                  inputProps={{ min: item.validation.min || 1, max: item.validation.max || 50 }}
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
