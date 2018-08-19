import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import { topicPrimaryStyle, topicSecondaryStyle } from './styles';

const Primary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.tab}>
      {topic.tab}
    </span>
    <span className={classes.title}>
      {topic.title}
    </span>
  </span>
);

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.username}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间：
      {topic.create_at}
    </span>
  </span>
);
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary);

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <Avatar alt="Remy Sharp" src={topic.author.avatar_url} />
    </ListItemIcon>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
);

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};
export default TopicListItem;
