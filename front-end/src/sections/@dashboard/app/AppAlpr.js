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
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {/* {keyword && <CardContent>Searching for {keyword}</CardContent>} */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Alpr keyword={keyword} />
      </Box>
    </Card>
  );
}
