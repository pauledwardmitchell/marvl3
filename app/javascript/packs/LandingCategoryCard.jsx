import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 310,
  },
  media: {
    height: 200,
  },
};

class LandingCategoryCard extends React.Component {

  imageLink(type) {
    if (type === 'bus') {
      return "https://trinitytransportation.com/wp-content/uploads/2016/03/IMG_0115-WS-main.jpg"
    } if (type === 'computers') {
      return 'http://mankatotimes.com/wp-content/uploads/2017/01/Chromebooks.jpg'
    } if (type === 'security') {
      return 'https://www.securitymagazine.com/ext/resources/secenews/2017/camera-cyber.jpg?1497369252'
    } else {
      return 'https://www.securitymagazine.com/ext/resources/secenews/2017/camera-cyber.jpg?1497369252'
    }
  }

  renderText(type) {
    if (type === 'bus') {
      return 'BUS RENTAL'
    } if (type === 'computers') {
      return 'Computers / IT'
    } if (type === 'security') {
      return 'Security'
    } else {
      return 'WHAT ELSE'
    }
  }

  renderSubText(type) {
    if (type === 'bus') {
      return 'There are a dizzing number of options when it comes to school bus companies.  Let us help you sort through the weeds.'
    } if (type === 'computers') {
      return 'Buying new hardware? Have wireless network issues? Let our reviews guide your process.'
    } if (type === 'security') {
      return 'Nothing is more important than the safety of your students. Invest in a security system after reading these reviews.'
    } else {
      return 'WHAT ELSE'
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <div style={{margin: 10, display: 'inline-flex'}}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.imageLink(this.props.type)}
            title={this.renderText(this.props.type)} />
          <CardContent>
            <Typography variant="headline" component="h2">
              {this.renderText(this.props.type)}
            </Typography>
            <Typography component="p">
              {this.renderSubText(this.props.type)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              See these vendors
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LandingCategoryCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingCategoryCard);
