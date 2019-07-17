import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mayuri from "../mayuri.jpg";
import moment from "moment";

class ArticleList extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render(){
        console.log(this.props.db_posts);
        return(

            <Grid container direction={'column'}>
                <h1>My Posts</h1>
                <Grid container direction={'row'} justify={"center"} alignItems={'center'}>
                    {this.props.db_posts.map(doc => {
                        return(
                            <Grid item xs={5} style={{padding: 10}}>
                                <Paper style={{paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, marginRight: 15, marginLeft: 15, height: "300px"}} elevation={4}>
                                    <Grid container direction={"row"} alignItems={"center"} justify={"flex-end"}>
                                        <Grid item xs={5}>
                                            <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                                                <div className={"blog_post_title"}>{doc.post_title}</div>
                                                <div> nb comments : {doc.post_comments.length}</div>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction={"row"} alignItems={"center"} justify={"space-between"}>
                                                <Grid item xs={5}>
                                                    <img src={doc.post_imgURL||mayuri} alt={"blog_post_img"} style={{maxWidth: '100%',maxHeight: '100%'}} />
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <div className={"blog_post_body"} style={{overflowWrap: "break-word", fontSize: '21px', maxHeight: "100%", height: "100%"}}>{doc.post_body}</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction={"row"} alignItems={"center"} justify={"flex-end"}>
                                                <div className={"blog_post_date"}>{doc.post_date?moment(doc.post_date).format("DD-YY-MM"):null}</div>
                                            </Grid>
                                            <button onClick={this.props.deletePost(doc._id)}> <FontAwesomeIcon icon={"trash-alt"}/> </button>
                                            <FontAwesomeIcon icon={"edit"}/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )})}
                </Grid>
            </Grid>
        );
    }
}

export default ArticleList;