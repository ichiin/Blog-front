import React, {Component} from 'react';
import banner from '../tech.jpg';
import Grid from '@material-ui/core/Grid'
import {TextField} from "@material-ui/core";
import moment from "./ArticleList";
import {Link} from "react-router-dom";

class Home extends Component {
    render(){
        console.log(this.props)
        return(
        <Grid container direction={'column'} alignItems={'center'} justify={'center'}>
            <Grid id={'header'} container direction={'column'} alignItems={'center'} justify={'center'} style={{height: '30vh'}}>
                <div className={'banner-text'}>Everyday is a</div>
                <div className={'banner-text banner-gradient-text'}>GRIND</div>
                </Grid>
            <h1>News</h1>
            <Grid container direction={'row'} justify={'center'}>
                {this.props.latestPosts && this.props.latestPosts.map(doc => {
                    return(
                        <Grid item xs={8} style={{marginBottom: 15}}>
                            <Link to = {`/${doc.post_title.replace(/ /g, '-')}`}>
                                <div id={"cardbg"}>
                                    <div id={"carddark"}>
                                        <Grid container direction={'column'} style={{padding: 20, height: 265}} justify={'center'}>
                                            <Grid container direction={'row'}>
                                                <div className={'blog_post_title'}>{doc.post_title}</div>
                                            </Grid>
                                            <Grid container direction={'row'} justify={"center"} alignItems={"center"}>
                                                <Grid item xs={7}>
                                                    <div className={'blog_post_body'} style={{maxHeight: "105px", overflowY:"hidden"}}>{doc.post_body}</div>
                                                </Grid>
                                                {doc.post_imgURL && doc.post_imgURL.length > 0 && <Grid item xs={5}>
                                                    <Grid container justify={"center"} direction={"row"}>
                                                        <img src={doc.post_imgURL} alt={"lul"} style={{height: "100px", width: "100px", borderRadius: "50%", border: "1px solid white"}}/>
                                                    </Grid>
                                                </Grid>}
                                            </Grid>
                                            <Grid container direction={'row'}>
                                                {doc.post_tags.map(tag => {
                                                    return <div className={'blog_post_tag'}>{tag}</div>;
                                                })}
                                                <Grid item xs>
                                                    <Grid container direction={'row'} justify={"flex-end"} alignItems={"center"} style={{height: '100%'}}>
                                                        <div className={'blog_post_date'}>{doc.post_date}</div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
        );
    }
}

export default Home;