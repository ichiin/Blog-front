import React from 'react';
import moment from 'moment'

class Article extends React.Component{

    render(){
        console.log(this.props)
        return(
            <div style={{padding: 50}}>
                <h1>{this.props.article_title}</h1>
                {this.props.article_tags.map(el => {
                    return <div>{el}</div>;
                })}
                <div dangerouslySetInnerHTML={{__html: this.props.article_body}}/>
                <span>{moment(this.props.article_date).format('DD MMMM YYYY')}</span>
            </div>
        );
    }
}

export default Article;