import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeMedia, reorderBacklog } from '../actions/index';

const mapStateToProps = state => {
    return {
        backlog: state.backlog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeMedia: media => dispatch(removeMedia(media)),
        reorderBacklog: args => dispatch(reorderBacklog(args))
    }
}

class Lists extends Component {

    assignRuntimeBasedOnType(type, runtime) {
        if(type.toLowerCase() === "movie") {
            return `${runtime} mins`;
        } else if(type.toLowerCase() === "series") {
            return `${runtime} mins/ep`
        }
    }

    render () {
        return (
            <div className="Backlogs">
                <h1 className="ui header">Backlog</h1>
                <div className="ui text container">
                    <div className="ui middle aligned selection list">
                        {
                            this.props.backlog.map((item, index) => {
                                const link = `/movie/${item.imdbID}`;
                                let watched, watchedButton;
                                if(item.Watched) {
                                    watched = {textDecoration: "line-through"};
                                    watchedButton = <button className="ui button" onClick={() => this.props.toggleWatched(item)}><i className="eye slash icon"></i></button>
                                } else {
                                    watched = {};
                                    watchedButton = <button className="ui button" onClick={() => this.props.toggleWatched(item)}><i className="eye icon"></i></button>
                                }
                                return (
                                    <div className="item" style={{"textAlign": "left"}} key={index}>
                                        <img className="ui mini image" src={item.Poster} alt="" />
                                        <div className="content">
                                            <Link to={link}>
                                                <div className="header" style={watched}>
                                                    {`${item.Title} (${item.Year}) `}
                                                </div>
                                            </Link>
                                            {this.assignRuntimeBasedOnType(item.Type, item.Runtime)}
                                        </div>
                                        <div className="left floated content">
                                            <div className="ui mini vertical icon buttons">
                                                <button className="ui button" onClick={() => this.props.reorderBacklog({media: item, direction: -1})}>
                                                    <i className="angle up icon"></i>
                                                </button>
                                                <button className="ui button" onClick={() => this.props.reorderBacklog({media: item, direction: 1})}>
                                                    <i className="angle down icon"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right floated content">
                                            <div className="ui mini vertical icon buttons">
                                                {watchedButton}
                                                <button className="ui red button" onClick={() => this.props.removeMedia(item)}>
                                                    <i className="close icon"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
