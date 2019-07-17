import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

class LogIn extends Component {
    render(){
        console.log(this.props)

        return(
          <Grid container direction={'column'} justify={"center"} alignItems={"center"}>
              <Grid item xs={3}>
              <h2 style={{textAlign: "center"}}>Login</h2>
            <TextField variant={"outlined"}label={"Username"} className={"input-group-item"} value={this.props.username} onChange={this.props.inputHandler("username")} fullWidth/>
            <TextField variant={"outlined"} type={"password"} className={"input-group-item"} value={this.props.password} onChange={this.props.inputHandler("password")} label={"Password"} fullWidth/>
            <Grid container direction={"row"} justify={"center"}>
                <Button color={"secondary"} variant={"contained"} onClick={this.props.userLogIn}>Log In</Button>
            </Grid>
              </Grid>
          </Grid>
        );
    }
}

export default LogIn;