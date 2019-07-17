import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import ReactQuill from 'react-quill'
require('react-quill/dist/quill.snow.css');

class AddPost extends Component{
    render(){
        return(
            <Grid container direction={'column'} justify={"flex-start"} alignItems={'center'}>
                <h1>Add a new Post !</h1>
                <h2>Post name</h2>
                <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={5}>
                        <TextField
                            label="Name"
                            value={this.props.new_post_name}
                            variant={'filled'}
                            onChange={this.props.inputHandler('new_post_name')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <h2>Post picture URL</h2>
                <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={5}>
                        <TextField
                            label="Picture URL"
                            value={this.props.new_post_imgURL}
                            variant={'filled'}
                            onChange={this.props.inputHandler('new_post_imgURL')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <h2>Post tags</h2>
                <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={5}>
                        <TextField
                            id="standard-name"
                            label="Tags"
                            value={this.props.new_post_tags}
                            onChange={this.props.inputHandler('new_post_tags')}
                            onKeyPress={this.props.tagsAdd}
                            variant={'filled'}
                            margin="normal"
                            fullWidth
                        />
                        {this.props.new_post_tags_array.map(tag => {
                            return <Chip key={tag} label={tag} variant="outlined" color="primary" onDelete={() => this.props.handleDeleteTag(tag)}/>
                        })}

                    </Grid>
                </Grid>
                <h2>Post text</h2>
                <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={8}>
                        <ReactQuill
                            value={this.props.new_post_body}
                            onChange={this.props.inputHandler('new_post_body')}
                        />
                    </Grid>
                </Grid>
                <Button onClick={this.props.addPost} variant={"contained"} color="secondary">Add</Button>
                <Dialog open={this.props.new_post_inserted === 0} onClose={this.props.clearNewPost}>
                    <p>Your post has been published</p>
                </Dialog>
            </Grid>
        );
    }
}

export default AddPost;