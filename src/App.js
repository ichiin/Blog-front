import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'
import './App.css';
import ArticleList from './Component/ArticleList';
import LogIn from './Component/LogIn';
import AddPost from './Component/AddPost'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Component/Home';
import About from './Component/About';
import LogOut from './Component/LogOut';
import Axios from "axios"
import moment from "moment"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Article from "./Component/Article";

const url = "http://127.0.0.1:4000/blog";

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      db_posts: [],
      new_post_name: '',
      new_post_tags: "",
      new_post_tags_array: [],
      new_post_body: '',
      new_post_imgURL: '',
      new_post_inserted: 1,
      username: "",
      password: "",
      latest: []
    };
  }

  generateRoutes = () => {
    let arr = [];
    const labels = ["Home", "About","LogIn"];
    const routes = ["/", "/About", "/LogIn"]
    labels.map((lab, i) => {
      arr.push({label: lab, route: routes[i]})
    })
    this.setState({navigation: arr})
  }

  injectNavElement = (obj) => {
    return <Grid item xs={1}>
                  <Link to = {obj.route}><span>{obj.label}</span></Link>
                </Grid>;
  }

  inputHandler = (name) => (event) =>{
    this.setState({[name]: event.target.value})
}

  tagsAdd = (event) => {
    console.log('hi')
    let tag = this.state.new_post_tags;
    if(event.key === "Enter" && tag.length > 0) {
      let tab = this.state.new_post_tags_array;
      tab.push(tag);
      this.setState({new_post_tags_array: tab, new_post_tags: ""});
    }
  }
  handleDeleteTag = (name) => {
    let tab = this.state.new_post_tags_array.filter(el => el !== name);
    console.log(tab);
    this.setState({new_post_tags_array: tab});
  }

  addPost = () => {
    let query = url + "/add?";
    let parameters = {
      post_body: this.state.new_post_body,
      post_title: this.state.new_post_name,
      post_tags: this.state.new_post_tags_array,
      post_date: moment().format('DD-MM-YYYY h:mm:ss'),
      post_imgURL: this.state.new_post_imgURL,
      post_comments: []
    }
    Axios.post(query, null, {params: parameters}).then(res => {
      console.log(res)
      this.setState({new_post_inserted: 0})
    })
        .catch(err => {
          console.log(err)
        })
  }

  userLogIn = () => {
    let query = url + "/log?";
    let parameters = {
      username: this.state.username,
      password: this.state.password,
    }
    Axios.post(query, null, {params: parameters}).then(res => {
      if(res.data.creditentials === true){
        let arr = [];
        if (res.data.level === 0){
          const labels = ["Home", "About", "List", "Add", "LogOut"];
          const routes = ["/", "/About", "/ArticleList", "/AddPost", "/LogOut"];
          labels.map((lab, i) => {
            arr.push({label: lab, route: routes[i]})
          });
        }
        this.setState({session: {level: res.data.level}, navigation: arr})
      }
    })
        .catch(err => {
          console.log(err)
        })
  }

  logOut = () => {
    if(this.state.session){
      this.setState({session: null})
      return true;
    }else{
      return false;
    }
  }

  clearNewPost = () => {
    this.setState({
      new_post_body: "",
      new_post_name: "",
      new_post_tags_array: [],
      new_post_imgURL: "",
      new_post_inserted: "1",
    })
  }

  getPost = (id) => {
    console.log('id',id)
    let query = url + "/getPost?";
    Axios.post(query, null, {params: {_id: id}}).then(res => {
      return {
        article_title: res.data.doc[0].post_title,
        article_tags: res.data.doc[0].post_tags,
        article_body: res.data.doc[0].post_body,
        article_date: res.data.doc[0].post_date
      }
      //redirect to page single blog post with props
    }).catch(err => {
      console.log(err);
    })
  }

  readArticle = async(id) =>{
    const article = await this.getPost(id);
}

  getAllPosts = () => {
    let query = url + "/getPosts?";
    Axios.get(query, null).then(res => {
      this.setState({db_posts: res.data.doc, latest: (res.data.doc).slice(0, 4)});
    }).catch(err => {
      console.log(err);
    })
  }

  isAdmin = () => {
    return (this.state.level && this.state.level === 0)
}


  deletePost = (id) => (event) => {
    let query = url + "/deletePost?";
    Axios.post(query, null, {params: {_id : id}}).then(_ => {
      this.getAllPosts();
  }).catch(err => {
    console.log(err);
})
}

  async componentDidMount() {
    library.add(faCheckSquare, faTrashAlt, faEdit)
    this.generateRoutes();
    await this.getAllPosts();
  }

  render(){
    console.log(this.state)
    return(
        <Router>
          <div className={"navbar"}>
          <Grid container direction={"row"} >
              <Grid item xs={9}>
                <Grid container direction={"row"} justify={"flex-start"} alignItems={"center"}>
                  <Grid item xs={1}/>
                  <span>LOGO</span>
                  <Grid item xs={1}/>
                  <div id={"head_title"}>NAME</div>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"row"} justify={"space-evenly"} alignItems={"center"}>
                  {this.state.navigation?this.state.navigation.map(el => this.injectNavElement(el)):null}
                </Grid>
              </Grid>
          </Grid>
          </div>
          <Switch>
          <Route exact path="/" render={(props) => <Home {...props} latestPosts={this.state.latest}/>}/>
          <Route path="/About" component={About}/>
          <Route path="/ArticleList" render={(props) => <ArticleList {...props} db_posts={this.state.db_posts} getAllPosts={this.getAllPosts} deletePost={this.deletePost} readArticle={this.readArticle}/>}/>
          <Route path="/LogIn" render={(props) => <LogIn {...props} username={this.state.username} password={this.state.password} userLogIn={this.userLogIn} inputHandler={this.inputHandler}/>}/>
          <Route path="/AddPost" render={(props) => <AddPost {...props} new_post_body={this.state.new_post_body} new_post_tags={this.state.new_post_tags}new_post_name={this.state.new_post_name}
                                                             inputHandler={this.inputHandler} tagsAdd={this.tagsAdd} addPost={this.addPost} new_post_tags_array={this.state.new_post_tags_array}
                                                             handleDeleteTag={this.handleDeleteTag} new_post_inserted={this.state.new_post_inserted} new_post_imgURL={this.state.new_post_imgURL}
                                                             clearNewPost={this.clearNewPost}/>}/>
            <Route path="/LogOut" render={(props) => <LogOut {...props} logOut={this.logOut} session={this.state.session}/>}/>
            {this.state.db_posts && this.state.db_posts.length > 0 && this.state.db_posts.map(post => {
              return (<Route path={`/${post.post_title.replace(/ /g, '-')}`} render={(props) => <Article {...props} article_title={post.post_title} article_tags={post.post_tags} article_body={post.post_body} article_date={post.post_date}/>}/>);
            })}
          </Switch>

        </Router>
    );
  }
}

export default App;
