import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link, Route} from 'react-router-dom'
import moment from "moment";
import Article from "./Article";
import {BrowserRouter as Router} from "react-router-dom";

class ArticleList extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        return (
            <Grid container direction={'column'}>
                <h1>My Posts</h1>
                <div style={{padding: 15}}>
                <Grid container direction={'row'} justify={"center"} alignItems={'center'} spacing={8}>
                        {this.props.db_posts.map(doc => {
                            return (
                                <Grid item xs={4}>
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
                                                                    <div className={'blog_post_date'}>{moment(doc.post_date).format('DD MM YY ')}</div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </Link>
                                    </Grid>
                            );
                        })
                        }
                    </Grid>
                </div>
            </Grid>

                );
    }
}

export default ArticleList;