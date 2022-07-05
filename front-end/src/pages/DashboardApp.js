import PropTypes from 'prop-types';
// @mui
import { Container, Grid } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import {
  AppAlpr
} from '../sections/@dashboard/app';

DashboardApp.propTypes = {
  keyword: PropTypes.string,
};
// ----------------------------------------------------------------------

export default function DashboardApp(props) {
  return (
    <Page title="Dashboard" style={{ position: 'relative', height: '100%' }}>
      <Container maxWidth="xl" style={{ border: '0px solid blue', height: '100%' }}>
        {/* <Grid container spacing={3} style={{ border: '1px solid blue', height: '100%' }}>
          <Grid item xs={12} sm={6} md={12}> */}
            <AppAlpr
              title="ALPR Preview"
              subheader="Realtime Video Streaming"
              keyword={props.keyword}
            />
          {/* </Grid>
        </Grid> */}
      </Container>
    </Page>
  );
}
