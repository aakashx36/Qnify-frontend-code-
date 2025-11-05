import React from 'react';
import { AppBar,Menu , MenuItem, MenuList , Tab , Toolbar, Typography,Button, IconButton } from '@mui/material';

function Test() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Logo</Typography>
        <Button variant='contained' > Hello </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Test;

