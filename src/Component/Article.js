import React from 'react';
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

class Article extends React.Component{

    render(){
        console.log(this.props)
        return(
          <Grid container direction={'row'} justify={'center'}>
            <Paper elevation={4} style={{padding: 30}}>
                <h1>{this.props.article_title}</h1>
                {this.props.article_tags.map(el => {
                    return <div>{el}</div>;
                })}
                <div dangerouslySetInnerHTML={{__html: this.props.article_body}}/>
                <span>{moment(this.props.article_date).format('DD MMMM YYYY')}</span>
            </Paper>
          </Grid>
        );
    }
}

export default Article;