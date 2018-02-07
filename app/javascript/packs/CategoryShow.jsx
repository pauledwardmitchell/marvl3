import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  position: 'absolute',
  left: 100,
  top: 100,
  width: '80%',
  height: 600,
  zIndex: 5
}

export default class CategoryShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Paper style={style}>
        HEYYYY
      </Paper>
    )
  }
}
