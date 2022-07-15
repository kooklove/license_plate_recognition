import { Box, Card, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
import AlprModel from '../../../model/AlprModel';
// ----------------------------------------------------------------------

AppAlpr.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  request: PropTypes.object,
};

export default function AppAlpr({ title, subheader, request, ...other }) {
  return (<>
    <Card {...other} style={{ border: '0px solid green', height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ border: '0px solid red', height: '100%' }}>
        <AlprModel request={request} showDetail />
      </Box>
    </Card>
  </>);
}
