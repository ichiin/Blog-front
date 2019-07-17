import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'


class LogOut extends Component{

    render(){return(
            <Grid container direction={"row"} alignItems={'center'} justify={'center'}>
                {(!this.props.session && <h1>Successfully disconnected.</h1>) || <h1>You need to log in first.</h1>}
            </Grid>
        );
    }
}

export default LogOut;