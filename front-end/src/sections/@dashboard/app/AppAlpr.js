import PropTypes from 'prop-types';

// @mui
import { Card, CardHeader, CardContent, Box } from '@mui/material';

import Alpr from '../../../alpr/Alpr';

// ----------------------------------------------------------------------

AppAlpr.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  keyword: PropTypes.string,
};

export default function AppAlpr({ title, subheader, keyword, ...other }) {
  return (
    <Card {...other} style={{ border: '0px solid green', height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />
      {/* {keyword && <CardContent>Searching for {keyword}</CardContent>} */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ border: '0px solid red', height: '100%' }}>
        <Alpr keyword={keyword} />
      </Box>
    </Card>
  );
}
