import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/pl';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {CloudUpload, Send, FileDownload} from '@material-ui/icons';

import {GET_ONE, CREATE, translate} from 'react-admin'; // eslint-disable-line import/no-unresolved;

import restClient from '../../providers/rest';
import uploadClient from '../../providers/upload';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import AppConfig from "../../AppConfig";

const styles = {
  list: {padding: '1em'},
  message: {margin: '0 20px'},
  messageText: {color: '#3a87ad'}, // https://material-ui.com/style/color/
  messageTextPatient: {color: '#4caf50'}, // https://material-ui.com/style/color/
  replyField: {padding: '0 10px'},
  table: {width: '100%'},
  tableCellWithTextField: {width: '80%'},
  tableCellWithButton: {width: '20%', verticalAlign: 'bottom'},
  fileInput: {display: 'none'},
  rightIcon: {marginLeft: '.5em'}
};

const Message = withStyles(styles)(({classes, message}) =>
  <ListItem className={classes.message} disabled={false} divider={true}>
    <ListItemAvatar><Avatar src="http://lorempixel.com/128/128/people/3/"/></ListItemAvatar>
    <ListItemText
      classes={{
        primary: classNames(classes.messageText, {
          [classes.messageTextPatient]: true === message.sender.is_patient
        })
      }}
      primary={message.body}
      secondary={`${message.sender.fullname} - ${moment(message.created_at).fromNow()}`}
    />
    {message.attachment ? <ListItemSecondaryAction>
      <IconButton aria-label={message.attachment.name} variant="container" target="_blank" href={`${AppConfig.endpoint}/public/media/${message.attachment.content_url}`}>
        <FileDownload />
      </IconButton>
    </ListItemSecondaryAction> : null}
  </ListItem>
);

class ThreadShow extends Component {
  constructor(props) {
    super(props);

    this.thread_id = props.match.params.id;

    this.state = {
      thread: undefined,
      messages: [],
      body: undefined,
      attachment: undefined
    }
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages() {
    restClient(GET_ONE, 'threads/my', {id: this.thread_id}).then(({data}) => {
      this.setState({
        thread: data,
        messages: data.messages.map(message => <Message key={message.created_at} message={message}/>)
      });
    });
  }

  onInputChangeReply(body) {
    this.setState({body});
  }

  sendMessage() {
    uploadClient(restClient)(CREATE, 'messages/send', {data: {thread: this.thread_id, body: this.state.body, attachment: this.state.attachment}}).then(() => {
      this.loadMessages();
      this.setState({body: ''});
      this.clearFile();
    });
  }

  loadFile(target) {
    this.setState({attachment: {rawFile: target.files[0]}});
  }

  clearFile() {
    this.setState({attachment: undefined});
  }

  render() {
    const {classes, translate} = this.props;

    return (
      <Paper className={classes.list}>
        <Typography variant="title">{this.state.thread ? this.state.thread.subject : ''}</Typography>
        <List>
          {this.state.messages}
        </List>
        <div style={styles.replyField}>
          <form onSubmit={event => this.sendMessage()}>
            <table style={styles.table}>
              <tbody>
              <tr>
                <td style={styles.tableCellWithTextField}>
                  <TextField
                    placeholder={translate('resources.threads/my.custom.show.reply.hintText')}
                    multiline={true}
                    fullWidth={true}
                    rows={4}
                    value={this.state.body}
                    onChange={event => this.onInputChangeReply(event.target.value)}
                  />
                </td>
                <td style={styles.tableCellWithButton}>
                  <input id="contained-button-file"
                         type="file"
                         onChange={e => this.loadFile(e.target)}
                         style={styles.fileInput}/>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      {translate('resources.threads/my.custom.show.attachment')}
                      <CloudUpload style={styles.rightIcon}/>
                    </Button>
                  </label>
                </td>
                <td style={styles.tableCellWithButton}>
                  <Button
                    variant="contained"
                    onClick={event => this.sendMessage()}
                    color="primary"
                  >
                    {translate('resources.threads/my.custom.show.reply.send')}
                    <Send style={styles.rightIcon}/>
                  </Button>
                </td>
              </tr>
              </tbody>
            </table>
          </form>
        </div>
      </Paper>
    );
  }
}

ThreadShow.contextTypes = {
  translate: PropTypes.func
};

export default withStyles(styles)(translate(ThreadShow));
