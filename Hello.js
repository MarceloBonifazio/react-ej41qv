import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { useStyles } from './styles';

export default function Combocheck({ data, title, id }) {
  const node = useRef();
  const classes = useStyles();
  const [showDiv, setShowDiv] = useState(false);
  const [showChild, setShowChild] = useState({});
  const [state, setState] = useState({
    checkbox: data.map((element) => {
      element.checked = false;
      element.name = element.name ? element.name : element.region
      return element;
    }),
    checkedAll: false
  });

  const qtdChecked = state.checkbox.filter((el) => el.checked).length;
  const textInput = '';

  if (qtdChecked > 1) {
    textInput = `${qtdChecked} Selecionados`;
  } else if (qtdChecked === 1) {
    textInput = `${qtdChecked} Selecionado`;
  }

  const changeState = event => {
    const checkbox = state.checkbox.map((checkbox) => (
      event.target.value !== checkbox.code &&
      event.target.value !== checkbox.name ? 
        checkbox : 
        { ...checkbox, checked: !checkbox.checked }
    ));

    setState({ 
      checkbox,
      checkedAll: !checkbox.filter(item => !item.checked).length
    });
  }

  const resetState = () => {
    setState({ 
      checkbox: state.checkbox.map((checkbox) => {
        return { ...checkbox, checked: false }
      })
    });
  }

  const saveState = () => {
    const selected = 
    state.checkbox
      .filter((item) => item.checked)
      .map((item) => item['code']);

    setShowDiv(false);
  }

  const checkAll = () => {
    const newCheckedAll = !state.checkedAll;
    setState({ 
      checkbox: state.checkbox.map((checkbox) => {
        return { ...checkbox, checked: newCheckedAll }
      }),
      checkedAll: newCheckedAll
    });
  }

  const toggleChild = (code) => {
    console.log(code, showChild)
    setShowChild({
      ...showChild,
      [code]: !showChild[code]
    });
  }

  const closeDiv = () => {
    setShowDiv(false);
  }

  const openDiv = () => {
    document.addEventListener("mousedown", handleClick);
    setShowDiv(true);
  }

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    closeDiv();
  };

  return (
    <>
      <TextField
        label={title}
        className={classes.input}
        type='text'
        onClick={openDiv}
        value={textInput}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {showDiv ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
            </InputAdornment>
          ),
        }}
      />
      {showDiv && 
        <div className={classes.root} ref={node}> 
          <List>
            <ListItem>
              <Checkbox
                key='all'
                checked={state.checkedAll}
                onChange={checkAll}
                color="primary"
                disableRipple
              />
              <ListItemText primary="Todos"/>
            </ListItem>
            {state.checkbox.map((i) => {
              let hasChild;
              let keyWithChild;
              Object.keys(i).forEach((key) => {
                if (Array.isArray(i[key])) {
                  keyWithChild = key;
                  hasChild = i[key].length;
                }
              });

              return <ListItem>
                <Checkbox
                  key={i.code || i.name}
                  checked={i.checked}
                  onChange={changeState}
                  value={i.code || i.name}
                  color="primary"
                />
                <ListItemText primary={i.name || i.region}/>
                {hasChild &&
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete Todo"
                      onClick={() => toggleChild(i.name || i.region)}
                    >
                      <KeyboardArrowRight
                        className={classes.iconArrowRight}
                      />
                    </IconButton>
                    <ChildBox
                      setShowChild={setShowChild}
                      showChild={showChild[i.name || i.region]}
                      data={i[keyWithChild]}
                      title='teste'
                    />
                  </ListItemSecondaryAction>
                }
              </ListItem>
            })}
            <ButtonGroup
              color="primary"
              size="small"
              className={classes.buttonGroup}
            >
              <Button variant="text" className={classes.link} onClick={resetState}>
                Limpar dados
              </Button>
              <Button variant="outlined" onClick={saveState}>
                Confirmar
              </Button>
            </ButtonGroup>
          </List>
        </div>
      }
    </>
  );
}

function ChildBox({ data, title, showChild, setShowChild }) {
  const classes = useStyles();

  const [showChildInside, setShowChildInside] = useState({});

  const [state, setState] = useState({
    checkbox: data.map((element) => {
      element.checked = false;
      return element;
    }),
    checkedAll: false
  });

  const changeState = event => {
    const checkbox = state.checkbox.map((checkbox) => (
      event.target.value !== checkbox.code ?
        checkbox : 
        { ...checkbox, checked: !checkbox.checked }
    ));

    setState({ 
      checkbox,
      checkedAll: !checkbox.filter(item => !item.checked).length
    });
  }


  const toggleChild = (code) => {
    console.log(code, showChildInside)
    setShowChildInside({
      ...showChildInside,
      [code]: !showChildInside[code]
    });
  }

  return (
    <>
      {showChild && 
        <div className={classes.child}> 
          <List>
            {state.checkbox.map((i) => {
              let hasChild;
              let keyWithChild;
              Object.keys(i).forEach((key) => {
                if (Array.isArray(i[key])) {
                  keyWithChild = key;
                  hasChild = i[key].length;
                }
              });
              return <ListItem>
                <Checkbox
                  key={i.code || i.name}
                  checked={i.checked}
                  onChange={changeState}
                  value={i.code || i.name}
                  color="primary"
                />
                <ListItemText primary={i.name || i.region}/>
                {hasChild &&
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete Todo"
                      onClick={() => toggleChild(i.name || i.region)}
                    >
                      <KeyboardArrowRight
                        className={classes.iconArrowRight}
                      />
                    </IconButton>
                    <ChildBox
                      setShowChild={setShowChildInside}
                      showChild={showChildInside[i.name || i.region]}
                      data={i[keyWithChild]}
                      title='teste'
                    />
                  </ListItemSecondaryAction>
                }
              </ListItem>
            })}
          </List>
        </div>
        }
    </>
  );
}