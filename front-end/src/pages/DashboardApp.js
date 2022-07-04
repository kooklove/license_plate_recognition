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
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <AppAlpr
              title="ALPR Preview"
              subheader="Realtime camera or video streaming"
              keyword={props.keyword}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
