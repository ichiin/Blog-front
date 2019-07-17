import React from 'react';

class Article extends React.Component{

    render(){
        console.log(this.props)
        return(
            <div>
                <h1>weird</h1>
                <h1>{this.props.article_title}</h1>
                {this.props.article_tags.map(el => {
                    return <div>{el}</div>;
                })}
                <p>{this.props.article_body}</p>
                <span>{this.props.article_date}</span>
            </div>
        );
    }
}

export default Article;