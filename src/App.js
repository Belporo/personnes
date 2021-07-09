import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Grid,IconButton,Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
  typography:{
    textAlign:'center',
    fontSize:40,
    marginTop:25
  }
}))

export const StyledTableCell = withStyles((theme) => ({
  head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontFamily:'ui-monospace'
  },
  body: {
      fontSize: 14,
      fontFamily:'ui-monospace',
  },
  root:{
      padding:'5px 10px'
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
      },
  },
}))(TableRow);


function App() {

  const [personnes,setPerson] = useState([])
  const [loading,setLoding] = useState(false)
  const [open,setOpen] = useState(false)
  const [name,setName] = useState("")
  const [subname,setSubname] = useState("")
  const [id,setId] = useState("")
  const classes = useStyles();
  const ref = firebase.firestore().collection("Users")
  function getPesons(){
    setLoding(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
        setPerson(items)
        setLoding(false)
    })
    
  }
  function handleCancel(){
    setName("")
    setSubname("")
    setId(null)
    setOpen(false)
  }

  function handleClose(){
    setOpen(false)
  }

  function updatePersons(){
    /*firebase.database().ref('Users/'+id).set({
      Nom:name,
      Prenom:subname
    })*/
    firebase.firestore().collection("Users").doc(id).update({
      Nom:name,
      Prenom:subname
    })
    handleCancel()
  }


  function handleRowClick(row){
    setName(row.Nom)
    setSubname(row.Prenom)
    setId(row.id)
    setOpen(true)
  }

  useEffect(() =>{
    getPesons();
  },[])
  if(loading){
    return <h1> Chargement ...</h1>
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Modifier une personne</DialogTitle>
      <DialogContent>
        <TextField id="standard-basic" label="Nom" onChange={event =>{setName(event.target.value)}} value={name}/>
        <br/>
        <TextField id="standard-basic" label="Prenom" onChange={event =>{setSubname(event.target.value)}} value={subname}/>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleCancel} color="primary">
            Annuler
        </Button>
        <Button onClick={updatePersons} color="primary">
            Modifier
        </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h1" component="h2" color="inherit" className={classes.typography}>Liste des personnes</Typography>
       <Grid container style={{ marginTop: 10 }}>
                    <TableContainer component={Paper} style={{margin:40}}>
                        <Table aria-label="customized table">
                            <TableHead style={{ background: "rgb(58 151 212)" }}>
                                <TableRow>
                                    <StyledTableCell>Nom</StyledTableCell>
                                    <StyledTableCell align="left">Prénom</StyledTableCell>
                                    <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {personnes.map((pers) => (
                                    <StyledTableRow key={pers.id} >
                                        <StyledTableCell component="th" scope="row">
                                            {pers.Nom}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {pers.Prenom}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <IconButton size="small" onClick={() => handleRowClick(pers)}>
                                                <EditIcon style={{ fill: 'blue' }} />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
    </div>
  );
}

export default App;
